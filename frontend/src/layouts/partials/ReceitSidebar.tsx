'use client'

import { humanize } from "@/lib/utils/textConverter";
import Link from "next/link";
import Accordion from "@/shortcodes/Accordion";
import { useState, useEffect } from "react";
import { CONTRACT_ADDRESS } from '@/constants/contract_constants/ContractAddress';
import metadata from '@/constants/contract_constants/assets/TicketingSystem.json';
import { ConvinenceFees } from "@/constants/config_constants/ConvinenceFees";

import { useCall, useCallSubscription, useContract, useEventSubscription, useEvents, useTx, useWallet } from "useink";
import { useTxNotifications } from "useink/notifications";
import { stringify } from "querystring";
import { pickDecoded, pickError } from 'useink/utils';
import { generateHash } from "@/lib/utils/hashGenerator";
import toast from "react-hot-toast";
import { PostTickets } from "@/constants/endpoint_constants/TicketEndpoints";
import { useGlobalContext } from "@/app/context/globalContext";
import { useRouter } from "next/navigation";

interface artist_data {
  id: String,
  name: String,
  profileImg: String,
  userName: String,
  govId: String,
  email: String,
}

interface tier_data {
  id: String,
  name: String,
  capacity: number,
  price: number,
}

interface venue_data {
  id: String,
  name: String,
  address: String,
  capacity: number,
  placeId: String,
}

interface event_data {
  id: String,
  name: String,
  description: String,
  dateAndTime: string,
  eventDuration: String,
  venueId: venue_data,
  transactionId: String,
  categoryList: String[],
  imageUrls: String[],
  artists: artist_data[],
  tiers: tier_data[],
}

interface event_props {
  eventData: event_data | null,
  totalTickets: string | null,
}

