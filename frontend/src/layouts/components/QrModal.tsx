"use client";

import { QrCarousel } from "@/partials/QrCarosuel";
import React, { useEffect, useState } from "react";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { PiTicketLight } from "react-icons/pi";

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

interface UserData {
  id: string,
  profileImg: string,
  transactionId: string,
  userDetailsId: string,
  userEmail: string,
  walletId: string,

}

interface TicketDetails {
  cost: number,
  count: number,
  eventId: event_data,
  id: string,
  tier: tier_data,
  user: UserData,
  nfts: { [key: number]: {
    scanned: string,
    verifier: string,
  } }
}

interface TicketDetailsProps {
  ticket_data: TicketDetails | null,
}

const QrModal: React.FC<TicketDetailsProps> = ({ ticket_data }) => {
  useEffect(() => {
    const qrModal = document.getElementById(`qrModal-${ticket_data?.id}`);
    const qrModalOverlay = document.getElementById(`qrModalOverlay-${ticket_data?.id}`);
    const qrModalTriggers = document.getElementById(
      `data-${ticket_data?.id}-trigger`
    );

    qrModalTriggers?.addEventListener("click", function () {
      const qrModal = document.getElementById(`qrModal-${ticket_data?.id}`);
      qrModal!.classList.add("show");
    });

    console.log(qrModalTriggers);

    //qrModalTriggers.forEach((button) => {
    //
    //});

    qrModalOverlay!.addEventListener("click", function () {
      qrModal!.classList.remove("show");
    });
  }, []);

  return (
    <div id={`qrModal-${ticket_data?.id}`} className="search-modal">
      <div id={`qrModalOverlay-${ticket_data?.id}`} className="search-modal-overlay" />
      <div className="search-wrapper w-[450px]">
        <div className="search-wrapper-header">
          <label
            htmlFor="searchInput"
            className="absolute left-7 top-[calc(50%-7px)]"
          >
            <span className="sr-only">search icon</span>
          </label>

          <div className={"flex justify-between"}>
            <div className={"flex items-center"}>
              <FaIndianRupeeSign className={"text-dark dark:text-white"} size={14} />
              <h5>{ticket_data?.cost}</h5>
            </div>

            <div className={"flex items-center gap-1"}>
              <PiTicketLight className={"text-dark dark:text-white"} size={24} />
              <h5>{ticket_data?.count}</h5>
            </div>
          </div>

        </div>

        <div className={"w-full flex items-center justify-center mt-4"}>
          <div className={"w-[290px]"}>
            <QrCarousel ticket_data={ticket_data} />
          </div>
        </div>

        <div className="p-8 flex items-center justify-center">
          <h4 className={"text-center"}>{ticket_data?.eventId.name}</h4>
        </div>

        {/*<div className="search-wrapper-footer">
          <span className="flex items-center">
            <kbd>
              <svg
                width="12"
                height="12"
                fill="currentcolor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M14.5 1.5a.5.5.0 01.5.5v4.8a2.5 2.5.0 01-2.5 2.5H2.707l3.347 3.346a.5.5.0 01-.708.708l-4.2-4.2a.5.5.0 010-.708l4-4a.5.5.0 11.708.708L2.707 8.3H12.5A1.5 1.5.0 0014 6.8V2a.5.5.0 01.5-.5z"
                ></path>
              </svg>
            </kbd>
            to select
          </span>
          <span>
            <kbd>ESC</kbd> to close
          </span>
        </div>*/}
      </div>
    </div>
  );
};

export default QrModal;
