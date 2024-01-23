"use client"

import Accordion from "@/shortcodes/Accordion"
import { useState } from "react";
import ImageFallback from "@/helpers/ImageFallback";

const OrganizerProfile = () => {

    const [tab, setTab] = useState('hosted-events')

    return (
        <div className="section-sm">
            <div className="container">
                <div className="row">
                    <div className="grid grid-cols-3">
                        <div className="lg:hidden flex col-span-3">
                            <Accordion title="..." className="w-full">
                                <aside className="w-full px-3 relative">
                                    <div className="lg:sticky lg:top-28 h-fit w-full px-3 py-4 overflow-y-auto bg-theme-light dark:bg-darkmode-theme-light rounded-lg  lg:border lg:border-border lg:dark:border-darkmode-border">
                                        <ul className="space-y-2 font-medium">


                                            <li>
                                                <div className="flex flex-col items-center p-2 gap-2 text-gray-900 rounded-lg dark:text-white">

                                                    <div className="w-44 h-44 overflow-hidden rounded-full">

                                                        <ImageFallback
                                                            height={100}
                                                            width={100}
                                                            src={'/images/event-image2.jpg'}
                                                            alt="event image"
                                                            className="object-cover w-full h-full"
                                                        />
                                                    </div>

                                                    <span >Nikhil Magar</span>

                                                </div>
                                            </li>



                                            <div className="py-4">
                                                <hr className="h-px w-full dark:bg-gray-600 border-0 bg-gray-200" />
                                            </div>


                                            <li>
                                                <button onClick={() => setTab('hosted-events')} className={`w-full flex items-center justify-between px-6 py-2 text-gray-900 rounded-lg dark:text-white ${tab === 'hosted-events' ? 'bg-gray-200 dark:bg-gray-700' : ''} hover:bg-gray-200 dark:hover:bg-gray-700 group`}>

                                                    <span className="">Hosted Events</span>
                                                    <span className="inline-flex items-center justify-center text-sm font-medium text-gray-800 rounded-full dark:text-gray-300">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                                        </svg>
                                                    </span>
                                                </button>
                                            </li>

                                            <li>
                                                <button onClick={() => setTab('past-hostings')} className={`w-full flex items-center justify-between px-6 py-2 text-gray-900 rounded-lg dark:text-white ${tab === 'past-hostings' ? 'bg-gray-200 dark:bg-gray-700' : ''} hover:bg-gray-200 dark:hover:bg-gray-700 group`}>

                                                    <span className="">Past Hostings</span>
                                                    <span className="inline-flex items-center justify-center text-sm font-medium text-gray-800 rounded-full dark:text-gray-300">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                                        </svg>
                                                    </span>
                                                </button>
                                            </li>


                                            <li>
                                                <button onClick={() => setTab('organizer-profile')} className={`w-full flex items-center justify-between px-6 py-2 text-gray-900 rounded-lg dark:text-white ${tab === 'organizer-profile' ? 'bg-gray-200 dark:bg-gray-700' : ''} hover:bg-gray-200 dark:hover:bg-gray-700 group`}>

                                                    <span className="">Profile Settings</span>
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
                                                        src={'/images/event-image2.jpg'}
                                                        alt="event image"
                                                        className="object-cover w-full h-full"
                                                    />
                                                </div>

                                                <span >Nikhil Magar</span>

                                            </div>
                                        </li>



                                        <div className="py-4">
                                            <hr className="h-px w-full dark:bg-gray-600 border-0 bg-gray-200" />
                                        </div>


                                        <li>
                                            <button onClick={() => setTab('hosted-events')} className={`w-full flex items-center justify-between px-6 py-2 text-gray-900 rounded-lg dark:text-white ${tab === 'hosted-events' ? 'bg-gray-200 dark:bg-gray-700' : ''} hover:bg-gray-200 dark:hover:bg-gray-700 group`}>

                                                <span className="">Hosted Events</span>
                                                <span className="inline-flex items-center justify-center text-sm font-medium text-gray-800 rounded-full dark:text-gray-300">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                                    </svg>
                                                </span>
                                            </button>
                                        </li>

                                        <li>
                                            <button onClick={() => setTab('past-hostings')} className={`w-full flex items-center justify-between px-6 py-2 text-gray-900 rounded-lg dark:text-white ${tab === 'past-hostings' ? 'bg-gray-200 dark:bg-gray-700' : ''} hover:bg-gray-200 dark:hover:bg-gray-700 group`}>

                                                <span className="">Past Hostings</span>
                                                <span className="inline-flex items-center justify-center text-sm font-medium text-gray-800 rounded-full dark:text-gray-300">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                                    </svg>
                                                </span>
                                            </button>
                                        </li>


                                        <li>
                                            <button onClick={() => setTab('organizer-profile')} className={`w-full flex items-center justify-between px-6 py-2 text-gray-900 rounded-lg dark:text-white ${tab === 'organizer-profile' ? 'bg-gray-200 dark:bg-gray-700' : ''} hover:bg-gray-200 dark:hover:bg-gray-700 group`}>

                                                <span className="">Profile Settings</span>
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

                        <div className="col-span-3 lg:col-span-2 ">



                            {
                                tab === 'hosted-events' ? (

                                    <div className="flex justify-center items-center flex-wrap">

                                        hosted events

                                    </div>

                                ) : (
                                    tab === 'past-hostings' ? (

                                        <div className="flex justify-center items-center flex-wrap">

                                            past hostings

                                        </div>


                                    ) : (

                                        tab === 'organizer-profile' ? (
                                            <div className="flex justify-center items-center flex-wrap">

                                                organizer profile

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

        </div>
    )
}

export default OrganizerProfile;