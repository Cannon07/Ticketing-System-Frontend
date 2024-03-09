"use client"

import Accordion from "@/shortcodes/Accordion"
import { useEffect, useState } from "react"
import ImageFallback from "@/helpers/ImageFallback";
import UserTicket from "@/components/UserTicket";
import AttendedEventsCard from "@/components/AttendedEventsCard";
import UserProfileSettings from "@/components/UserProfileSettings";
import UserDetailsSettings from "@/components/UserDetailsSettings";
import { useGlobalContext } from "@/app/context/globalContext";
import NotConnected from "@/app/not-connected";
import PageHeader from "@/partials/PageHeader";
import toast from "react-hot-toast";
import { GetTicketsByUserId } from "@/constants/endpoint_constants/TicketEndpoints";
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

const UserProfile = () => {

    const router = useRouter();

    const {userData} = useGlobalContext();
    const [tab, setTab] = useState('Booked Events');
    const [image, setImage] = useState(userData?.profileImg);
    const [upcomingUserTickets, setUpcomingUserTickets] = useState<TicketDetails[]>([]);
    const [previousUserTickets, setPreviousUserTickets] = useState<TicketDetails[]>([]);

    console.log(userData)

    const filterTickets = (userTickets: TicketDetails[]) => {
      let today = new Date();
      let upcoming_tickets: TicketDetails[] = [];
      let previous_tickets: TicketDetails[] = [];
      userTickets.map((ticket) => {
        let ticket_timestamp = Date.parse(ticket.eventId.dateAndTime.split(" ")[0]);
        let ticket_date = new Date(ticket_timestamp);
        if (ticket_date.getDate() >= today.getDate()) {
          upcoming_tickets.push(ticket);
        } else {
          previous_tickets.push(ticket);
        }
      })
      setUpcomingUserTickets(upcoming_tickets);
      setPreviousUserTickets(previous_tickets);
    }

    useEffect(() => {
      const fetchUserTickets = async () => {
        toast.loading("Fetching user's tickets..",{id:"TicketsFetchingLoading"} )
        var requestOptions = {
          method: 'GET',
        };
        let response = await fetch(`${GetTicketsByUserId}user=${userData?.id}`, requestOptions)
        let result = await response.json()
        console.log(result)
        if (result.length == 0) {
          setUpcomingUserTickets([]);
          setPreviousUserTickets([]);
          toast.dismiss();
          toast.error("No Tickets Found!", {id:"TicketsFetchingFailure"})
        } else {
          filterTickets(result);
          toast.dismiss();
          toast.success("Tickets Fetched Successfully!", {id:"TicketsFetchingSuccess"});
        }
      }

      //userTickets.map((ticket, index) => {console.log(`Ticket ${index}`, ticket)});
      fetchUserTickets();
      setTab('Booked Events');
      setImage(userData?.profileImg)
    }, [userData?.walletId])

    return (
        <>
          <PageHeader title={"Profile"} />
          {userData == null ? <NotConnected /> :
            <div className="section-sm">
                <div className="container">
                    <div className="row">
                        <div className="grid grid-cols-3">
                            <div className="lg:hidden flex col-span-3">

                                <Accordion title={tab} className="w-full mx-auto">
                                <aside className="w-full px-3 relative">
                                    <div className="lg:sticky lg:top-28 h-fit w-full px-3 py-4 overflow-y-auto bg-theme-light dark:bg-darkmode-theme-light rounded-lg  lg:border lg:border-border lg:dark:border-darkmode-border">
                                        <ul className="space-y-2 font-medium">


                                            <li>
                                                <div className="flex flex-col items-center p-2 gap-2 text-gray-900 rounded-lg dark:text-white">

                                                    <div className="w-44 h-44 overflow-hidden rounded-full">

                                                        <ImageFallback
                                                            height={100}
                                                            width={100}
                                                            src={image}
                                                            alt="event image"
                                                            className="object-cover w-full h-full"
                                                        />
                                                    </div>

                                                    <span>{userData.userEmail}</span>

                                                </div>
                                            </li>

                                            <div className="py-4">
                                                <hr className="h-px w-full dark:bg-gray-600 border-0 bg-gray-200" />
                                            </div>


                                            <li>
                                                <button onClick={() => setTab('Booked Events')} className={`w-full flex items-center justify-between px-6 py-2 text-gray-900 rounded-lg dark:text-white ${tab === 'Booked Events' ? 'bg-gray-200 dark:bg-gray-700' : ''} hover:bg-gray-200 dark:hover:bg-gray-700 group`}>

                                                    <span className="">Booked Events</span>
                                                    <span className="inline-flex items-center justify-center text-sm font-medium text-gray-800 rounded-full dark:text-gray-300">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                                        </svg>
                                                    </span>
                                                </button>
                                            </li>

                                            <li>
                                                <button onClick={() => setTab('Attended Events')} className={`w-full flex items-center justify-between px-6 py-2 text-gray-900 rounded-lg dark:text-white ${tab === 'Attended Events' ? 'bg-gray-200 dark:bg-gray-700' : ''} hover:bg-gray-200 dark:hover:bg-gray-700 group`}>

                                                    <span className="">Attended Events</span>
                                                    <span className="inline-flex items-center justify-center text-sm font-medium text-gray-800 rounded-full dark:text-gray-300">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                                        </svg>
                                                    </span>
                                                </button>
                                            </li>
                                            <li>
                                                <button onClick={() => setTab('Profile Settings')} className={`w-full flex items-center justify-between px-6 py-2 text-gray-900 rounded-lg dark:text-white ${tab === 'Profile Settings' ? 'bg-gray-200 dark:bg-gray-700' : ''} hover:bg-gray-200 dark:hover:bg-gray-700 group`}>

                                                    <span className="">Profile Settings</span>
                                                    <span className="inline-flex items-center justify-center text-sm font-medium text-gray-800 rounded-full dark:text-gray-300">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                                        </svg>
                                                    </span>
                                                </button>
                                            </li>

                                            <li>
                                                <button onClick={() => setTab('Verifiable Credentials')} className={`w-full flex items-center justify-between px-6 py-2 text-gray-900 rounded-lg dark:text-white ${tab === 'Verifiable Credentials' ? 'bg-gray-200 dark:bg-gray-700' : ''} hover:bg-gray-200 dark:hover:bg-gray-700 group`}>

                                                    <span className="">Verifiable Credentials</span>
                                                    <span className="inline-flex items-center justify-center text-sm font-medium text-gray-800 rounded-full dark:text-gray-300">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                                        </svg>
                                                    </span>
                                                </button>
                                            </li>

                                        </ul>
                                    </div>
                                </aside>

                                </Accordion>
                            </div>
                            <div className="hidden lg:contents">
                                <aside className="w-full px-3 relative">
                                    <div className="lg:sticky lg:top-28 h-fit w-full px-3 py-4 overflow-y-auto bg-theme-light dark:bg-darkmode-theme-light rounded-lg  lg:border lg:border-border lg:dark:border-darkmode-border">
                                        <ul className="space-y-2 font-medium">


                                            <li>
                                                <div className="flex flex-col items-center p-2 gap-2 text-gray-900 rounded-lg dark:text-white">

                                                    <div className="w-44 h-44 overflow-hidden rounded-full">

                                                        <ImageFallback
                                                            height={100}
                                                            width={100}
                                                            src={image}
                                                            alt="event image"
                                                            className="object-cover w-full h-full"
                                                        />
                                                    </div>

                                                    <span>{userData.userEmail}</span>

                                                </div>
                                            </li>

                                            <div className="py-4">
                                                <hr className="h-px w-full dark:bg-gray-600 border-0 bg-gray-200" />
                                            </div>


                                            <li>
                                                <button onClick={() => setTab('Booked Events')} className={`w-full flex items-center justify-between px-6 py-2 text-gray-900 rounded-lg dark:text-white ${tab === 'Booked Events' ? 'bg-gray-200 dark:bg-gray-700' : ''} hover:bg-gray-200 dark:hover:bg-gray-700 group`}>

                                                    <span className="">Booked Events</span>
                                                    <span className="inline-flex items-center justify-center text-sm font-medium text-gray-800 rounded-full dark:text-gray-300">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                                        </svg>
                                                    </span>
                                                </button>
                                            </li>

                                            <li>
                                                <button onClick={() => setTab('Attended Events')} className={`w-full flex items-center justify-between px-6 py-2 text-gray-900 rounded-lg dark:text-white ${tab === 'Attended Events' ? 'bg-gray-200 dark:bg-gray-700' : ''} hover:bg-gray-200 dark:hover:bg-gray-700 group`}>

                                                    <span className="">Attended Events</span>
                                                    <span className="inline-flex items-center justify-center text-sm font-medium text-gray-800 rounded-full dark:text-gray-300">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                                        </svg>
                                                    </span>
                                                </button>
                                            </li>
                                            <li>
                                                <button onClick={() => setTab('Profile Settings')} className={`w-full flex items-center justify-between px-6 py-2 text-gray-900 rounded-lg dark:text-white ${tab === 'Profile Settings' ? 'bg-gray-200 dark:bg-gray-700' : ''} hover:bg-gray-200 dark:hover:bg-gray-700 group`}>

                                                    <span className="">Profile Settings</span>
                                                    <span className="inline-flex items-center justify-center text-sm font-medium text-gray-800 rounded-full dark:text-gray-300">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                                        </svg>
                                                    </span>
                                                </button>
                                            </li>

                                            <li>
                                                <button onClick={() => setTab('Verifiable Credentials')} className={`w-full flex items-center justify-between px-6 py-2 text-gray-900 rounded-lg dark:text-white ${tab === 'Verifiable Credentials' ? 'bg-gray-200 dark:bg-gray-700' : ''} hover:bg-gray-200 dark:hover:bg-gray-700 group`}>

                                                    <span className="">Verifiable Credentials</span>
                                                    <span className="inline-flex items-center justify-center text-sm font-medium text-gray-800 rounded-full dark:text-gray-300">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                                        </svg>
                                                    </span>
                                                </button>
                                            </li>

                                        </ul>
                                    </div>
                                </aside>

                            </div>

                            <div className="col-span-3 lg:col-span-2">


                                {
                                    tab === 'Booked Events' ? (

                                        <div className="flex justify-center items-center h-full flex-wrap">
                                          {/*<UserTicket />
                                          <UserTicket />*/}
                                          {upcomingUserTickets.length != 0 ?
                                            upcomingUserTickets.map((ticket, index) => {
                                              return(
                                                <UserTicket
                                                  key={index}
                                                  ticket_data={ticket}
                                                />
                                              )
                                            })
                                            :
                                            <div className={"p-8 flex flex-col items-center"}>
                                              <h1 className="h2 text-center">No Tickets Found</h1>
                                              <div className="content flex flex-col items-center">
                                                <p className="mb-0 text-center">
                                                  Oops! It seems you haven&apos;t booked any tickets yet.
                                                </p>
                                                <p className="mt-0 text-center">
                                                  Browse our upcoming events and book your tickets now.
                                                </p>
                                              </div>
                                              <button
                                                className="btn-sm btn-primary"
                                                onClick={() => {router.push('/event')}}
                                              >
                                                Explore Now
                                              </button>
                                            </div>
                                          }

                                        </div>

                                    ) : (
                                        tab === 'Attended Events' ? (

                                            <div className="flex justify-center items-center h-full flex-wrap">
                                              {previousUserTickets.length != 0 ?
                                                previousUserTickets.map((ticket, index) => {
                                                  return (
                                                    <AttendedEventsCard
                                                      key={index}
                                                      ticket_data={ticket}
                                                    />
                                                  )
                                                })
                                                :
                                                <div className={"p-8 flex flex-col items-center"}>
                                                  <h1 className="h2 text-center">No Past Tickets Found</h1>
                                                  <div className="content flex flex-col items-center">
                                                    <p className="mb-0 text-center">
                                                      It looks like you haven&apos;t attended any events in the past.
                                                    </p>
                                                    <p className="mt-0 text-center">
                                                      Explore upcoming events to secure your tickets.
                                                    </p>
                                                  </div>
                                                  <button
                                                    className="btn-sm btn-primary"
                                                    onClick={() => {router.push('/event')}}
                                                  >
                                                    Explore Now
                                                  </button>
                                                </div>
                                              }
                                            </div>
                                        ) : (

                                            tab === 'Profile Settings' ? (
                                                <div className={"flex flex-col gap-4"}>
                                                  <div className="flex justify-center items-center flex-wrap">
                                                    <UserProfileSettings
                                                      id={userData.id}
                                                      userEmail={userData.userEmail}
                                                      profileImg={userData.profileImg}
                                                      userDetailsId={userData.userDetailsId}
                                                      transactionId={userData.transactionId}
                                                      walletId={userData.walletId}
                                                      originalImage={image}
                                                      setImage={setImage}
                                                    />
                                                  </div>

                                                  <div className="flex justify-center items-center flex-wrap">
                                                    <UserDetailsSettings
                                                      userData={userData}
                                                    />
                                                  </div>
                                                </div>
                                            ) : ''
                                        )

                                    )
                                }

                            </div>
                            <div></div>
                        </div>
                    </div>
                </div>

            </div>}
        </>
    )
}

export default UserProfile;
