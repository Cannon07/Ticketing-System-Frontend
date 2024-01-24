"use client"

import React, { useState } from 'react'
import ImageFallback from '@/helpers/ImageFallback'

const PastHostingsCard = () => {


    const content = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum saepe fuga voluptates laudantium odit delectus commodi eius quis harum quo amet odio, nisi explicabo exercitationem iusto quidem est iure minus non sed doloremque ut dignissimos? Facere eos explicabo natus est culpa fugit impedit quos praesentium Lorem,\nIpsum dolor sit amet consectetur adipisicing elit. Blanditiis corrupti temporibus architecto similique cumque eius vitae saepe ipsum possimus, in odit hic numquam, facilis voluptatum, repellendus asperiores laudantium quod voluptate. Fugit, accusantium? Voluptas maxime, aperiam earum porro nisi eveniet enim."

    const [toggle,setToggle] = useState(false);


    return (
        <div className="px-3 pb-3 flex items-center justify-center">
            <div className="rounded bg-theme-light p-8 dark:bg-darkmode-theme-light relative  h-full w-auto">
                <div className={"flex flex-col items-center gap-4"}>

                    



                    {/* <div className="h-[500px] w-full rounded overflow-hidden object-cover"> */}
                    <ImageFallback
                        height={500}
                        width={1200}
                        src={'/images/image-placeholder111.png'}
                        alt="event-image"
                        className="object-cover w-full rounded  grayscale"
                    />
                    {/* </div> */}



                    <div className='flex flex-col items-center justify-center'>

                        <div className='flex flex-col gap-3 justify-center'>
                            <div>
                                <p>Music Event</p>

                                <h4>Lorem ipsum dolor sit.</h4>

                         
                                    <p>
                                        {toggle ? content : content.slice(0, 150)}
                                        <button className="font-semibold pl-2" onClick={(e) => setToggle(!toggle)}>{toggle ? 'Read less' : 'Read more'}</button>
                                    </p>

                              
                            </div>

                            <ul className='flex gap-4 flex-wrap'>
                                <li className='flex gap-1'>

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                                    </svg>
                                    <span>19/01/2024</span>
                                </li>
                                <li className='flex gap-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    <span>
                                        1:32 pm</span></li>
                                <li className='flex gap-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                    </svg>
                                    <span>
                                        Gaothan,Shivajinagar,pune
                                    </span>

                                </li>





                            </ul>


                        </div>
                    </div>

                    {/* <button className='flex gap-1 w-full items-center justify-center btn btn-primary'>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-6 w-6 mb-1 ">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>


                        <span className=''>
                            Edit
                        </span>

                    </button> */}



                </div>
            </div>
        </div>
    )


}

export default PastHostingsCard;