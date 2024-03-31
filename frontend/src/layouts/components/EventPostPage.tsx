"use client"

import BlogCard from "@/components/BlogCard";
import ImageFallback from "@/helpers/ImageFallback";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import TicketModal from "./TicketModal";
import IssuerModal from "./IssuerModal";
import { GoHourglass } from "react-icons/go";
import VCsModal from "./VCsModal";
import toast from "react-hot-toast";
import { useGlobalContext } from "@/app/context/globalContext";
import { useRouter } from "next/navigation";
import { GetUserDetailsById } from "@/constants/ssi_endpoint_constants/UserDetailsEndpoint";
import { PostUserVCsFromUserDid } from "@/constants/ssi_endpoint_constants/UserDetailsEndpoint";

const artists = [
    { id: 1, name: 'Shreya Ghoshal' },
    { id: 2, name: 'Arijit Singh' },
    { id: 3, name: 'Pwandeep' },
    { id: 4, name: 'Neha Kakkar' },
    { id: 5, name: 'Honey Singh' },
    { id: 6, name: 'Sonu Nigham' },
    { id: 7, name: 'Taylor Swift' },
    { id: 8, name: 'Badshah' },
    { id: 9, name: 'King' },
    { id: 10, name: 'Nikhil' },
]

const content = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum saepe fuga voluptates laudantium odit delectus commodi eius quis harum quo amet odio, nisi explicabo exercitationem iusto quidem est iure minus non sed doloremque ut dignissimos? Facere eos explicabo natus est culpa fugit impedit quos praesentium Lorem,\nIpsum dolor sit amet consectetur adipisicing elit. Blanditiis corrupti temporibus architecto similique cumque eius vitae saepe ipsum possimus, in odit hic numquam, facilis voluptatum, repellendus asperiores laudantium quod voluptate. Fugit, accusantium? Voluptas maxime, aperiam earum porro nisi eveniet enim."

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

interface vc_data {
  issuer_name: string,
  issuer_publicDid: string,
  issuance_date: string,
  expiration_date: string,
  vc_id: string,
  vc_type: string,
}

interface event_data_props {
  event_data: event_data | null,
  issuer_data: issuer_data[],
}

