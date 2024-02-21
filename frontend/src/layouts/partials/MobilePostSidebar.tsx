'use client'

import Accordion from "@/shortcodes/Accordion";
import { useEffect, useState } from "react";
import { useGlobalContext } from "@/app/context/globalContext";
import { IoClose } from "react-icons/io5";

const MobilePostSidebar = () => {
  const {date, setDate, price, setPrice, categories, setCategories} = useGlobalContext();
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const filter_names: { [key: string]: string } = {
    'today': 'Today',
    'tomorrow': 'Tomorrow',
    'weekend': 'Weekend',
    'Free': 'Free',
    'below_500': '1-500',
    'between_500_1000': '501-1000',
    'Above_2000': 'Above 2000',
    'Rock': 'Rock',
    'Pop': 'Pop',
    'Jazz': 'Jazz',
    'Classical': 'Classical',
    'Hip_hop': 'Hip-Hop',
    'Electronic_Dance': 'Electronic/Dance',
    'Country': 'Country',
    'R_B_Soul': 'R&B/Soul',
    'Folk': 'Folk',
    'Alternative': 'Alternative',
  }

  const getAppliedFilters = (appliedFilters: any) => {
    return Object.keys(appliedFilters).filter(key => appliedFilters[key] === true);
  }

  useEffect(() => {
    const appliedDateFilters = getAppliedFilters(date);
    const appliedPriceFilters = getAppliedFilters(price);
    const appliedCategoryFilters = getAppliedFilters(categories);

    setSelectedFilters([...appliedDateFilters, ...appliedPriceFilters, ...appliedCategoryFilters]);
  }, [date, price, categories])

  return (
    <div className="lg:col-4">

      <div className={`flex gap-2 flex-wrap dark:border-gray-600 border-gray-300 border-2 rounded border-dashed min-h-[57px] p-1 mb-6`}>
        {selectedFilters.length > 0 ?
          selectedFilters?.map((filter: string, index) => (
            <div
              key={index}
              className="btn btn-outline-primary px-4 py-2 flex gap-4 items-center justify-center"
              onClick={() => {
                if (date.hasOwnProperty(filter)){
                  setDate({
                    ...date,
                    [filter]: false,
                  })
                }

                if (price.hasOwnProperty(filter)){
                  setPrice({
                    ...price,
                    [filter]: false,
                  })
                }

                if (categories.hasOwnProperty(filter)){
                  setCategories({
                    ...categories,
                    [filter]: false,
                  })
                }

                const newFilters = selectedFilters?.filter((filterDelete) => (filterDelete !== filter))
                setSelectedFilters(newFilters)
              }}
            >
              {filter_names[filter]}
              <IoClose size={20}/>
            </div>
          ))
          :
          <p className='w-full flex justify-center items-center'>No Filters Selected</p>
        }
      </div>

      <Accordion
        title={"Filters"}
      >
        <div className="flex flex-col gap-4">
          <h5>Date</h5>
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
        </div>

        <div className="flex flex-col gap-4">
          <h5>Price</h5>
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
        </div>

        <div className="flex flex-col gap-4">
          <h5>Categories</h5>
          <div className="flex flex-wrap flex-row gap-4 mb-6">
            <button
              className={`btn ${categories.Rock ? 'btn-primary': 'btn-outline-primary'} px-4 lg:inline-flex items-center cursor-pointer`}
              onClick={() => setCategories({
                ...categories,
                Rock: !categories.Rock
                })}
            >
              Rock
            </button>

            <button
              className={`btn ${categories.Pop ? 'btn-primary': 'btn-outline-primary'} px-4 lg:inline-flex items-center cursor-pointer`}
              onClick={() => setCategories({
                ...categories,
                Pop: !categories.Pop
                })}
            >
              Pop
            </button>

            <button
              className={`btn ${categories.Jazz ? 'btn-primary': 'btn-outline-primary'} px-4 lg:inline-flex items-center cursor-pointer`}
              onClick={() => setCategories({
                ...categories,
                Jazz: !categories.Jazz
                })}
            >
              Jazz
            </button>

            <button
              className={`btn ${categories.Classical ? 'btn-primary': 'btn-outline-primary'} px-4 lg:inline-flex items-center cursor-pointer`}
              onClick={() => setCategories({
                ...categories,
                Classical: !categories.Classical
                })}
            >
              Classical
            </button>

            <button
              className={`btn ${categories.Hip_hop ? 'btn-primary': 'btn-outline-primary'} px-4 lg:inline-flex items-center cursor-pointer`}
              onClick={() => setCategories({
                ...categories,
                Hip_hop: !categories.Hip_hop
                })}
            >
              Hip-hop
            </button>

            <button
              className={`btn ${categories.Electronic_Dance ? 'btn-primary': 'btn-outline-primary'} px-4 lg:inline-flex items-center cursor-pointer`}
              onClick={() => setCategories({
                ...categories,
                Electronic_Dance: !categories.Electronic_Dance
                })}
            >
              Electronic/Dance
            </button>

            <button
              className={`btn ${categories.Country ? 'btn-primary': 'btn-outline-primary'} px-4 lg:inline-flex items-center cursor-pointer`}
              onClick={() => setCategories({
                ...categories,
                Country: !categories.Country
                })}
            >
              Country
            </button>

            <button
              className={`btn ${categories.R_B_Soul ? 'btn-primary': 'btn-outline-primary'} px-4 lg:inline-flex items-center cursor-pointer`}
              onClick={() => setCategories({
                ...categories,
                R_B_Soul: !categories.R_B_Soul
                })}
            >
              R&B/Soul
            </button>

            <button
              className={`btn ${categories.Folk ? 'btn-primary': 'btn-outline-primary'} px-4 lg:inline-flex items-center cursor-pointer`}
              onClick={() => setCategories({
                ...categories,
                Folk: !categories.Folk
                })}
            >
              Folk
            </button>

            <button
              className={`btn ${categories.Alternative ? 'btn-primary': 'btn-outline-primary'} px-4 lg:inline-flex items-center cursor-pointer`}
              onClick={() => setCategories({
                ...categories,
                Alternative: !categories.Alternative
                })}
            >
              Alternative
            </button>
          </div>
        </div>
      </Accordion>
    </div>
  );
};

export default MobilePostSidebar;
