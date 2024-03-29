"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { RiGovernmentLine } from "react-icons/ri";
import { RiGovernmentFill } from "react-icons/ri";
import { IoHome } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { IoSchoolOutline } from "react-icons/io5";
import { IoSchool } from "react-icons/io5";
import { FaAddressCard } from "react-icons/fa";
import { FaRegAddressCard } from "react-icons/fa";
import RequestIssuerCard from "./RequestIssuerCard";

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
}

interface TicketObject {
  [key: number]: boolean
}

const IssuerModal: React.FC<event_data_props> = ({ event_data }) => {

  useEffect(() => {
    const issuerModal = document.getElementById("issuerModal");
    const issuerModalOverlay = document.getElementById("issuerModalOverlay");
    const issuerModalTriggers = document.querySelectorAll(
      "[data-issuer-trigger]",
    );

    issuerModalTriggers.forEach((button) => {
      button.addEventListener("click", function () {
        const issuerModal = document.getElementById("issuerModal");
        issuerModal!.classList.add("show");
      });
    });

    issuerModalOverlay!.addEventListener("click", function () {
      issuerModal!.classList.remove("show");
    });
  }, []);

  return (
    <div id="issuerModal" className="search-modal">
      <div id="issuerModalOverlay" className="search-modal-overlay" />
      <div className="search-wrapper w-[800px]">
        <div className="search-wrapper-header">
          <div className={"flex flex-col items-center gap-4"}>
            <h3 className={""}>Verifiable Credential Issuers</h3>

            <div className="w-full max-h-96 overflow-y-auto overflow-x-hidden no-scrollbar flex flex-col items-center gap-8 p-8 bg-theme-light dark:bg-darkmode-theme-light rounded-lg">
              <RequestIssuerCard
                name={"Government Id Issuer"}
                did={"did:ethr:7b0fee09d7dbce219a2dd2f8154199b4dd3e1771"}
                type={1}
              />

              <RequestIssuerCard
                name={"Student Id Issuer"}
                did={"did:ethr:7b0fee09d7dbce219a2dd2f8154199b4dd3e1771"}
                type={2}
              />

              <RequestIssuerCard
                name={"General Id Issuer"}
                did={"did:ethr:7b0fee09d7dbce219a2dd2f8154199b4dd3e1771"}
                type={3}
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default IssuerModal;
