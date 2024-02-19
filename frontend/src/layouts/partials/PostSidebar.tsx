'use client'

import Accordion from "@/shortcodes/Accordion";
import { useState } from "react";

const PostSidebar = () => {
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

    </div>
  );
};

export default PostSidebar;
