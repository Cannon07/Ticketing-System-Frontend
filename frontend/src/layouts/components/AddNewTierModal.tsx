"use client";

import React, { useState, useEffect } from "react";

interface ArtistProps {
  tiers: String[];
  setTiers: React.Dispatch<React.SetStateAction<String[]>>;
}

const AddNewTierModal: React.FC<ArtistProps> = ({ tiers, setTiers }) => {
  const [file, setFile] = useState<File | null>(null);
  const [newTier, setNewTier] = useState("");

  const addTierModal = document.getElementById("addTierModal");

  useEffect(() => {
    const addTierModal = document.getElementById("addTierModal");
    const addTierModalOverlay = document.getElementById("addTierModalOverlay");
    const addTierModalTriggers = document.querySelectorAll(
      "[data-add-tier-trigger]",
    );

    addTierModalTriggers.forEach((button) => {
      button.addEventListener("click", function () {
        const addTierModal = document.getElementById("addTierModal");
        addTierModal!.classList.add("show");
      });
    });

    addTierModalOverlay!.addEventListener("click", function () {
      addTierModal!.classList.remove("show");
    });
  }, []);

  return (
    <div id="addTierModal" className="search-modal">
      <div id="addTierModalOverlay" className="search-modal-overlay" />
      <div className="search-wrapper">
        <div className="search-wrapper-header">
          <div className={"flex flex-col items-center gap-4"}>
            <h3 className={"mb-4"}>New Tier</h3>
            <div className="mx-auto mb-4 w-full sm:px-4 md:px-8 lg:px-12">
            <div className="flex flex-col gap-6">
                <div className={"flex gap-6 lg:flex-row flex-col w-full"}>
                  <div className="w-full">
                      <label htmlFor="title" className="form-label block">
                        Tier Name
                      </label>
                      <input
                        id="tier-name"
                        name="tier-name"
                        value={newTier}
                        onChange={(e) => setNewTier(e.target.value)}
                        className="form-input w-full"
                        placeholder="Enter tier name"
                        type="text"
                        required
                      />
                  </div>

                  <div className="w-full">
                      <label htmlFor="title" className="form-label block">
                        Tier Capacity
                      </label>
                      <input
                          id="tier-capacity"
                          name="tier-capacity"
                          className="form-input w-full"
                          placeholder="Enter tier capacity"
                          type="number"
                          required
                      />
                  </div>
                </div>

                <div className="flex flex-col w-full">
                  <div className="w-full">
                    <label htmlFor="title" className="form-label block">
                        Tier Price
                      </label>
                      <input
                          id="tier-price"
                          name="tier-price"
                          className="form-input w-full"
                          placeholder="Enter tier Price"
                          type="number"
                          required
                      />
                  </div>
                </div>

            </div>
          </div>
          <div className="w-full sm:px-4 md:px-8 lg:px-12">
            <button
              className={"btn btn-primary w-full"}
              onClick={() => {
                setNewTier("");
                if (newTier.length > 0) {
                  setTiers([...tiers, newTier]);
                  addTierModal!.classList.remove("show");
                }
              }}
            >
              <h5 className={"text-white dark:text-dark flex justify-center"}>Add Tier</h5>
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewTierModal;
