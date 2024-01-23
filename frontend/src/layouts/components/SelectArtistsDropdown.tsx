import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

export const SelectArtistDropdown = () => {
  const artistNames = [
    'Alice',
    'Bob',
    'Charlie',
    'Diana',
    'Eva',
    'Frank',
    'Grace',
    'Henry',
    'Ivy',
    'Jack',
    'Katherine',
    'Leo',
    'Mia',
    'Nathan',
    'Olivia',
    'Peter',
    'Quinn',
    'Rachel',
    'Samuel',
    'Tessa'
  ];

  const [artists, setArtists] = useState(null)
  const [inputValue, setInputValue] = useState("")
  const [selectedArtists, setSelectedArtists] = useState<String[]>([]);
  const [open, setOpen] = useState(false);

  return (
    <div className={"w-full relative"}>
      <div className="form-label">
        Event Artists
      </div>
      <div className={`flex gap-2 flex-wrap ${selectedArtists.length > 0 && "mb-2"}`}>
        {selectedArtists.map((artist, index) => (
          <div
            key={index}
            className="btn btn-outline-primary px-4 py-2 flex gap-4 items-center justify-center"
            onClick={() => {
              const newArtists = selectedArtists.filter((filterArtist) => (filterArtist !== artist))
              setSelectedArtists(newArtists)
            }}
          >
            {artist}
            <IoClose size={20}/>
          </div>
        ))}
      </div>
      <div
        className="w-full form-input px-8 py-4 flex items-center justify-between rounded"
        onClick={() => setOpen(!open)}
      >
        Select the Artists
        <FaAngleDown className={`${open && "rotate-180"}`}/>
      </div>
      <ul className={`absolute w-full mt-2 p-0 form-input overflow-y-auto ${open ? "max-h-60" : "hidden"}`}>
        <div className="sticky top-0">
          <input
            type="text"
            placeholder="Enter artist name"
            className="w-full form-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
          />
        </div>
        {artistNames?.map((artist) => (
          <li
            key={artist}
            className={`p-2 mx-4 hover:bg-gray-200 dark:hover:bg-gray-700 rounded ${artist?.toLowerCase().startsWith(inputValue) ? "block" : "hidden"}`}
            onClick={() => {
              if (!selectedArtists.includes(artist)) setSelectedArtists([...selectedArtists, artist])
              setInputValue("")
            }}
          >{artist}</li>
        ))}
      </ul>
    </div>
  );
}
