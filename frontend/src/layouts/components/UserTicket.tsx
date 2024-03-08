import React from 'react'
import ImageFallback from '@/helpers/ImageFallback'
import { GoHourglass } from "react-icons/go";

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
}

interface TicketDetailsProps {
  ticket_data: TicketDetails | null,
}

const UserTicket: React.FC<TicketDetailsProps> = ({ ticket_data }) => {

    console.log(ticket_data);

    return (
        <div className="px-3 pb-3 flex items-center justify-center">
            <div className="rounded bg-theme-light p-8 dark:bg-darkmode-theme-light relative h-fit w-[250px] lg:w-fit lg:h-fit">
                <div className={"flex flex-col lg:flex-row items-center gap-4"}>
                    <div></div>
                    <div className='hidden lg:contents'>
                        <div className={"h-[200px] w-px border-r border-dashed dark:border-gray-600 border-gray-200"} />
                    </div>
                    <div className={"lg:hidden h-px w-full border-t border-dashed dark:border-gray-600 border-gray-200"} />
                    <div className="lg:w-auto lg:h-[170px] rounded overflow-hidden object-cover">
                        <ImageFallback
                            height={200}
                            width={200}
                            src={ticket_data?.eventId.imageUrls[0]}
                            alt="event-image"
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <div className='hidden lg:contents h-[200px] w-px border-r dark:border-gray-600 border-gray-200' />



                    <div className='hidden lg:contents'>

                        <div className={"h-4 w-8 rounded-bl-full rounded-br-full bg-body dark:bg-darkmode-body absolute left-50 top-0 mx-auto"}></div>
                        <div className={"h-4 w-8 rounded-tl-full rounded-tr-full bg-body dark:bg-darkmode-body absolute left-50 bottom-0 mx-auto"}></div>
                        <div className={"h-4 w-8 rounded-bl-full rounded-br-full bg-body dark:bg-darkmode-body absolute right-0 top-0 mx-auto"}></div>
                        <div className={"h-4 w-8 rounded-tl-full rounded-tr-full bg-body dark:bg-darkmode-body absolute right-0 bottom-0 mx-auto"}></div>
                        <div className={"h-8 w-4 rounded-tl-full rounded-bl-full bg-body dark:bg-darkmode-body absolute inset-y-0 right-0 my-auto"}></div>
                    </div>

                    <div className='lg:hidden flex justify-center items-center'>

                        <div className={"h-4 w-8 rounded-tl-full rounded-tr-full  bg-body dark:bg-darkmode-body absolute bottom-0 mx-auto"}></div>
                        <div className={"h-8 w-4 rounded-tl-full rounded-bl-full bg-body dark:bg-darkmode-body absolute right-0 top-8 mx-auto"}></div>
                        <div className={"h-8 w-4  rounded-tr-full rounded-br-full  bg-body dark:bg-darkmode-body absolute left-0 top-8 mx-auto"}></div>
                        <div className={"h-8 w-4 rounded-tr-full rounded-br-full bg-body dark:bg-darkmode-body absolute  bottom-0 left-0 mx-auto"}></div>
                        <div className={"h-8 w-4 rounded-tl-full rounded-bl-full bg-body dark:bg-darkmode-body absolute bottom-0 right-0 my-auto"}></div>
                    </div>

                    <div className='flex flex-col lg:flex-row items-center justify-center'>

                        <div className='flex flex-col gap-3 justify-center'>
                            <div>
                                <p>{ticket_data?.eventId.categoryList[0]}</p>

                                <h4>{ticket_data?.eventId.name}</h4>
                            </div>

                            <ul className='flex flex-col gap-1'>
                                <li className='flex gap-1'>

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                                    </svg>
                                    <span>{ticket_data?.eventId.dateAndTime.split(" ")[0]}</span>
                                </li>
                                <div className='flex flex-col lg:flex-row lg:justify-between gap-1'>
                                <li className='flex gap-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    <span>
                                        {ticket_data?.eventId.dateAndTime.split(" ")[1]}</span></li>

                                        <li className='flex gap-1'>
                                    <GoHourglass size={24}/>
                                    <span>
                                        {ticket_data?.eventId.eventDuration}</span>
                                </li>
                                </div>
                                <li className='flex gap-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                    </svg>
                                    <span>
                                        {ticket_data?.eventId.venueId.address}
                                    </span>
                                </li>
                            </ul>

                        </div>


                        <div className='hidden lg:contents'>

                            <div className='px-4'>

                                <div className='h-[200px] w-px border-r  dark:border-gray-600 border-gray-200' />
                            </div>


                        </div>
                        <hr className="lg:hidden h-px my-4 w-full dark:bg-gray-600 border-0 bg-gray-200" />


                        <div className='flex flex-row lg:flex-col gap-3 lg:justify-center'>
                            <ul className='flex flex-col gap-1'>

                                <li className='flex justify-between gap-4'>

                                    <strong>NFT </strong>

                                    <span>23412233543534534</span>
                                </li>
                                <li className='flex justify-between'>


                                    <strong>DID </strong>

                                    <span>23412233543534534</span>


                                </li>
                                <li className='flex justify-between'>
                                    <strong>Total Seats</strong>

                                    <span>{ticket_data?.count}</span>

                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )


}

export default UserTicket
