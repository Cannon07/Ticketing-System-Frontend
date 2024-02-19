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
  const { date, price, categories, selectedCity } = useGlobalContext();

  const sortEventsByDate = (events: event_data[]) => {
    return [...events].sort((prev, curr) => {
      let prevTimestamp = Date.parse(prev.dateAndTime.split(" ")[0]);
      let currTimestamp = Date.parse(curr.dateAndTime.split(" ")[0]);
      return prevTimestamp - currTimestamp;
    })
  }

  const getEventsByDateFilter = (events: event_data[]) => {
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

    return [...new Set([...events_today, ...events_tomorrow, ...events_weekend])];
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
        if (date.today || date.weekend || date.tomorrow) {
          let filtered_events = getEventsByDateFilter(result)
          setEvents(filtered_events);
          setTotalPages(Math.ceil(filtered_events.length / pagination));
        } else {
          let sorted_events = sortEventsByDate(result);
          setEvents(sorted_events);
          setTotalPages(Math.ceil(sorted_events.length / pagination));
        }
      } else {
        toast.error("No events available!")
        setEvents([]);
      }
    }
    fetchEventsByCity();
    console.log(events)
  }, [selectedCity, date])

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
