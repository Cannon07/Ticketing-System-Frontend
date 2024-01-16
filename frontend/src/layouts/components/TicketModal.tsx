"use client";

import React, { useEffect, useState } from "react";

interface TicketObject {
  [key: number]: boolean
}

const TicketModal = () => {
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
            <h3 className={"mb-4"}>How Many Tickets ?</h3>
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
            <hr className="h-px my-4 w-full dark:bg-gray-600 border-0 bg-gray-200" />
            <div className={"flex justify-center gap-12 flex-wrap"}>
              {tierList.map((tier, index) => {
                return (
                  <div
                    className={"flex flex-col items-center"}
                    key={index}
                  >
                    <p>{tier.name}</p>
                    <p className={"font-semibold"}>{tier.price}</p>
                    <p>{tier.status}</p>
                  </div>
                )
              })}
            </div>
            <button className={"btn btn-primary w-full md:w-9/12"}>
              Book {ticket} Tickets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketModal;
