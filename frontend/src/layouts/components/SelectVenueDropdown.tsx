import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

interface VenueDetails {
  venueNames: String[];
  selectedVenue: String;
  setSelectedVenue: React.Dispatch<React.SetStateAction<String>>;
}

export const SelectVenueDropdown: React.FC<VenueDetails> = ({ venueNames, selectedVenue, setSelectedVenue }) => {

  const [artists, setArtists] = useState(null)
  const [inputValue, setInputValue] = useState("")
  const [open, setOpen] = useState(false);

  return (
    <div className={"w-full relative"}>
      <div className="form-label">
        Event Venue
      </div>
      <div
        className="w-full form-input px-8 py-4 flex items-center justify-between rounded"
        onClick={() => setOpen(!open)}
      >
        {selectedVenue === "" ? "Select the Venue" : selectedVenue}
        <FaAngleDown className={`${open && "rotate-180"}`}/>
      </div>
      <ul className={`absolute w-full mt-2 p-0 form-input overflow-y-auto ${open ? "max-h-60" : "hidden"}`}>
        <div className="sticky top-0">
          <input
            type="text"
            placeholder="Enter venue name"
            className="w-full form-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
          />
        </div>
        {venueNames?.map((venue, index) => (
          <li
            key={index}
            className={`p-2 mx-4 mb-1 ${venue === selectedVenue && "bg-gray-200 dark:bg-gray-700"} hover:bg-gray-200 dark:hover:bg-gray-700 rounded ${venue?.toLowerCase().startsWith(inputValue) ? "block" : "hidden"}`}
            onClick={() => {
              setSelectedVenue(venue);
              setInputValue("");
              setOpen(false);
            }}
          >{venue}</li>
        ))}
      </ul>
    </div>
  );
}
