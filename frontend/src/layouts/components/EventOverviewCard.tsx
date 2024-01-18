import ImageFallback from "@/helpers/ImageFallback"

export const EventOverviewCard = () => {
  return (
    <div className={"lg:col-7 h-full"}>
      <h3 className={"mb-6"}>Event Overview</h3>
        <div className="h-full rounded bg-theme-light p-8 dark:bg-darkmode-theme-light flex flex-col gap-8 items-center lg:flex-row md:flex-row sm:flex-col">
          <div className="h-full w-full rounded overflow-hidden object-cover lg:h-[350px] lg:w-[350px] md:h-[300px]">
              <ImageFallback
                  height={300}
                  width={350}
                  src={'/images/event-image.png'}
                  alt="event-image"
                  className="object-cover w-full h-full"
              />
          </div>
          <div className={"flex flex-col w-full h-full"}>
            <h3 className={"mb-4"}>Lorem ipsum dolor sit amet consectetur.</h3>
            <div className={"flex flex-col gap-4"}>
              <p>Event description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis illum nesciunt commodi vel nisi ut alias excepturi ipsum, totam, labore tempora, odit ex iste tempore sed. </p>
              <h5>Venue: Pavillion, S.B. Road, Pune</h5>
              <div className={"flex justify-between"}>
                <h5>13th Feb 2023</h5>
                <h5>103 mins</h5>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}
