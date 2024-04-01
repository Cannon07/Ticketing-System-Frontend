import { useState } from "react";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import { useQRCode } from "next-qrcode";

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
  dateAndTime: String,
  eventDuration: String,
  venueId: venue_data,
  transactionId: String,
  categoryList: String[],
  imageUrls: String[],
  artists: artist_data[],
  tiers: tier_data[],
}

interface UserData {
  id: string,
  profileImg: string,
  transactionId: string,
  userDetailsId: string,
  userEmail: string,
  walletId: string,

}

interface TicketDetails {
  cost: number,
  count: number,
  eventId: event_data,
  id: string,
  vcId: string,
  tier: tier_data,
  user: UserData,
  nfts: { [key: number]: {
    scanned: string,
    verifier: string,
  } }
}

interface TicketDetailsProps {
  ticket_data: TicketDetails | null,
}

export const QrCarousel: React.FC<TicketDetailsProps> = ({ ticket_data }) => {
  const { Image } = useQRCode()

  let [current, setCurrent] = useState(0);

  let previousSlide = () => {
    if (current === 0) setCurrent(Number(ticket_data?.count) - 1);
    else setCurrent(current - 1);
  };

  let nextSlide = () => {
    if (current === Number(ticket_data?.count) - 1) setCurrent(0);
    else setCurrent(current + 1);
  };

  return (
    <>
      <div className={"flex flex-col gap-2"}>


        <div className={"flex items-center gap-4"}>
          <button onClick={previousSlide} className={"text-dark text-3xl dark:text-white"}>
            <SlArrowLeft />
          </button>

          <div className="overflow-hidden rounded relative">
            <div
              className={`flex transition ease-out duration-40`}
              style={{
                transform: `translateX(-${current * 100}%)`,
              }}
            >
              {Object.keys(ticket_data?.nfts ?? {}).map((s, i) => {
                return (
                  <Image
                    key={i}
                    text={`${ticket_data?.vcId}, ${ticket_data?.id}, ${Object.keys(ticket_data?.nfts ?? {})[current]}`}
                    options={{
                      type: 'image/jpeg',
                      quality: 0.3,
                      errorCorrectionLevel: 'M',
                      margin: 3,
                      scale: 4,
                      width: 200,
                      color: {
                        dark: '#000000',
                        light: '#FFFFFF',
                      },
                    }}
                  />
                );
              })}
            </div>
          </div>

          <button onClick={nextSlide} className={"text-dark text-3xl dark:text-white"}>
            <SlArrowRight />
          </button>
        </div>

        <p className={"flex justify-center h5"}>NFT ID: {Object.keys(ticket_data?.nfts ?? {})[current]}</p>
      </div>

      <div className="py-1 flex justify-center gap-2 w-full">
        {Object.keys(ticket_data?.nfts ?? {}).map((s, i) => {
          return (
            <div
              onClick={() => {
                setCurrent(i);
              }}
              key={"circle" + i}
              className={`rounded-full w-4 h-4 cursor-pointer  ${
                i == current ? "bg-dark dark:bg-white" : "bg-gray-500"
              }`}
            ></div>
          );
        })}
      </div>
    </>
  );
}
