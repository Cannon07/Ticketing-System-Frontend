'use client'

import { useState, useEffect } from "react";
import BlogCard from "@/components/BlogCard";
import Disqus from "@/components/Disqus";
import Share from "@/components/Share";
import config from "@/config/config.json";
import ImageFallback from "@/helpers/ImageFallback";
import MDXContent from "@/helpers/MDXContent";
import { getSinglePage } from "@/lib/contentParser";
import dateFormat from "@/lib/utils/dateFormat";
import similerItems from "@/lib/utils/similarItems";
import { humanize, markdownify, slugify } from "@/lib/utils/textConverter";
import SeoMeta from "@/partials/SeoMeta";
import { EventPost } from "@/types";
import Link from "next/link";
import {
  FaRegClock,
  FaRegFolder,
  FaRegUserCircle,
} from "react-icons/fa/index.js"
import Image from "next/image";
import EventPostPage from "@/components/EventPostPage";
import { useParams } from "next/navigation";
import { GetEventsById } from "@/constants/endpoint_constants/EventEndpoints";

const { blog_folder } = config.event_settings_2;

// remove dynamicParams
//export const dynamicParams = false;

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
}

const EventSingle = () => {
  //const posts: EventPost[] = getSinglePage(blog_folder);

  //const { frontmatter, content } = post;
  //const {
  //  title,
  //  about,
  //  cast,
  //  artists,
  //  meta_title,
  //  description,
  //  image,
  //  image2,
  //  star_icon,
  //  author,
  //  categories,
  //  date,
  //  tags,
  //} = frontmatter;
  //const similarPosts = similerItems(post, posts, post.slug!);
  const [eventData, setEventData] = useState<event_data | null>(null);
  const params = useParams<{ single: string }>();

  useEffect(() => {
    const fetchEventByEventId = async () => {
      var requestOptions = {
        method: 'GET',
      };
      let response = await fetch(`${GetEventsById}id=${params.single}`, requestOptions)
      if (response.status != 404) {
        let result = await response.json();
        setEventData(result);
        console.log(result);
      }
    }

    fetchEventByEventId();

  }, [])

  return (
    <>
      {/*<SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />*/}


      {/* , backgroundColor:"rgb(26, 26, 26)" */}

      <section>
        <div className="container">
        <div className="row justify-center">

            <EventPostPage
              event_data={eventData}
            />

        </div>
        </div>
      </section >
    </>
  );
};

export default EventSingle;
