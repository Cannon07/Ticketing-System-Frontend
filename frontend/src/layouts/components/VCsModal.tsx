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

interface vc_data {
  issuer_name: string,
  issuer_publicDid: string,
  issuance_date: string,
  expiration_date: string,
  vc_id: string,
}

interface event_data_props {
  vc_data: vc_data[],
}

interface TicketObject {
  [key: number]: boolean
}

const VCsModal: React.FC<event_data_props> = ({ vc_data }) => {
  console.log(vc_data);

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

              {vc_data.map((vc, index) => {
                return (
                  <div key={index} className="cursor-pointer transform transition duration-300 hover:scale-105">
                    <VerifiableCredentialsCard
                      name={vc.issuer_name}
                      vc={vc.vc_id}
                      type={1}
                      issue_date={vc.issuance_date}
                      expiry_date={vc.expiration_date}
                    />
                  </div>
                )
              })}

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default VCsModal;
