import ImageFallback from "@/helpers/ImageFallback"
import { GetEventsById } from "@/constants/endpoint_constants/EventEndpoints";
import { useEffect, useState } from "react"

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

interface event_props {
  eventData: event_data | null,
}

export const EventOverviewCard: React.FC<event_props> = ({ eventData }) => {

  return (
    <div className={"lg:col-7 h-full"}>
      <h3 className={"mb-6"}>Event Overview</h3>
        <div className="h-full rounded bg-theme-light p-8 dark:bg-darkmode-theme-light flex flex-col gap-8 items-center lg:flex-row md:flex-row sm:flex-col">
          <div className="h-full w-full rounded overflow-hidden object-cover lg:h-[350px] lg:w-[350px] md:h-[300px]">
              <ImageFallback
                  height={300}
                  width={350}
                  src={eventData?.imageUrls[0]}
                  alt="event-image"
                  className="object-cover w-full h-full"
              />
          </div>
          <div className={"flex flex-col w-full h-full"}>
            <h3 className={"mb-4 line-clamp-2"}>{eventData?.name}</h3>
            <div className={"flex flex-col gap-4"}>
              <p className={"line-clamp-4"}>{eventData?.description}</p>
              <h5>Venue: {eventData?.venueId.name}</h5>
              <div className={"flex justify-between"}>
                <h5>{eventData?.dateAndTime.split(" ")[0]}</h5>
                <h5>{eventData?.eventDuration}</h5>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}