const EventPostPage: React.FC<event_data_props> = ({ event_data, issuer_data }) => {
    const router = useRouter();

    const { userData } = useGlobalContext();
    const [userDid, setUserDid] = useState<string>('');

    const [userVCs, setUserVCs] = useState<vc_data[]>([]);
    const [selectedVCId, setSelectedVCId] = useState<string>('');

    const [toggle, setToggle] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    const iconStyle = {
        strokeWidth: '4',
    };

    function formatDate(inputDate: any) {
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

      const dateParts = inputDate.split(' ')[0].split('-');
      const year = parseInt(dateParts[0]);
      const monthIndex = parseInt(dateParts[1]) - 1;
      const day = parseInt(dateParts[2]);

      const monthName = months[monthIndex];

      return `${monthName} ${day}, ${year}`;
    }

    const fetchUserDid = async () => {
      setUserDid('');
      toast.loading("Fetching User Details..", {id: "FetchUserDetails"})

      var requestOptions = {
        method: 'GET',
      };
      let response = await fetch(`${GetUserDetailsById}${userData?.userDetailsId}`, requestOptions)
      console.log(response)

      if (response.ok) {
        let result = await response.json();
        console.log(result);
        toast.dismiss();
        toast.success("User Details Fetched Successfully!", {id: "SuccessUserDetails"});
        setUserDid(result.userDid);
      } else {
        toast.dismiss();
        toast.error("User Details not found!", {id: "FailUserDetails"});
      }
    }

    const handleBooking = () => {
      if (!userData) {
        toast.error("Wallet Not Connected!");
        return;
      }

      if (!userData.userDetailsId) {
        toast.error("User Registration Required!");
        router.push('/user-profile');
        return;
      }

      fetchUserDid();
    }

    useEffect(() => {
      const fetchUserVCs = async () => {
        toast.loading("Fetching User VCs..", {id: "LoadingUserVC"});
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          "userDid": userDid,
          "issuers": event_data?.trustedIssuers
        });

        console.log(raw);

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
        };

        let response = await fetch(`${PostUserVCsFromUserDid}`, requestOptions)

        console.log(response);

        if (response.ok) {
          toast.dismiss();
          let result = await response.json();
          console.log(result);
          if (result.length > 0) {

            toast.success("User VCs Fetched Successfully!", {id: "SuccessUserVC"});
            const vcModal = document.getElementById('vcModal');
            vcModal!.classList.add("show");
            let vcList: vc_data[] = [];
            result.map((vc: any) => {
              let temp_vc: vc_data = {
                issuer_name: vc.issuer.name,
                issuer_publicDid: vc.issuer.publicDid,
                issuance_date: formatDate(vc.validFrom),
                expiration_date: formatDate(vc.expirationDate),
                vc_id: vc.id,
                vc_type: vc.proof.proofPurpose,
              }
              vcList.push(temp_vc);
            })

            setUserVCs(vcList);

          } else {

            toast.error("No VCs Available!", {id: "FailureUserVC"});
            const issuerModal = document.getElementById("issuerModal");
            issuerModal!.classList.add('show');

          }
        } else {
          toast.error("Something went wrong!", {id: "UnknownFailureUserVC"});
        }
      }

      if (userDid) {
        fetchUserVCs();
      }
    }, [userDid])

    const handleScroll = () => {
        // console.log("scroll"+containerRef?.current?.scrollWidth)
        // console.log("client"+containerRef?.current?.clientWidth)
        // console.log("left"+containerRef.current?.scrollLeft);
        // console.log("diff"+(Number(containerRef?.current?.scrollWidth)-Number(containerRef?.current?.clientWidth)))
        if (containerRef.current) {
            setShowLeftArrow(containerRef.current.scrollLeft > 0);
            setShowRightArrow(containerRef.current.scrollLeft < containerRef.current.scrollWidth - containerRef.current.clientWidth);
            // setShowRightArrow(false);
        }
    };

    const scrollLeft = () => {

        if (containerRef.current) {
            containerRef.current.scrollLeft -= 100;
        }
    };

    const scrollRight = () => {

        console.log(containerRef.current?.scrollLeft)

        if (containerRef.current) {
            containerRef.current.scrollLeft += 100;
        }
    };

    useEffect(() => {

        handleScroll();

        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, [containerRef]);



    return (
        <article className="">
            <TicketModal
              event_data={event_data}
              selectedVCId={selectedVCId}
            />

            <IssuerModal
              issuer_data={issuer_data}
              userDetailsId={String(userData?.userDetailsId)}
            />

            <VCsModal
              vc_data={userVCs}
              setSelectedVCId={setSelectedVCId}
            />

            <div className="hidden lg:contents md:contents" style={{ color: "rgb(255, 255, 255) relative" }}>
                <div className="h-[490px] overflow-hidden absolute left-0 right-0 bg-gradient-to-r from-[#1c1c1c] z-10"></div>
                <div className="h-[490px] overflow-hidden absolute left-0 right-0 opacity-75">
                    <ImageFallback
                        height={490}
                        width={300}
                        src={event_data?.imageUrls[1]}
                        alt="event-image-2"
                        className="object-cover w-full h-full z-0"
                    />
                </div>
                <div className="flex items-center justify-center m-0 w-full relative z-20">

                    <div className="h-[490px] overflow-hidden w-full flex items-center p-6 rounded">
                        <div className="flex items-start justify-between w-full">
                            <div className="flex gap-8">
                                <div className="w-[261px] h-[416px] rounded overflow-hidden object-cover">
                                    <ImageFallback
                                        height={200}
                                        width={300}
                                        src={event_data?.imageUrls[0]}
                                        alt="event-image"
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <div className="flex flex-col gap-6 justify-center">

                                    {/* <p>Music Event</p> */}
                                    <p className="text-3xl font-bold text-white">{event_data?.name}</p>

                                    <button className="rounded">
                                        <div className="flex items-center gap-2">
                                            <Image
                                                height={32}
                                                width={32}
                                                src={'/images/star_icon.png'}
                                                alt="star_icon"
                                            />
                                            <p className="text-xl font-bold text-white ">7.8/10</p>
                                            <span className="text-white">12.8K Votes</span>
                                            <svg className="h-4 w-4 fill-current rotate-[270deg]" viewBox="0 0 20 20">
                                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                            </svg>
                                        </div>
                                    </button>

                                    <div className="bg-opacity-70 rounded py-4" style={{ backgroundColor: "#333" }}>
                                        <div className="flex items-center justify-between px-4">
                                            <div className="flex items-start flex-col">
                                                <p className="text-xl font-bold text-white">Add your rating & review</p>
                                                <p style={{ color: "rgb(204, 204, 204)" }}>Your ratings matter</p>
                                            </div>
                                            <Link href={'#'} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                                                Rate Now
                                            </Link>
                                        </div>
                                    </div>

                                    <ul className="flex items-center gap-4 flex-wrap">
                                        <li className='flex gap-1'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-white">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                                            </svg>
                                            <span className="text-white">{event_data?.dateAndTime.split(" ")[0]}</span>
                                        </li>

                                        <li className='flex gap-1'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-white">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                            <span className={"text-white"}>
                                              {event_data?.dateAndTime.split(" ")[1]}
                                            </span>
                                        </li>

                                        <li className='flex gap-1'>
                                             <GoHourglass className={"text-white"} size={24}/>
                                            <span className="text-white">
                                               {event_data?.eventDuration}
                                            </span>
                                        </li>
                                        <li className='flex gap-1'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-white">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                            </svg>

                                            <span className={"text-white"}>
                                                {event_data?.venueId.address}
                                            </span>

                                        </li>

                                    </ul>

                                    <div>
                                        <button onClick={() => handleBooking()} className="btn btn-primary">
                                            Book Tickets
                                        </button>
                                    </div>
                                </div>
                            </div>


                            <div className="hidden lg:contents">
                                <div className="btn btn-outline-primary h-fit flex gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                                    </svg>
                                    share
                                </div>
                            </div>
                        </div>
                  </div>
                </div>
            </div>

            <div className="px-4">
                <div className="lg:hidden md:hidden">


                    <ImageFallback
                        height={500}
                        width={1200}
                        src={event_data?.imageUrls[0]}
                        alt="event-image"
                        className="object-cover rounded"
                    />



                    <div className="flex flex-col gap-4 mt-[16px]">
                        {/* <p>Music Event</p> */}
                        <p className="text-3xl font-bold">{event_data?.name}</p>

                        <button className="rounded">
                            <div className="flex items-center gap-2">

                                <Image
                                    height={32}
                                    width={32}
                                    src={'/images/star_icon.png'}
                                    alt="star_icon"
                                />

                                <p className="text-xl font-bold">7.8/10</p>
                                <span >12.8K Votes</span>
                                <svg className="h-4 w-4 fill-current rotate-[270deg]" viewBox="0 0 20 20">
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                            </div>
                        </button>

                        {/* <div className="bg-opacity-70 rounded py-4" style={{ backgroundColor: "#333" }}>
                            <div className="flex items-center justify-between px-4">
                            <div className="flex items-start flex-col">
                                <p className="text-xl font-bold text-white">Add your rating & review</p>
                                <p style={{ color: "rgb(204, 204, 204)" }}>Your ratings matter</p>
                            </div>
                            <Link href={'#'} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                                Rate Now
                            </Link>
                            </div>
                        </div> */}

                        <ul className="list-disc list-inside flex flex-col items-start">
                            <li className='flex gap-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                                </svg>
                                <span>{event_data?.dateAndTime.split(" ")[0]}</span>
                            </li>

                            <li className='flex gap-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <span>
                                  {event_data?.dateAndTime.split(" ")[1]}</span></li>
                            <li className='flex gap-1'>
                                 <GoHourglass size={24}/>
                                <span>
                                   {event_data?.eventDuration}
                                </span>
                            </li>
                            <li className='flex gap-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                </svg>

                                <span>
                                    {event_data?.venueId.address}
                                </span>

                            </li>
                        </ul>


                        {/*<div>
                            <button data-ticket-trigger className="btn btn-primary w-full text-center">
                                Book Tickets
                            </button>
                        </div>*/}
                    </div>
                </div>

                <div className="pt-[16px] m-1">
                    <h1 className="h2 mb-4">About the event</h1>
                    {/* <ul className="mb-4">
                    <li className="mr-4 inline-block">
                    <Link href={`/authors/${slugify(author)}`}>
                        <FaRegUserCircle className={"-mt-1 mr-2 inline-block"} />
                        {humanize(author)}
                    </Link>
                    </li>
                    <li className="mr-4 inline-block">
                    <FaRegFolder className={"-mt-1 mr-2 inline-block"} />
                    {categories?.map((category: string, index: number) => (
                        <Link
                        key={category}
                        href={`/categories/${slugify(category)}`}
                        >
                        {humanize(category)}
                        {index !== categories.length - 1 && ", "}
                        </Link>
                    ))}
                    </li>
                    {date && (
                    <li className="mr-4 inline-block">
                        <FaRegClock className="-mt-1 mr-2 inline-block" />
                        {dateFormat(date)}
                    </li>
                    )}
                </ul> */}
                    <div className="content">
                        <p>
                            {toggle ? event_data?.description : event_data?.description.slice(0, 300)}
                            <button className="pl-2 font-semibold" onClick={(e) => setToggle(!toggle)}>{toggle ? 'Read less' : 'Read more'}</button>
                        </p>

                    </div>
                    {/* <div className="row items-start justify-between">
                        <div className="mb-10 flex items-center lg:col-5 lg:mb-0">
                        <h5 className="mr-3">Tags :</h5>
                        <ul>
                            {tags?.map((tag: string) => (
                            <li key={tag} className="inline-block">
                                <Link
                                className="m-1 block rounded bg-theme-light px-3 py-1 hover:bg-primary hover:text-white dark:bg-darkmode-theme-light dark:hover:bg-darkmode-primary dark:hover:text-dark"
                                href={`/tags/${slugify(tag)}`}
                                >
                                {humanize(tag)}
                                </Link>
                            </li>
                            ))}
                        </ul>
                        </div>
                        <div className="flex items-center lg:col-4">
                        <h5 className="mr-3">Share :</h5>
                        <Share
                            className="social-icons"
                            title={title}
                            description={description}
                            slug={post.slug!}
                        />
                        </div>
                    </div> */}
                    <div>
                        <hr className="h-px my-8 dark:bg-gray-600 border-0 bg-gray-200" />

                        <h2 className="h3">Artists</h2>
                        <div className="relative">
                            <div className="flex items-center gap-6 overflow-scroll no-scrollbar" ref={containerRef}>
                                {event_data?.artists.map((artist) => (
                                    <div key={artist.id} className="flex flex-col items-center my-3">
                                        <div className="w-32 h-32 overflow-hidden rounded-full">
                                            <ImageFallback
                                                height={100}
                                                width={100}
                                                src={artist.profileImg}
                                                alt="event image"
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                        <span className="font-semibold">{artist.name}</span>
                                    </div>
                                ))}
                            </div>
                            <button className={`absolute left-0 top-1/2 transform -translate-y-1/2 ${showLeftArrow ? '' : 'hidden'}`} onClick={scrollLeft}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                </svg>

                            </button>
                            <button className={`absolute right-0 top-1/2 transform -translate-y-1/2 ${showRightArrow ? '' : 'hidden'}`} onClick={scrollRight}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>

                            </button>
                        </div>

                        {/*<hr className="h-px my-8 dark:bg-gray-600 border-0 bg-gray-200" />*/}

                    </div>
                    {/* <Disqus className="mt-20" /> */}

                </div>

                {/* <!-- Related posts --> */}
                {/*<div className="pb-0">
                    <h2 className="h3 mb-10 text-center">Related Posts</h2>
                    <div className="row justify-center">
                        {similarPosts.map((post: any) => (
                            <div key={post.slug} className="lg:col-4 mb-7">
                                <BlogCard data={post} />
                            </div>
                        ))}
                    </div>
                </div>*/}


            </div>
        </article>
    )
}

export default EventPostPage;
