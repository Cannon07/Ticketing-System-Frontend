'use client'

import { useState, useEffect } from "react";
import EventCard from "@/components/EventCard";
import Pagination from "@/components/Pagination";
import config from "@/config/config.json";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import { getAllTaxonomy, getTaxonomy } from "@/lib/taxonomyParser";
import { sortByDate } from "@/lib/utils/sortFunctions";
import PageHeader from "@/partials/PageHeader";
import PostSidebar from "@/partials/PostSidebar";
import SeoMeta from "@/partials/SeoMeta";
import { Post } from "@/types";
import { useParams } from "next/navigation";
import { useGlobalContext } from "@/app/context/globalContext";
import { GetEventsByCity } from "@/constants/endpoint_constants/EventEndpoints";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import MobilePostSidebar from "@/partials/MobilePostSidebar";

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
  dateAndTime: String,
  eventDuration: String,
  venueId: venue_data,
  transactionId: String,
  categoryList: String[],
  imageUrls: String[],
  artists: artist_data[],
  tiers: tier_data[],
}

// for all regular pages
const Events = () => {
  //const postIndex: Post = getListPage(`${blog_folder}/_index.md`);
  //const { title, meta_title, description, image } = postIndex.frontmatter;
  //const posts: Post[] = getSinglePage(blog_folder);
  //const allCategories = getAllTaxonomy(blog_folder, "categories");
  //const categories = getTaxonomy(blog_folder, "categories");
  //const tags = getTaxonomy(blog_folder, "tags");
  //const sortedPosts = sortByDate(posts);
  //const totalPages = Math.ceil(posts.length / pagination);
  //const currentPage =
  //  params.page && !isNaN(Number(params.page)) ? Number(params.page) : 1;
  //const indexOfLastPost = currentPage * pagination;
  //const indexOfFirstPost = indexOfLastPost - pagination;
  //const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  const router = useRouter();
  const params = useParams<{ page: string }>();
  const [events, setEvents] = useState<event_data[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const { date, price, categories, selectedCity } = useGlobalContext();

  const sortEventsByDate = (events: event_data[]) => {
    return [...events].sort((prev, curr) => {
      let prevTimestamp = Date.parse(prev.dateAndTime.split(" ")[0]);
      let currTimestamp = Date.parse(curr.dateAndTime.split(" ")[0]);
      return prevTimestamp - currTimestamp;
    })
  }

  const getEventsByFilter = (events: event_data[]) => {
    let today = new Date();

    let events_today: event_data[] = [];
    if (date.today) {
      events_today = events.filter((event) => {
        let event_timestamp = Date.parse(event.dateAndTime.split(" ")[0]);
        let event_date = new Date(event_timestamp);
        return event_date.getDate() == today.getDate() && event_date.getFullYear() == today.getFullYear() && event_date.getMonth() == today.getMonth();
      })
    }

    let events_tomorrow: event_data[] = [];
    if (date.tomorrow) {
      events_tomorrow = events.filter((event) => {
        let event_timestamp = Date.parse(event.dateAndTime.split(" ")[0]);
        let event_date = new Date(event_timestamp);
        return event_date.getDate() == today.getDate() + 1 && event_date.getFullYear() == today.getFullYear() && event_date.getMonth() == today.getMonth();
      })
    }

    let events_weekend: event_data[] = [];
    if (date.weekend) {
      events_weekend = events.filter((event) => {
        let event_timestamp = Date.parse(event.dateAndTime.split(" ")[0]);
        let event_date = new Date(event_timestamp);
        let daysUntilSat = (6 - today.getDay() + 7) % 7;
        let daysUntilSun = (7 - today.getDay()) % 7;
        return (event_date.getDate() == today.getDate() + daysUntilSat && event_date.getFullYear() == today.getFullYear() && event_date.getMonth() == today.getMonth())
          ||
          (event_date.getDate() == today.getDate() + daysUntilSun && event_date.getFullYear() == today.getFullYear() && event_date.getMonth() == today.getMonth());
      })
    }

    let events_free: event_data[] = [];
    if (price.Free) {
      events_free = events.filter((event) => {
        return event.tiers.some((tier) => tier.price == 0)
      });
    }

    let events_under_500: event_data[] = [];
    if (price.below_500) {
      events_under_500 = events.filter((event) => {
        return event.tiers.some((tier) => tier.price < 501)
      });
    }

    let events_between_500_1000: event_data[] = [];
    if (price.between_500_1000) {
      events_between_500_1000 = events.filter((event) => {
        return event.tiers.some((tier) => tier.price > 500 && tier.price < 1001)
      });
    }

    let events_above_2000: event_data[] = [];
    if (price.Above_2000) {
      events_above_2000 = events.filter((event) => {
        return event.tiers.some((tier) => tier.price > 2000)
      });
    }

    let events_rock: event_data[] = [];
    if (categories.Rock) {
      events_rock = events.filter((event) => {
        return event.categoryList.some((category) => category == "Rock")
      });
    }

    let events_pop: event_data[] = [];
    if (categories.Pop) {
      events_pop = events.filter((event) => {
        return event.categoryList.some((category) => category == "Pop")
      });
    }

    let events_jazz: event_data[] = [];
    if (categories.Jazz) {
      events_jazz = events.filter((event) => {
        return event.categoryList.some((category) => category == "Jazz")
      });
    }

    let events_classical: event_data[] = [];
    if (categories.Classical) {
      events_classical = events.filter((event) => {
        return event.categoryList.some((category) => category == "Classical")
      });
    }

    let events_hip_hop: event_data[] = [];
    if (categories.Hip_hop) {
      events_hip_hop = events.filter((event) => {
        return event.categoryList.some((category) => category == "Hip-hop")
      });
    }

    let events_electronic_dance: event_data[] = [];
    if (categories.Electronic_Dance) {
      events_electronic_dance = events.filter((event) => {
        return event.categoryList.some((category) => category == "Electronic/Dance")
      });
    }

    let events_country: event_data[] = [];
    if (categories.Country) {
      events_country = events.filter((event) => {
        return event.categoryList.some((category) => category == "Country")
      });
    }

    let events_r_b_soul: event_data[] = [];
    if (categories.R_B_Soul) {
      events_r_b_soul = events.filter((event) => {
        return event.categoryList.some((category) => category == "R&B/Soul")
      });
    }

    let events_folk: event_data[] = [];
    if (categories.Folk) {
      events_folk = events.filter((event) => {
        return event.categoryList.some((category) => category == "Folk")
      });
    }

    let events_alternative: event_data[] = [];
    if (categories.Alternative) {
      events_alternative = events.filter((event) => {
        return event.categoryList.some((category) => category == "Alternative")
      });
    }

    return [...new Set([...events_today, ...events_tomorrow, ...events_weekend, ...events_free, ...events_under_500, ...events_between_500_1000, ...events_above_2000, ...events_rock, ...events_pop, ...events_jazz, ...events_classical, ...events_hip_hop, ...events_electronic_dance, ...events_country, ...events_r_b_soul, ...events_folk, ...events_alternative])];
  }

  useEffect(() => {
    const fetchEventsByCity = async () => {
      var requestOptions = {
        method: 'GET',
      };
      toast.dismiss();
      toast.loading("Fetching events..", {
        id: 'eventsLoading'
      })
      let response = await fetch(`${GetEventsByCity}city=${selectedCity}`, requestOptions)
      toast.dismiss()
      if (response.status != 404) {
        let result = await response.json();
        console.log(result);

        if (result.length > pagination * (Number(params.page)-1)) {
          toast.success("Events fetched successufully!", {
            id: 'eventsFetched'
          })
          if (date.today || date.tomorrow || date.weekend || price.Free || price.below_500 || price.between_500_1000 || price.Above_2000 || categories.Rock || categories.Pop || categories.Jazz || categories.Classical|| categories.Hip_hop || categories.Electronic_Dance || categories.Country || categories.R_B_Soul || categories.Folk || categories.Alternative) {
            let filtered_events = getEventsByFilter(result);
            if (filtered_events.length > pagination * (Number(params.page)-1)) {
              setEvents(filtered_events);
              setTotalPages(Math.ceil(filtered_events.length / pagination));
            } else {
             router.push('/event');
            }
          } else {
            let sortedEvents = sortEventsByDate(result);
            setEvents(sortedEvents);
            setTotalPages(Math.ceil(sortedEvents.length / pagination));
          }
        } else {
          router.push('/event');
        }
      } else {
        toast.error("No events available!")
        setEvents([]);
      }
    }

    fetchEventsByCity();
  }, [selectedCity, date, price, categories])

  return (
    <>
      {/*<SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />*/}
      <PageHeader title={"Events"} />
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="lg:hidden">
              <MobilePostSidebar />
            </div>
            <div className="lg:col-8">
              <div className="row">
                {events.slice((Number(params.page)-1)*pagination, Number(params.page)*pagination).map((event: any, index: number) => (
                  <div key={index} className="mb-14 lg:col-4 md:col-6">
                    <EventCard data={event} />
                  </div>
                ))}
              </div>
              <Pagination
                section={'event'}
                currentPage={Number(params.page)}
                totalPages={totalPages}
              />
            </div>
            <div className="lg:col-4 lg:block hidden">
              <PostSidebar />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Events;