const ReceitSidebar: React.FC<event_props> = ({ eventData, totalTickets }) => {
  const router = useRouter();

  const {userData} = useGlobalContext()

  const [selectedTier, setSelectedTier] = useState<tier_data | null>(null);
  const [price, setPrice] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const TicketsNft = useContract(CONTRACT_ADDRESS,metadata);

  const eventTitle = eventData?.name;
  const dateTimeString = eventData?.dateAndTime;
  let eventDate = "";
  let eventTime = "";
  if (dateTimeString) {
    const parsedDateTime = Date.parse(dateTimeString);
    const dateTime = new Date(parsedDateTime);
    eventDate = dateTime.toISOString().split('T')[0];
    eventTime = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  }
  const eventDuration = eventData?.eventDuration;
  const aboutEvent = eventData?.description;
  const selectedCategory = eventData?.categoryList[0];
  const selectedVenueData = {
    id: eventData?.venueId.id,
    name: eventData?.venueId.name,
  }
  const selectedArtist: any[] = [];
  eventData?.artists.map((artist: artist_data) => {
    const data = {
      id: artist.id,
      name: artist.name,
    };
    selectedArtist.push(data);
  })

  const eventHashCurrent = generateHash([eventTitle, eventDate, eventTime, eventDuration, aboutEvent, [...selectedArtist], selectedCategory]);

  //console.log(eventHashCurrent);

  const mint = useTx(TicketsNft,'mint');
  useTxNotifications(mint);
  const mintResult = useCallSubscription(TicketsNft, 'mint',[eventHashCurrent,selectedTier?.name,Number(totalTickets)],{
    defaultCaller: true,
  });

  const handleProceedClick = () => {
    if (!userData) {
      toast.error("Wallet Not Connected!")
      return
    }

    let data;
    if(mintResult.result?.ok){
       data = JSON.parse(JSON.stringify(mintResult.result.value.decoded))
    }
    console.log(data);
    if (data.Ok) {
      mint.signAndSend([eventHashCurrent,selectedTier?.name,Number(totalTickets)]);
    } else if (data.Err == "NoSeatsAvailable") {
      toast.error("No Seats Available!")
    } else {
      toast.error("Something went wrong!");
    }
  }

  useEffect(() => {
    if (eventData && totalTickets) {
      setSelectedTier(eventData?.tiers[0])
      setPrice(Number(totalTickets) * eventData.tiers[0].price)
      setTotalPrice((Number(totalTickets) * eventData.tiers[0].price) + ConvinenceFees)
    }
  }, [eventData])

  useEffect(() => {
    if (mint.status === 'Finalized') {
      let txId = "";
      console.log(mint)
      mint.result?.contractEvents?.map((value) => {
        //txId=value.args[1][value.args[1].length-1].slice(0,64)
        txId=value.args[1];
        console.log(txId)
      });
      toast.dismiss()
      if (txId === "") {
        toast.error("Something went wrong!")
      } else {
        toast.success('Transaction finalized!')
        let register_toast = toast.loading('Booking Tickets..')
        bookTicket();
        toast.dismiss(register_toast)
      }
    }
    else if (mint.status === 'PendingSignature') {
      toast.dismiss()
      toast.loading('Pending signature..')
    }
    else if (mint.status === 'Broadcast') {
      toast.dismiss()
      toast.loading('Broadcasting transaction..')
    }
    else if (mint.status === 'InBlock') {
      toast.dismiss()
      toast.loading('Transaction In Block..')
    }
    else {
      toast.dismiss()
    }
  }, [mint.status])

  const bookTicket = async () => {
    let data;
    if(mintResult.result?.ok){
      data = JSON.parse(JSON.stringify(mintResult.result.value.decoded))
      console.log(data.Ok);
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "count": Number(totalTickets),
      "cost": totalPrice,
      "transactionId": eventHashCurrent,
      "userId": userData?.id,
      "tierId": selectedTier?.id,
      "eventId": eventData?.id,
      "nftToken": data.Ok,
    });

    console.log(raw);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    let response = await fetch(`${PostTickets}`, requestOptions)
    console.log(response)
    if (response.ok) {
      let result = await response.json();
      console.log(result)
      toast.success("Tickets Booked Successfully!")
      router.push('/user-profile');
    }
  }

  return (
    <div className="lg:col-5">

      <div className="mb-8 mt-8 lg:mt-0">
        <h3 className="mb-6">Booking Summary</h3>
        <div className="rounded bg-theme-light p-8 dark:bg-darkmode-theme-light relative">
          {/*{mintResult.result?.ok &&
          <h2 className='text-white font-bold text-xl mt-3 text-center'>
              {data.Ok}
              {data.Err}
          </h2>
        }*/}
          <div className={"flex flex-col gap-4 items-center"}>
            <h4 className={"h5 sm:h4"}>Tier</h4>
            <ul className="flex gap-4 flex-wrap justify-center">
              {eventData?.tiers.map((tier, index) => (
                <div
                  className={`btn ${selectedTier?.name == tier.name ? "btn-primary": "btn-outline-primary"} cursor-pointer`}
                  key={index}
                  onClick={() => {
                    setSelectedTier(tier)
                    setPrice(Number(totalTickets) * tier.price)
                    setTotalPrice((Number(totalTickets) * tier.price) + ConvinenceFees)
                  }}
                >
                  {tier.name}
                </div>
              ))}
            </ul>
          </div>

          <hr className="h-px my-8 w-full dark:bg-gray-600 border-0 bg-gray-200" />

          <div className={"h-16 w-8 rounded-tl-full rounded-bl-full bg-body dark:bg-darkmode-body absolute inset-y-0 right-0 my-auto"}></div>
          <div className={"h-16 w-8 rounded-tr-full rounded-br-full bg-body dark:bg-darkmode-body absolute inset-0 left-0 my-auto"}></div>

          <div className={"flex flex-col items-center gap-4 px-8"}>

            <div className={"flex justify-between w-full"}>
              <h5 className={"h6 sm:h5"}>{totalTickets} Tickets</h5>
              <h5 className={"h6 sm:h5"}>Rs {price}</h5>
            </div>
            <div className={"flex justify-between w-full"}>
              <h5 className={"h6 sm:h5"}>Convenience fees</h5>
              <h5 className={"h6 sm:h5"}>Rs {ConvinenceFees}</h5>
            </div>

            <div className={"h-px w-full border-t border-dashed dark:border-gray-600 border-gray-200"} />

            <div className={"flex justify-between w-full"}>
              <h5 className={"h6 sm:h5"}>Sub Total</h5>
              <h5 className={"h6 sm:h5"}>Rs {totalPrice}</h5>
            </div>

          </div>

        </div>

        <button onClick={handleProceedClick} className={"mt-6 w-full btn btn-primary flex justify-between"}>
          <h5 className={"text-white dark:text-dark"}>Total: Rs {totalPrice}</h5>
          <h5 className={"text-white dark:text-dark"}>Proceed</h5>
        </button>
      </div>
    </div>


  );
};

export default ReceitSidebar;
