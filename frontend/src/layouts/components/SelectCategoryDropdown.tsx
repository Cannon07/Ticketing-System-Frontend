import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

interface categoryDetails {
  categoryNames: String[];
  selectedCategory: String;
  setselectedCategory: React.Dispatch<React.SetStateAction<String>>;
}

export const SelectCategoryDropdown: React.FC<categoryDetails> = ({ categoryNames, selectedCategory, setselectedCategory }) => {

  
  const [inputValue, setInputValue] = useState("")
  const [open, setOpen] = useState(false);

  return (
    <div className={"w-full relative"}>
      <div className="form-label">
        Event Category
      </div>
      <div
        className="w-full form-input px-8 py-4 flex items-center justify-between rounded"
        onClick={() => setOpen(!open)}
      >
        {selectedCategory === "" ? "Select the Category" : selectedCategory}
        <FaAngleDown className={`${open && "rotate-180"}`}/>
      </div>
      <ul className={`absolute z-10 w-full mt-2 p-0 form-input overflow-y-auto ${open ? "max-h-60" : "hidden"}`}>
        <div className="sticky top-0">
          <input
            type="text"
            placeholder="Enter category name"
            className="w-full form-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
          />
        </div>
        {categoryNames?.map((category, index) => (
          <li
            key={index}
            className={`p-2 mx-4 mb-1 ${category === selectedCategory && "bg-gray-200 dark:bg-gray-700"} hover:bg-gray-200 dark:hover:bg-gray-700 rounded ${category?.toLowerCase().startsWith(inputValue) ? "block" : "hidden"}`}
            onClick={() => {
              setselectedCategory(category);
              setInputValue("");
              setOpen(false);
            }}
          >{category}</li>
        ))}
      </ul>
    </div>
  );
}
