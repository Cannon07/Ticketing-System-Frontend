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
import VerifiableCredentialsCard from "./VerifiableCredentialsCard";

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

const VCsModal: React.FC<event_data_props> = ({ event_data }) => {

  useEffect(() => {
    const vcModal = document.getElementById("vcModal");
    const vcModalOverlay = document.getElementById("vcModalOverlay");
    const vcModalTriggers = document.querySelectorAll(
      "[data-vcs-trigger]",
    );

    vcModalTriggers.forEach((button) => {
      button.addEventListener("click", function () {
        const vcModal = document.getElementById("vcModal");
        vcModal!.classList.add("show");
      });
    });

    vcModalOverlay!.addEventListener("click", function () {
      vcModal!.classList.remove("show");
    });
  }, []);

  return (
    <div id="vcModal" className="search-modal">
      <div id="vcModalOverlay" className="search-modal-overlay" />
      <div className="search-wrapper w-[550px]">
        <div className="search-wrapper-header">
          <div className={"flex flex-col items-center gap-4"}>
            <h3 className={""}>Verified Credentials</h3>

            <div className="w-full max-h-96 overflow-y-auto overflow-x-hidden no-scrollbar flex flex-col items-center gap-8 p-8 bg-theme-light dark:bg-darkmode-theme-light rounded-lg">
              <div className="cursor-pointer transform transition duration-300 hover:scale-105">
                <VerifiableCredentialsCard
                  name={"Government Id"}
                  vc={"fb0ea18c-8499-4d5c-83c7-f715b82f969f"}
                  type={1}
                  issue_date={"February 10, 2024"}
                  expiry_date={"March 10, 2024"}
                />
              </div>

              <div className="cursor-pointer transform transition duration-300 hover:scale-105">
                <VerifiableCredentialsCard
                  name={"Student Id"}
                  vc={"fb0ea18c-8499-4d5c-83c7-f715b82f969f"}
                  type={2}
                  issue_date={"February 10, 2024"}
                  expiry_date={"March 10, 2024"}
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default VCsModal;
