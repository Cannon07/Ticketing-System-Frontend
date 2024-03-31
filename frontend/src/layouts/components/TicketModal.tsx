"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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

interface event_data_props {
  event_data: event_data | null,
  selectedVCId: string,
}

interface TicketObject {
  [key: number]: boolean
}

const TicketModal: React.FC<event_data_props> = ({ event_data, selectedVCId }) => {
  const router = useRouter();

  let ticketList: TicketObject[] = [];
  for (let i=1; i<=10; i++) {
    ticketList.push({[i]: false})
  }

  let tierList = [
    {
      "name": "NORMAL",
      "price": "Rs 130",
      "status": "Available"
    },
    {
      "name": "EXECUTIVE",
      "price": "Rs 160",
      "status": "Available"
    },
    {
      "name": "PREMIUM",
      "price": "Rs 190",
      "status": "Available"
    },
  ]

  const [totalTickets, setTotalTickets] = useState<TicketObject[]>(ticketList);
  const [ticket, setTicket] = useState<number>();

  useEffect(() => {
    const ticketModal = document.getElementById("ticketModal");
    const ticketModalOverlay = document.getElementById("ticketModalOverlay");
    const ticketModalTriggers = document.querySelectorAll(
      "[data-ticket-trigger]",
    );

    ticketModalTriggers.forEach((button) => {
      button.addEventListener("click", function () {
        const ticketModal = document.getElementById("ticketModal");
        ticketModal!.classList.add("show");
      });
    });

    ticketModalOverlay!.addEventListener("click", function () {
      ticketModal!.classList.remove("show");
    });
  }, []);

  const handleTotalTickets = (ticketKey: number) => {
    let ticketList = [];
    for (let i=1; i<=10; i++) {
      if (i === ticketKey)
        ticketList.push({[i]: true})
      else
        ticketList.push({[i]: false})
    }
    setTotalTickets(ticketList);
    setTicket(ticketKey);
  }

  return (
    <div id="ticketModal" className="search-modal">
      <div id="ticketModalOverlay" className="search-modal-overlay" />
      <div className="search-wrapper">
        <div className="search-wrapper-header">
          <div className={"flex flex-col items-center gap-4"}>
            <div className={"flex flex-col items-center mb-4"}>
              <h3 >How Many Tickets ?</h3>
              <p>VC Id: {selectedVCId}</p>
            </div>
            <div className={"flex gap-2 justify-center w-full flex-wrap"}>
              {totalTickets.map((ticket, index) => {
                const ticketKey = Object.keys(ticket)[0];
                const ticketValue = ticket[Number(ticketKey)]
                return (
                  <button
                    onClick={() => handleTotalTickets(Number(ticketKey))}
                    className={`btn ${ticketValue ? "btn-primary" : "btn-outline-primary"}`}
                    key={index}
                  >
                    {ticketKey}
                  </button>
                );
              })}
            </div>
            <hr className="h-px my-2 w-full dark:bg-gray-600 border-0 bg-gray-200" />
            <div className={"flex justify-center gap-8 flex-wrap"}>
              {event_data?.tiers.map((tier, index) => {
                return (
                  <div
                    className={"flex flex-col items-center"}
                    key={index}
                  >
                    <p>{tier.name}</p>
                    <p className={"font-semibold"}>{tier.price}</p>
                    <p>Available</p>
                  </div>
                )
              })}
            </div>
            <div
              onClick={() => {
                if (ticket) {
                  router.push(`/book?eventId=${event_data?.id}&totalTickets=${ticket}&vcId=${selectedVCId}`)
                } else {
                  toast.error("Select Tickets Count!")
                }
              }}
              className={"btn btn-primary w-full md:w-9/12"}
            >
              <h5 className={"text-white dark:text-dark flex justify-center"}>Book {ticket} Tickets</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketModal;
