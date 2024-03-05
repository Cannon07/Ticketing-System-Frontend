import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

interface categoryDetails {
  docTypeList: string[];
  selectedDocType: string;
  setselectedDocType: React.Dispatch<React.SetStateAction<string>>;
}

export const SelectDocTypeDropdown: React.FC<categoryDetails> = ({ docTypeList, selectedDocType, setselectedDocType }) => {


  const [inputValue, setInputValue] = useState("")
  const [open, setOpen] = useState(false);

  return (
    <div className={"w-full relative mb-4"}>
      <div className="form-label-profile">
        Document Type
      </div>
      <div
        className="w-full form-input-profile flex items-center justify-between rounded border"
        onClick={() => setOpen(!open)}
      >
        {selectedDocType === "" ? "Select the Category" : selectedDocType}
        <FaAngleDown className={`${open && "rotate-180"}`}/>
      </div>
      <ul className={`absolute z-10 w-full p-0 form-input-profile overflow-y-auto border ${open ? "max-h-60" : "hidden"}`}>
        <div className="sticky top-0">
          <input
            type="text"
            placeholder="Enter document type"
            className="w-full form-input-profile"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
          />
        </div>
        {docTypeList?.map((docType, index) => (
          <li
            key={index}
            className={`p-1 mx-2 mb-1 cursor-pointer ${docType === selectedDocType && "bg-gray-200 dark:bg-gray-700"} hover:bg-gray-200 dark:hover:bg-gray-700 rounded ${docType?.toLowerCase().startsWith(inputValue) ? "block" : "hidden"}`}
            onClick={() => {
              setselectedDocType(docType);
              setInputValue("");
              setOpen(false);
            }}
          >{docType}</li>
        ))}
      </ul>
    </div>
  );
}
