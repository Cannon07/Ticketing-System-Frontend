'use client'

import { useState, useEffect } from "react";
import EventPostPage from "@/components/EventPostPage";
import { useParams } from "next/navigation";
import { GetEventsById } from "@/constants/endpoint_constants/EventEndpoints";
import { PostIssuerDetailsFromDid } from "@/constants/ssi_endpoint_constants/IssuerEndpoints";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import NotConnected from "@/app/not-connected";

interface artist_data {
  id: string,
  name: string,
  profileImg: string,
  userName: string,
  govId: string,
  email: string,
}

interface tier_data {
  id: string,
  name: string,
  capacity: number,
  price: number,
}

interface venue_data {
  id: string,
  name: string,
  address: string,
  capacity: number,
  placeId: string,
}

interface issuer_data {
  name: string,
  publicDid: string,
  type: string,
}

interface event_data {
  id: string,
  name: string,
  description: string,
  dateAndTime: string,
  eventDuration: string,
  venueId: venue_data,
  transactionId: string,
  categoryList: string[],
  imageUrls: string[],
  artists: artist_data[],
  tiers: tier_data[],
  verificationMode: string,
  trustedIssuers: string[],
}

const EventSingle = () => {
  const router = useRouter();

  const [eventData, setEventData] = useState<event_data | null>(null);
  const [issuerData, setIssuerData] = useState<issuer_data[]>([]);
  const [loading, setLoading] = useState(false);
  const params = useParams<{ single: string }>();

  useEffect(() => {
    const fetchEventByEventId = async () => {
      var requestOptions = {
        method: 'GET',
      };
      setLoading(true);
      toast.loading("Fetching Event Details..", {
        id: "eventDetails"
      });
      try {
        let response = await fetch(`${GetEventsById}id=${params.single}`, requestOptions)
        if (response.status != 404) {
          toast.dismiss();
          let result = await response.json();
          setEventData(result);
          setLoading(false);
          console.log(result);
          toast.success("Event Details Fetched Successfully!", {
            id: "eventDeatilsSuccess"
          })
        } else {
          setLoading(false);
          toast.dismiss()
          toast.error("Something went wrong!");
          router.push('/event');
        }
      } catch (e) {
        setLoading(false);
        toast.dismiss()
        toast.error("Something went wrong!");
        router.push('/event');
      }
    }

    fetchEventByEventId();

  }, [])

  useEffect(() => {
    const fetchIssuerData = async () => {
      toast.loading("Fetching Issuer Details..", {id: "FetchIssuerLoading"})
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "issuersDid": eventData?.trustedIssuers,
      });

      console.log(raw);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
      };

      let response = await fetch(`${PostIssuerDetailsFromDid}`, requestOptions)

      console.log(response);

      if (response.ok) {
        toast.dismiss();
        let result = await response.json();
        console.log(result);
        toast.success("Issuer Details fetched Successfully!", {id: "FetchIssuerSuccess"});
        setIssuerData(result);
      } else {
        toast.error("Something went wrong!", {id: "FetchIssuerFailure"});
        setLoading(false);
      }
    }
    if (eventData) {
      fetchIssuerData()
    }
  }, [eventData])

  return (
    <>
      <section>
        <div className="container">
        <div className="row justify-center">
            {loading ?
              <NotConnected /> :
              <EventPostPage
                event_data={eventData}
                issuer_data={issuerData}
              />
            }
        </div>
        </div>
      </section >
    </>
  );
};

export default EventSingle;
