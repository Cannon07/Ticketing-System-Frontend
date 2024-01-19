import Image from 'next/image'
import React from 'react'

import ImageFallback from '@/helpers/ImageFallback'

const UserTicket = () => {



    return (
        <div className="p-3 flex items-center justify-center">
            <div className="rounded bg-theme-light p-8 dark:bg-darkmode-theme-light relative h-fit w-[250px] lg:w-fit lg:h-fit">
                <div className={"flex flex-col lg:flex-row items-center gap-4"}>
                    <div></div>
                    <div className='hidden lg:contents'>
                        <div className={"h-[200px] w-px border-r border-dashed dark:border-gray-600 border-gray-200"} />
                    </div>
                    <div className={"lg:hidden h-px w-full border-t border-dashed dark:border-gray-600 border-gray-200"} />
                    <div className="lg:w-[200px] lg:h-[150px] rounded overflow-hidden object-cover">
                        <ImageFallback
                            height={200}
                            width={200}
                            src={'/images/event-image.png'}
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

                    <div className='lg:hidden'>

                        <div className={"h-4 w-8 rounded-tl-full rounded-tr-full  bg-body dark:bg-darkmode-body absolute bottom-0 mx-auto"}></div>
                        <div className={"h-8 w-4 rounded-tl-full rounded-bl-full bg-body dark:bg-darkmode-body absolute right-0 top-8 mx-auto"}></div>
                        <div className={"h-8 w-4  rounded-tr-full rounded-br-full  bg-body dark:bg-darkmode-body absolute left-0 top-8 mx-auto"}></div>
                        <div className={"h-8 w-4 rounded-tr-full rounded-br-full bg-body dark:bg-darkmode-body absolute  bottom-0 left-0 mx-auto"}></div>
                        <div className={"h-8 w-4 rounded-tl-full rounded-bl-full bg-body dark:bg-darkmode-body absolute bottom-0 right-0 my-auto"}></div>
                    </div>

                    <div className='flex flex-col lg:flex-row items-center justify-center'>

                        <div className='flex flex-col gap-3 justify-center'>
                            <div>
                                <p>Music Event</p>

                                <h4>Lorem ipsum dolor sit.</h4>
                            </div>

                            <ul className='flex flex-col gap-1'>
                                <li className='flex gap-1'>

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                                    </svg>19/01/2024
                                </li>
                                <li className='flex gap-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>

                                    1:32 pm</li>
                                <li className='flex gap-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                    </svg>
                                    Gaothan,Shivajinagar,pune</li>
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

                                    23412233543534534
                                </li>
                                <li className='flex justify-between'>


                                    <strong>DID </strong>

                                    23412233543534534


                                </li>
                                <li className='flex justify-between'>
                                    <strong>Seat No  </strong>

                                    234

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