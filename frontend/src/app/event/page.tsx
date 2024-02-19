'use client'

import { useState, useEffect } from "react";

import EventCard from "@/components/EventCard";
import Pagination from "@/components/Pagination";
import config from "@/config/config.json";
import PageHeader from "@/partials/PageHeader";
import PostSidebar from "@/partials/PostSidebar";
import SeoMeta from "@/partials/SeoMeta";
import { GetEventsByCity } from "@/constants/endpoint_constants/EventEndpoints";
import toast from "react-hot-toast";
import { useGlobalContext } from "../context/globalContext";
import NotConnected from "../not-connected";

const { pagination } = config.event_settings_2;

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

interface event_data {
  id: String,
  name: String,
  description: String,
  dateAndTime: String,
  eventDuration: String,
  venueId: String,
  transactionId: String,
  categoryList: String[],
  imageUrls: String[],
  artists: artist_data[],
  tiers: tier_data[],
}

const Events = () => {
  const [events, setEvents] = useState<event_data[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const { selectedCity } = useGlobalContext();

  const sortEventsByDate = (events: event_data[]) => {
    return [...events].sort((prev, curr) => {
      let prevTimestamp = Date.parse(prev.dateAndTime.split(" ")[0]);
      let currTimestamp = Date.parse(curr.dateAndTime.split(" ")[0]);
      return prevTimestamp - currTimestamp;
    })
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
      let result = await response.json()
      toast.dismiss()
      console.log(result)
      if (response.status != 404) {
        toast.success("Events fetched successufully!", {
          id: 'eventsFetched'
        })
        let sortedEvents = sortEventsByDate(result);
        setEvents(sortedEvents);
        setTotalPages(Math.ceil(result.length / pagination));
      } else {
        toast.error("No events available!")
        setEvents([]);
      }
    }
    fetchEventsByCity();
    console.log(events)
  }, [selectedCity])

  return (
    <>

      {/*<SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />*/}
      <PageHeader title={"Events"} />
      {events.length == 0 ?
        <NotConnected /> :
        <section className="section">
          <div className="container">
            <div className="row gx-5">
              <div className="lg:col-8">
                <div className="row">
                  {events.slice(0, pagination).map((event: any, index: number) => (
                    <div key={index} className="mb-14 lg:col-4 md:col-6">
                      <EventCard data={event} />
                    </div>
                  ))}
                </div>
                {totalPages > 1 &&
                  <Pagination
                    section={'event'}
                    currentPage={1}
                    totalPages={totalPages}
                  />
                }
              </div>

              <PostSidebar />
            </div>
          </div>
        </section>
      }
    </>
  );
};

export default Events;
