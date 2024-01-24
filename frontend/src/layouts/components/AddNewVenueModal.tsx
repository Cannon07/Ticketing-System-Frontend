"use client";

import React, { useState, useEffect } from "react";
import { useGlobalContext } from "@/app/context/globalContext";

interface VenueProps {
  venueNames: String[];
  setVenueNames: React.Dispatch<React.SetStateAction<String[]>>;
  setSelectedVenue: React.Dispatch<React.SetStateAction<String>>;
}

const AddNewVenueModal: React.FC<VenueProps> = ({ venueNames, setVenueNames, setSelectedVenue }) => {

  const { selectedCity } = useGlobalContext();

  const [file, setFile] = useState<File | null>(null);
  const [newVenue, setNewVenue] = useState("");
  const [newVenueAddress, setNewVenueAddress] = useState("");

  useEffect(() => {
    const addVenueModal = document.getElementById("addVenueModal");
    const addVenueModalOverlay = document.getElementById("addVenueModalOverlay");
    const addVenueModalTriggers = document.querySelectorAll(
      "[data-add-venue-trigger]",
    );

    addVenueModalTriggers.forEach((button) => {
      button.addEventListener("click", function () {
        const addVenueModal = document.getElementById("addVenueModal");
        addVenueModal!.classList.add("show");
      });
    });

    addVenueModalOverlay!.addEventListener("click", function () {
      addVenueModal!.classList.remove("show");
    });
  }, []);

  return (
    <div id="addVenueModal" className="search-modal">
      <div id="addVenueModalOverlay" className="search-modal-overlay" />
      <div className="search-wrapper">
        <div className="search-wrapper-header">
          <div className={"flex flex-col items-center gap-4"}>
            <h3 className={"mb-4"}>Register Venue</h3>
            <div className="mx-auto mb-4 w-full sm:px-4 md:px-8 lg:px-12">
            <div className="flex flex-col gap-6">
                <div className={"flex gap-6 flex-col md:flex-row w-full"}>
                  <div className="w-full">
                      <label htmlFor="title" className="form-label block">
                        Venue Name
                      </label>
                      <input
                        id="venue-name"
                        name="venue-name"
                        value={newVenue}
                        onChange={(e) => setNewVenue(e.target.value)}
                        className="form-input w-full"
                        placeholder="Enter venue's name"
                        type="text"
                        required
                      />
                  </div>
                  <div className="w-full">
                      <label htmlFor="title" className="form-label block">
                        Venue's Capacity
                      </label>
                      <input
                          id="venue-capacity"
                          name="venue-capacity"
                          className="form-input w-full"
                          placeholder="Enter venue's capacity"
                          type="number"
                          required
                      />
                  </div>
                </div>
                <div className={"flex gap-6 flex-col md:flex-row w-full"}>
                  <div className="w-full">
                      <label htmlFor="title" className="form-label block">
                        Venue Address
                      </label>
                      <input
                        id="venue-address"
                        name="venue-address"
                        value={newVenueAddress}
                        onChange={(e) => setNewVenueAddress(e.target.value)}
                        className="form-input w-full"
                        placeholder="Enter venue's address"
                        type="text"
                        required
                      />
                  </div>
                  <div className="w-full">
                      <label htmlFor="title" className="form-label block">
                        City
                      </label>
                      <input
                          id="venue-city"
                          name="venue-city"
                          className="form-input w-full"
                          value={selectedCity}
                          type="text"
                          disabled
                      />
                  </div>
                </div>
            </div>
          </div>
          <div className="w-full sm:px-4 md:px-8 lg:px-12">
            <button
              className={"btn btn-primary w-full"}
              onClick={() => {
                setNewVenue("");
                if (newVenue.length > 0) {
                  setVenueNames([...venueNames, newVenue]);
                  setSelectedVenue(newVenue);
                }
              }}
            >
              <h5 className={"text-white dark:text-dark flex justify-center"}>Add Venue</h5>
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewVenueModal;
