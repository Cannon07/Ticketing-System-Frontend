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

interface issuer_data {
  name: string,
  publicDid: string,
  type: string,
}

interface issuer_data_props {
  issuer_data: issuer_data[],
  userDetailsId: string,
}

interface TicketObject {
  [key: number]: boolean
}

const IssuerModal: React.FC<issuer_data_props> = ({ issuer_data, userDetailsId }) => {

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
              {issuer_data.map((issuer, index) => {
                return (
                  <RequestIssuerCard
                    key={index}
                    name={issuer.name}
                    did={issuer.publicDid}
                    type={issuer.type}
                    userDetailsId={userDetailsId}
                  />
                )})
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssuerModal;
