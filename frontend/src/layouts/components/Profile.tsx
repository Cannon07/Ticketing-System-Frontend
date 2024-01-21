
import ImageFallback from "@/helpers/ImageFallback";

const Profile = () => {

    return (

            <aside id="default-sidebar" className="w-full p-3">
                <div className="h-fit w-full px-3 py-4 overflow-y-auto bg-theme-light dark:bg-darkmode-theme-light rounded-lg">
                    <ul className="space-y-2 font-medium">

                 
                        <li>
                            <a href="#" className="flex flex-col items-center p-2 gap-2 text-gray-900 rounded-lg dark:text-white">
                                
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

                            </a>
                        </li>


                 
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group">
                        
                                <span className="flex-1 ms-3 whitespace-nowrap">Booked Events</span>
                                <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 rounded-full dark:text-gray-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group">
                        
                                <span className="flex-1 ms-3 whitespace-nowrap">Attended Events</span>
                                <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 rounded-full dark:text-gray-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                                </span>
                            </a>
                        </li>

                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group">
                        
                                <span className="flex-1 ms-3 whitespace-nowrap">Hosted Events</span>
                                <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 rounded-full dark:text-gray-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                                </span>
                            </a>
                        </li>

                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group">
                        
                                <span className="flex-1 ms-3 whitespace-nowrap">Past Hostings</span>
                                <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 rounded-full dark:text-gray-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                                </span>
                            </a>
                        </li>
                    

                    </ul>
                </div>
            </aside>


// <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
// <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
// </svg>




    )
};

export default Profile;