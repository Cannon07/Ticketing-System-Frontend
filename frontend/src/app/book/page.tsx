'use client'

import { EventOverviewCard } from "@/components/EventOverviewCard";
import { useEffect, useState } from "react";
import config from "@/config/config.json";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import { getAllTaxonomy, getTaxonomy } from "@/lib/taxonomyParser";
import { sortByDate } from "@/lib/utils/sortFunctions";
import PageHeader from "@/partials/PageHeader";
import ReceitSidebar from "@/partials/ReceitSidebar";
import SeoMeta from "@/partials/SeoMeta";
import { Post } from "@/types";
import { useSearchParams } from "next/navigation";
import { GetEventsById } from "@/constants/endpoint_constants/EventEndpoints";
import toast from "react-hot-toast";
import NotConnected from "../not-connected";
import { useRouter } from "next/navigation";

const { blog_folder, pagination } = config.event_settings_2;

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
  dateAndTime: string,
  eventDuration: String,
  venueId: venue_data,
  transactionId: String,
  categoryList: String[],
  imageUrls: String[],
  artists: artist_data[],
  tiers: tier_data[],
}

const Book = () => {
  //const postIndex: Post = getListPage(`${blog_folder}/_index.md`);
  //const { title, meta_title, description, image } = postIndex.frontmatter;
  //const posts: Post[] = getSinglePage(blog_folder);
  //const allCategories = getAllTaxonomy(blog_folder, "categories");
  //const categories = getTaxonomy(blog_folder, "categories");
  //const tags = getTaxonomy(blog_folder, "tags");
  //const sortedPosts = sortByDate(posts);
  //const totalPages = Math.ceil(posts.length / pagination);
  //const currentPosts = sortedPosts.slice(0, pagination);

  const router = useRouter();

  const searchParams = useSearchParams();
  const eventId = searchParams.get('eventId');
  const totalTickets = searchParams.get('totalTickets');
  const selectedVCId = searchParams.get('vcId');
  const [eventData, setEventData] = useState<event_data | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEventByEventId = async () => {
      var requestOptions = {
        method: 'GET',
      };
      toast.loading("Fetching Tier Details..");
      setLoading(true)
      let response = await fetch(`${GetEventsById}id=${eventId}`,   requestOptions)
      if (response.ok) {
        let result = await response.json();
        setEventData(result);
        setLoading(false);
        console.log(result);
        toast.dismiss();
        toast.success("Tier Details Fetched Successfully!")
      } else {
        setLoading(false);
        toast.error("Something went Wrong!");
        router.push('/event')
      }
    }
    if (!eventId || !totalTickets || !selectedVCId) {
      toast.error("Not Available!");
      router.push('/event');
    } else {
      fetchEventByEventId();
      console.log(eventData);
    }
  }, [])


  return (
    <>
      {/*<SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />*/}
      <PageHeader title={"Checkout"} />
      <section className="section">
        <div className="container">
          <div className="row h-full">
            {/*<div className="lg:col-8">
              <div className="row">
                {currentPosts.map((post: any, index: number) => (
                  <div key={index} className="mb-14 lg:col-4 md:col-6">
                    <EventCard data={post} />
                  </div>
                ))}
              </div>
              <Pagination
                section={blog_folder}
                currentPage={1}
                totalPages={totalPages}
              />
            </div>*/}
            {loading ? <NotConnected /> :
              <>
                <EventOverviewCard
                  eventData={eventData}
                />

                <ReceitSidebar
                  eventData={eventData}
                  totalTickets={totalTickets}
                  selectedVCId={selectedVCId}
                />
              </>
            }
          </div>
        </div>
      </section>
    </>
  );
};

export default Book;
