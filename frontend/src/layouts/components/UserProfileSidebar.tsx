"use client"


import ImageFallback from "@/helpers/ImageFallback";
import Link from "next/link";
import { usePathname } from "next/navigation";


const UserProfileSidebar = () => {

    const pathname = usePathname();
 
    return (
        <aside id="default-sidebar" className="w-full px-3 relative">
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
                        <Link href="/booked-events" className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white ${pathname==='/booked-events'?'bg-gray-200 dark:bg-gray-700':''} hover:bg-gray-200 dark:hover:bg-gray-700 group`}>

                            <span className="flex-1 ms-3 whitespace-nowrap">Booked Events</span>
                            <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 rounded-full dark:text-gray-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/attended-events" className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white ${pathname==='/attended-events'?'bg-gray-200 dark:bg-gray-700':''} hover:bg-gray-200 dark:hover:bg-gray-700 group`}>

                            <span className="flex-1 ms-3 whitespace-nowrap">Attended Events</span>
                            <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 rounded-full dark:text-gray-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/user-profile" className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white ${pathname==='/user-profile'?'bg-gray-200 dark:bg-gray-700':''} hover:bg-gray-200 dark:hover:bg-gray-700 group`}>

                            <span className="flex-1 ms-3 whitespace-nowrap">Profile Settings</span>
                            <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 rounded-full dark:text-gray-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </span>
                        </Link>
                    </li>

                </ul>
            </div>
        </aside>

      





    )
};

export default UserProfileSidebar;