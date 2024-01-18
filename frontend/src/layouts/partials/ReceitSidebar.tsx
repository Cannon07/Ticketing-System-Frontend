'use client'

import { humanize } from "@/lib/utils/textConverter";
import Link from "next/link";
import Accordion from "@/shortcodes/Accordion";
import { useState } from "react";

const ReceitSidebar = ({
  tags,
  categories,
  allCategories,
}: {
  tags: string[];
  categories: string[];
  allCategories: string[];
}) => {
  return (
    <div className="lg:col-5">
      <div className="mb-8 mt-8 lg:mt-0">
        <h3 className="mb-6">Booking Summary</h3>
        <div className="rounded bg-theme-light p-8 dark:bg-darkmode-theme-light relative">
          <div className={"flex flex-col gap-4 items-center"}>
            <h4 className={"h5 sm:h4"}>Tier</h4>
            <ul className="flex gap-4 flex-wrap justify-center">
              <div
                 className="btn btn-outline-primary"
              >
                Primary
              </div>
              <div
                 className="btn btn-outline-primary"
              >
                Executive
              </div>
              <div
                 className="btn btn-outline-primary"
              >
                Premium
              </div>
            </ul>
          </div>

          <hr className="h-px my-8 w-full dark:bg-gray-600 border-0 bg-gray-200" />

          <div className={"h-16 w-8 rounded-tl-full rounded-bl-full bg-body dark:bg-darkmode-body absolute inset-y-0 right-0 my-auto"}></div>
          <div className={"h-16 w-8 rounded-tr-full rounded-br-full bg-body dark:bg-darkmode-body absolute inset-0 left-0 my-auto"}></div>

          <div className={"flex flex-col items-center gap-4 px-8"}>

            <div className={"flex justify-between w-full"}>
              <h5 className={"h6 sm:h5"}>4 Tickets</h5>
              <h5 className={"h6 sm:h5"}>Rs 1000</h5>
            </div>
            <div className={"flex justify-between w-full"}>
              <h5 className={"h6 sm:h5"}>Convenience fees</h5>
              <h5 className={"h6 sm:h5"}>Rs 500</h5>
            </div>

            <div className={"h-px w-full border-t border-dashed dark:border-gray-600 border-gray-200"} />

            <div className={"flex justify-between w-full"}>
              <h5 className={"h6 sm:h5"}>Sub Total</h5>
              <h5 className={"h6 sm:h5"}>Rs 1500</h5>
            </div>

          </div>

        </div>

        <button className={"mt-6 w-full btn btn-primary flex justify-between"}>
          <h5 className={"text-white dark:text-dark"}>Total: Rs 1500</h5>
          <h5 className={"text-white dark:text-dark"}>Proceed</h5>
        </button>
      </div>
    </div>
  );
};

export default ReceitSidebar;
