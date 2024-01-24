"use client"

import React from 'react'
import { useGlobalContext } from '@/app/context/globalContext';
import NotConnected from '@/app/not-connected';
import { useRouter } from 'next/navigation';
import { SelectArtistDropdown } from './SelectArtistsDropdown';
import AddNewArtistModal from './AddNewArtistModal';

const CreateEventForm = () => {

    const router = useRouter();
    const { hasAccount } = useGlobalContext();
    const registered = true;


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
                        className="form-input w-full"
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
                        className="form-input w-full"
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
                        className="form-input w-full"
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
                        className="form-input w-full"
                        type="time"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="category" className="form-label block">
                        Event Category
                    </label>
                    <select
                        id="category"
                        name="category"
                        className="form-input w-full"
                        required
                    >
                        <option value="">Select a category</option>
                    </select>
                </div>

                <div className="mb-4">
                    <AddNewArtistModal />
                    <div className='flex flex-col gap-4'>
                      <SelectArtistDropdown />
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
                        className="form-input w-full"
                        placeholder="Provide details about the event.."
                        required
                    ></textarea>
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
