import React from 'react'
import ImageFallback from '@/helpers/ImageFallback'
import { GoHourglass } from "react-icons/go";
import { IoQrCode } from "react-icons/io5";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { PiTicketLight } from "react-icons/pi";
import QrModal from './QrModal';

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
  tier: tier_data,
  user: UserData,
  nfts: { [key: number]: boolean }
}

interface TicketDetailsProps {
  ticket_data: TicketDetails | null,
}

const UserTicket: React.FC<TicketDetailsProps> = ({ ticket_data }) => {

    console.log(ticket_data);

    const formatDateAndTime = (dateTimeString: string): { date: string, time: string } => {
        const dateTime = new Date(dateTimeString);

        const date = `${dateTime.getDate()}/${dateTime.getMonth() + 1}/${dateTime.getFullYear()}`;


        const hours = dateTime.getHours();
        const minutes = dateTime.getMinutes();
        const amOrPm = hours >= 12 ? 'pm' : 'am';
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        const time = `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${amOrPm}`;
        return { date, time };
    };

    function formatDuration(timeString: string): string {
        const [hours, minutes] = timeString.split(':')

        const formattedHours = Number(hours) < 10 ? hours[1] : hours;
        if (minutes[0] == '0' && minutes[1] === '0') {
            return `${formattedHours} hrs`;
        }
        const formattedMinutes = Number(minutes) < 10 ? '0' + minutes[1] : minutes;

        return `${formattedHours}:${formattedMinutes} hrs`;
    }

    return (
      <>
        <QrModal ticket_data={ticket_data} />
        <div id={`data-${ticket_data?.id}-trigger`} className="group px-3 pb-3 flex items-center justify-center w-full cursor-pointer">
            <div className={"bg-dark transition-colors duration-300 ease-in-out dark:bg-white rounded-l-lg h-[227px] flex items-center px-4 group-hover:bg-theme-light dark:group-hover:bg-darkmode-theme-light"}>
              <IoQrCode className={"text-white transition-colors duration-300 ease-in-out dark:text-dark group-hover:text-dark dark:group-hover:text-white"} size={50} />
            </div>
            <div className="rounded-r-lg bg-theme-light p-4 dark:bg-darkmode-theme-light relative h-fit w-full lg:w-full lg:h-fit">
                <div className={"flex h-full items-center gap-2"}>

                  <div className={"flex flex-col lg:flex-row items-center gap-4 h-full w-full"}>
                      {/*<div className='hidden lg:contents'>
                          <div className={"h-[200px] w-px border-r border-dashed dark:border-gray-600 border-gray-200"} />
                      </div>
                      <div className={"lg:hidden h-px w-full border-t border-dashed dark:border-gray-600 border-gray-200"} />*/}

                      <div className="lg:w-[300px] lg:h-[195px] rounded overflow-hidden object-cover">
                          <ImageFallback
                              height={195}
                              width={300}
                              src={ticket_data?.eventId.imageUrls[0]}
                              alt="event-image"
                              className="object-cover w-full h-full"
                          />
                      </div>
                      <div className='hidden lg:contents h-[200px] w-px border-r dark:border-gray-600 border-gray-200' />

                      <div className='flex flex-col lg:flex-row items-center justify-center w-full'>

                          <div className='flex flex-col gap-3 justify-center w-full'>
                              <div>
                                  <p>{ticket_data?.eventId.categoryList[0]}</p>

                                  <h4 className={"line-clamp-1"}>{ticket_data?.eventId.name}</h4>
                              </div>

                              <ul className='flex flex-col gap-1'>
                                <div className={"flex items-center gap-2"}>
                                  <li className='flex gap-1'>

                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                                      </svg>
                                      <span>{formatDateAndTime(String(ticket_data?.eventId.dateAndTime)).date}</span>
                                  </li>

                                  <span className={"h6"}>|</span>

                                  <li className='flex gap-1 items-center'>
                                    <div className={""}>
                                      <PiTicketLight size={26} />
                                    </div>
                                      <span>{ticket_data?.count}</span>
                                  </li>
                                  </div>
                                  <div className='flex flex-col lg:flex-row lg:justify-start gap-2 items-center'>
                                  <li className='flex gap-1'>
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                      </svg>
                                      <span>
                                          {formatDateAndTime(String(ticket_data?.eventId.dateAndTime)).time}</span></li>

                                      <span className={"h6"}>|</span>

                                          <li className='flex gap-1'>
                                      <GoHourglass size={24}/>
                                      <span>
                                          {formatDuration(String(ticket_data?.eventId.eventDuration))}</span>
                                  </li>
                                  </div>
                                  <li className='flex gap-1'>
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                          <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                      </svg>
                                      <span className={"line-clamp-1"}>
                                          {ticket_data?.eventId.venueId.address}
                                      </span>
                                  </li>
                                  <li className='flex gap-2 items-center'>
                                      <FaIndianRupeeSign size={18} />
                                      <span>
                                          {ticket_data?.cost}
                                      </span>
                                  </li>
                              </ul>

                          </div>
                      </div>
                  </div>
                </div>
            </div>
        </div>
      </>
    )
}

export default UserTicket
