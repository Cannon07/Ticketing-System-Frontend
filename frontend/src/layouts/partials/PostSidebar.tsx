'use client'

import Accordion from "@/shortcodes/Accordion";
import { useGlobalContext } from "@/app/context/globalContext";

const PostSidebar = () => {
  const {date, setDate, price, setPrice, categories, setCategories} = useGlobalContext();

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

      <Accordion
        title={"Categories"}
      >
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
      </Accordion>

    </div>
  );
};

export default PostSidebar;
