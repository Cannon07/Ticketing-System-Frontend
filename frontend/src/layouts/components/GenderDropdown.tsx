import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

interface genderDetails {
  genderList: string[];
  selectedGender: string;
  setSelectedGender: React.Dispatch<React.SetStateAction<string>>;
}

export const SelectGenderDropdown: React.FC<genderDetails> = ({ genderList, selectedGender, setSelectedGender }) => {


  const [inputValue, setInputValue] = useState("")
  const [open, setOpen] = useState(false);

  return (
    <div className={"w-full relative mb-4"}>
      <div className="form-label-profile">
        Gender
      </div>
      <div
        className="w-full form-input-profile flex items-center justify-between rounded border"
        onClick={() => setOpen(!open)}
      >
        {selectedGender === "" ? "Select Gender" : selectedGender}
        <FaAngleDown className={`${open && "rotate-180"}`}/>
      </div>
      <ul className={`absolute z-10 w-full p-0 form-input-profile overflow-y-auto border ${open ? "max-h-60" : "hidden"}`}>
        <div className="sticky top-0">
          <input
            type="text"
            placeholder="Enter Gender"
            className="w-full form-input-profile"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
          />
        </div>
        {genderList?.map((gender, index) => (
          <li
            key={index}
            className={`p-1 mx-2 mb-1 cursor-pointer ${gender === selectedGender && "bg-gray-200 dark:bg-gray-700"} hover:bg-gray-200 dark:hover:bg-gray-700 rounded ${gender?.toLowerCase().startsWith(inputValue) ? "block" : "hidden"}`}
            onClick={() => {
              setSelectedGender(gender);
              setInputValue("");
              setOpen(false);
            }}
          >{gender}</li>
        ))}
      </ul>
    </div>
  );
}
