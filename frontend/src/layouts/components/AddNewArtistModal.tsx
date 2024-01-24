"use client";

import React, { useState, useEffect } from "react";

interface ArtistProps {
  artistNames: String[];
  setArtistNames: React.Dispatch<React.SetStateAction<String[]>>;
  selectedArtists: String[];
  setSelectedArtists: React.Dispatch<React.SetStateAction<String[]>>;
}

const AddNewArtistModal: React.FC<ArtistProps> = ({ artistNames, setArtistNames, selectedArtists, setSelectedArtists }) => {
  const [file, setFile] = useState<File | null>(null);
  const [newArtist, setNewArtist] = useState("");
  useEffect(() => {
    const addArtistModal = document.getElementById("addArtistModal");
    const addArtistModalOverlay = document.getElementById("addArtistModalOverlay");
    const addArtistModalTriggers = document.querySelectorAll(
      "[data-add-artist-trigger]",
    );

    addArtistModalTriggers.forEach((button) => {
      button.addEventListener("click", function () {
        const addArtistModal = document.getElementById("addArtistModal");
        addArtistModal!.classList.add("show");
      });
    });

    addArtistModalOverlay!.addEventListener("click", function () {
      addArtistModal!.classList.remove("show");
    });
  }, []);

  return (
    <div id="addArtistModal" className="search-modal">
      <div id="addArtistModalOverlay" className="search-modal-overlay" />
      <div className="search-wrapper">
        <div className="search-wrapper-header">
          <div className={"flex flex-col items-center gap-4"}>
            <h3 className={"mb-4"}>Register Artist</h3>
            <div className="mx-auto mb-4 w-full sm:px-4 md:px-8 lg:px-12">
            <div className="flex flex-col gap-6">
                <div className={"flex gap-6 flex-col md:flex-row w-full"}>
                  <div className="w-full">
                      <label htmlFor="title" className="form-label block">
                        Full Name
                      </label>
                      <input
                        id="artist-name"
                        name="artist-name"
                        value={newArtist}
                        onChange={(e) => setNewArtist(e.target.value)}
                        className="form-input w-full"
                        placeholder="Enter artist's name"
                        type="text"
                        required
                      />
                  </div>
                  <div className="w-full">
                      <label htmlFor="title" className="form-label block">
                        Aadhar Number
                      </label>
                      <input
                          id="aadhar-no"
                          name="aadhar-no"
                          className="form-input w-full"
                          placeholder="Enter artist's aadhar No."
                          type="text"
                          required
                      />
                  </div>
                </div>
                <div className={"flex gap-6 flex-col md:flex-row w-full"}>
                  <div className="w-full">
                    <label
                      className="form-label block"
                      htmlFor="file_input"
                    >
                      Upload Profile Image
                    </label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          document.getElementById("image-input")?.click()
                        }}
                        className="btn btn-outline-primary">
                        Upload
                      </button>
                      <input
                          id="uplaoded-file"
                          name="uploaded-file"
                          className="form-input-disable w-full"
                          value={`${file ? file.name : "No file chosen"}`}
                          disabled
                      />
                    </div>
                    <input
                      id="image-input"
                      type="file"
                      className="hidden"
                      onChange={({ target: {files} }) => {
                        if (files && files.length > 0) setFile(files[0]);
                      }}
                    />
                  </div>
                </div>
            </div>
          </div>
          <div className="w-full sm:px-4 md:px-8 lg:px-12">
            <button
              className={"btn btn-primary w-full"}
              onClick={() => {
                setNewArtist("");
                if (newArtist.length > 0) {
                  setArtistNames([...artistNames, newArtist]);
                  setSelectedArtists([...selectedArtists, newArtist]);
                }
              }}
            >
              <h5 className={"text-white dark:text-dark flex justify-center"}>Add Artist</h5>
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewArtistModal;
