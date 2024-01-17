"use client"

import React, { useState } from 'react'
import { useGlobalContext } from '@/app/context/globalContext';
import NotFound from '@/app/not-found';


const OrganizerRegistrationForm = () => {


    const [aadharNumber, setAadharNumber] = useState('');
    const [aadharError, setAadharError] = useState('');
    const { walletAddress, hasAccount } = useGlobalContext();


    if (!hasAccount) return <NotFound />



    const handleAadharChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()

        const inputAadhar = event.target.value;

        // Validate Aadhar number
        if (/^\d{12}$/.test(inputAadhar)) {
            setAadharError('');
        } else {
            setAadharError('Invalid Aadhar number');
        }

        setAadharNumber(inputAadhar);

        //  dark:bg-gray-600 border-0 bg-gray-200
    };
    //
    return (
        <div className="mx-auto border dark:border-gray-600 border-gray-300  rounded-lg">
            <form className="grid grid-cols-2 gap-6 p-4 py-8" method="POST">
                <div className="mb-4">
                    <label htmlFor="type" className="form-label block">
                        Wallet Address
                    </label>
                    <input
                        disabled
                        id="address"
                        name="address"
                        className="form-input-disable w-full"
                        value={walletAddress}
                        type="text"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="name" className="form-label block">
                        Full Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        className="form-input w-full"
                        placeholder="Enter your full name.."
                        type="text"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="uname" className="form-label block">
                        Username
                    </label>
                    <input
                        id="uname"
                        name="uname"
                        className="form-input w-full"
                        placeholder="Enter your username.."
                        type="text"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="type" className="form-label block">
                        Type of User
                    </label>
                    <input
                        disabled
                        id="type"
                        name="type"
                        className="form-input-disable w-full"
                        value={'organizer'}
                        type="text"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="organization" className="form-label block">
                        Organization Name (if any)
                    </label>
                    <input
                        id="organization"
                        name="organization"
                        className="form-input w-full"
                        placeholder="Enter your organization name.."
                        type="text"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="aadhar" className="form-label block">
                        Aadhar Number
                    </label>
                    <input
                        id="aadhar"
                        name="aadhar"
                        className="form-input w-full"
                        placeholder="Enter your Aadhar number.."
                        type="text"
                        // value={aadharNumber}
                        required
                    />
                </div>

                <div className="col-span-2 pl-1">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
        </div>


    )

}

export default OrganizerRegistrationForm;