"use client"

import React, { useState } from 'react'
import { useGlobalContext } from '@/app/context/globalContext';
import NotConnected from '@/app/not-connected';
import { useRouter } from 'next/navigation';
import { SelectArtistDropdown } from './SelectArtistsDropdown';
import { SelectVenueDropdown } from './SelectVenueDropdown';
import AddNewArtistModal from './AddNewArtistModal';
import AddNewVenueModal from './AddNewVenueModal';
import AddNewTierModal from './AddNewTierModal';
import { IoClose } from 'react-icons/io5';
import { ImageSelector } from './ImageSelector';

const CreateEventForm = () => {

    const router = useRouter();
    const { hasAccount } = useGlobalContext();
    const registered = true;
    const [tiers, setTiers] = useState<String[]>([])
    const [selectedArtists, setSelectedArtists] = useState<String[]>([]);
    const [selectedVenue, setSelectedVenue] = useState<String>("");

    const [venueNames, setVenueNames] = useState<String[]>(
      [
        'Starlight Lounge',
        'Moonlit Garden',
        'Cityscape Ballroom',
        'Harmony Hall',
        'Sunset Terrace',
        'Epic Event Space',
        'Crystal Pavilion',
        'Royal Oasis',
        'Grand Horizon Plaza',
        'Enchanting Courtyard',
        'Sapphire Skyline Club',
        'Majestic Manor',
        'Celestial Gardens',
        'Azure Amphitheater',
        'Prestige Palace',
        'Radiant Rooftop Lounge',
        'Whispering Woods Pavilion',
        'Golden Gate Banquet Hall',
        'Charm City Chapel',
        'Ethereal Elegance Hall'
      ]
    )
    const [artistNames, setArtistNames] = useState<String[]>([
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
    ])

    if (!registered) {
        router.push('/register-organizer');
    }

    if (!hasAccount) return <NotConnected />

    return (
        <div className="mx-auto border dark:border-gray-600 border-gray-300 rounded-lg">
            <div className="lg:grid md:grid lg:grid-cols-2 md:grid-cols-2 gap-6 p-4 py-8">
                <div className="mb-4">
                    <label htmlFor="title" className="form-label block">
                        Event Title
                    </label>
                    <input
                        id="title"
                        name="title"
                        className="form-input"
                        placeholder="Enter the title of the event.."
                        type="text"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="date" className="form-label block">
                        Event Date
                    </label>
                    <input
                        id="date"
                        name="date"
                        className="form-input dark:dark-date"
                        type="date"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="time" className="form-label block">
                        Event Start Time (AM/PM)
                    </label>
                    <input
                        id="time"
                        name="time"
                        className="form-input dark:dark-date"
                        type="time"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="duration" className="form-label block">
                        Event Duration (hh:mm)
                    </label>
                    <input
                        id="duration"
                        name="duration"
                        className="form-input dark:dark-date"
                        type="time"
                        required
                    />
                </div>

                <div className="mb-4">
                    <AddNewVenueModal
                      venueNames={venueNames}
                      setVenueNames={setVenueNames}
                      setSelectedVenue={setSelectedVenue}
                    />
                    <div className='flex flex-col gap-4'>
                      <SelectVenueDropdown
                        venueNames={venueNames}
                        selectedVenue={selectedVenue}
                        setSelectedVenue={setSelectedVenue}
                      />
                      <button className='btn btn-primary' data-add-venue-trigger>
                        Add new Venue
                      </button>
                    </div>
                </div>

                <div className="mb-4">
                    <AddNewTierModal
                      tiers={tiers}
                      setTiers={setTiers}
                    />
                    <div className='flex flex-col'>
                      <label className='form-label block'>
                        Event Tiers
                      </label>

                      <div className={`flex flex-col gap-4`}>
                        <div className={`flex flex-wrap gap-2 dark:border-gray-600 border-gray-300 border-2 rounded border-dashed min-h-[57px] p-1`}>
                          {tiers.length > 0 ?
                            tiers.map((tier, index) => {
                              return(
                                <div
                                  key={index}
                                  className='btn btn-outline-primary flex gap-4 justify-center items-center'
                                  onClick={() => {
                                    const newTiers = tiers?.filter((filterTier) => (filterTier !== tier))
                                    setTiers(newTiers)
                                  }}
                                >
                                  {tier}
                                  <IoClose size={20} />
                                </div>
                              )
                            })
                          :
                          <p className='w-full flex justify-center items-center'>No Tiers Selected</p>
                          }
                        </div>

                        <button className='btn btn-primary' data-add-tier-trigger>
                          Add Seat Tier
                        </button>
                      </div>
                    </div>
                </div>

                <div className="mb-4">
                    <AddNewArtistModal
                      artistNames={artistNames}
                      setArtistNames={setArtistNames}
                      selectedArtists={selectedArtists}
                      setSelectedArtists={setSelectedArtists}
                    />
                    <div className='flex flex-col gap-4'>
                      <SelectArtistDropdown
                        artistNames={artistNames}
                        selectedArtists={selectedArtists}
                        setSelectedArtists={setSelectedArtists}
                      />
                      <button className='btn btn-primary' data-add-artist-trigger>
                        Add new Artist
                      </button>
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="about" className="form-label block">
                        About the Event
                    </label>
                    <textarea
                        id="about"
                        name="about"
                        className="form-input w-full min-h-48"
                        placeholder="Provide details about the event.."
                        required
                    ></textarea>
                </div>

                <div className='mb-4'>
                  <ImageSelector
                    title={"Primary Image"}
                  />
                </div>

                <div className='mb-4'>
                  <ImageSelector
                    title={"Background Image"}
                  />
                </div>

                <div className="col-span-2 pl-1">
                    <button type="submit" className="btn btn-primary">
                        Create Event
                    </button>
                </div>
            </div>
        </div>
    )

}

export default CreateEventForm;
