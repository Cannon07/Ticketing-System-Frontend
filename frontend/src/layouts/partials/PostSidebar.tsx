'use client'

import { humanize } from "@/lib/utils/textConverter";
import Link from "next/link";
import Accordion from "@/shortcodes/Accordion";
import { useState } from "react";

const PostSidebar = ({
  tags,
  categories,
  allCategories,
}: {
  tags: string[];
  categories: string[];
  allCategories: string[];
}) => {
  const [date, setDate] = useState({
    "today": false,
    "tomorrow": false,
    "weekend": false
  });

  const [price, setPrice] = useState({
    "Free": false,
    "below_500": false,
    "between_500_1000": false,
    "Above_2000": false
  })

  return (
    <div className="lg:col-4">
      {/* <!-- categories --> */}
      {/*<div className="mb-8">
        <h5 className="mb-6">Categories</h5>
        <div className="rounded bg-theme-light p-8 dark:bg-darkmode-theme-light">
          <ul className="space-y-4">
            {categories.map((category: string) => {
              const count = allCategories.filter(
                (c: string) => c === category,
              ).length;
              return (
                <li key={category}>
                  <Link
                    className="flex justify-between hover:text-primary dark:hover:text-darkmode-primary"
                    href={`/categories/${category}`}
                  >
                    {humanize(category)} <span>({count})</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>*/}

      <h5 className="mb-6">Filters</h5>
      <Accordion
        title={"Date"}
      >
        <div className="flex flex-wrap flex-row gap-4 mb-6">
          <button
            className={`btn ${date.today ? 'btn-primary': 'btn-outline-primary'} px-4 lg:inline-flex items-center cursor-pointer`}
            onClick={() => setDate({
              ...date,
              today: !date.today
              })}
          >
            Today
          </button>

          <button
            className={`btn ${date.tomorrow ? 'btn-primary': 'btn-outline-primary'} px-4 lg:inline-flex items-center cursor-pointer`}
            onClick={() => setDate({
              ...date,
              tomorrow: !date.tomorrow
              })}
          >
            Tomorrow
          </button>

          <button
            className={`btn ${date.weekend ? 'btn-primary': 'btn-outline-primary'} px-4 lg:inline-flex items-center cursor-pointer`}
            onClick={() => setDate({
              ...date,
              weekend: !date.weekend
              })}
          >
            Weekend
          </button>
        </div>
      </Accordion>

      <Accordion
        title={"Price"}
      >
        <div className="flex flex-wrap flex-row gap-4 mb-6">
          <button
            className={`btn ${price.Free ? 'btn-primary': 'btn-outline-primary'} px-4 lg:inline-flex items-center cursor-pointer`}
            onClick={() => setPrice({
              ...price,
              Free: !price.Free
              })}
          >
            Free
          </button>

          <button
            className={`btn ${price.below_500 ? 'btn-primary': 'btn-outline-primary'} px-4 lg:inline-flex items-center cursor-pointer`}
            onClick={() => setPrice({
              ...price,
              below_500: !price.below_500
              })}
          >
            1-500
          </button>

          <button
            className={`btn ${price.between_500_1000 ? 'btn-primary': 'btn-outline-primary'} px-4 lg:inline-flex items-center cursor-pointer`}
            onClick={() => setPrice({
              ...price,
              between_500_1000: !price.between_500_1000
              })}
          >
            501-1000
          </button>

          <button
            className={`btn ${price.Above_2000 ? 'btn-primary': 'btn-outline-primary'} px-4 lg:inline-flex items-center cursor-pointer`}
            onClick={() => setPrice({
              ...price,
              Above_2000: !price.Above_2000
              })}
          >
            Above 2000
          </button>
        </div>
      </Accordion>

      <button className={"btn btn-primary"} data-ticket-trigger>
        Book Now
      </button>

      {/* <!-- tags --> */}
      {/*<div className="mb-8">
        <h5 className="mb-6">Tags</h5>
        <div className="rounded bg-theme-light p-6 dark:bg-darkmode-theme-light">
          <ul>
            {tags.map((tag: string) => {
              return (
                <li className="inline-block" key={tag}>
                  <Link
                    className="m-1 block rounded bg-white px-3 py-1 hover:bg-primary hover:text-white dark:bg-darkmode-body dark:hover:bg-darkmode-primary dark:hover:text-dark"
                    href={`/tags/${tag}`}
                  >
                    {humanize(tag)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>*/}
    </div>
  );
};

export default PostSidebar;
