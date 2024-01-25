"use client"

import React, { useState } from 'react'
import { useGlobalContext } from '@/app/context/globalContext';
import NotConnected from '@/app/not-connected';



const OrganizerRegistrationForm = () => {


    const [aadharNumber, setAadharNumber] = useState('');
    // const [aadharError, setAadharError] = useState(false);
    const { walletAddress, hasAccount } = useGlobalContext();


    if (!hasAccount) return <NotConnected />



    const handleAadharChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()

        event.target.value=event.target.value.replace(/\D/g, '');
        if(event.target.value.length>12){
            event.target.value=event.target.value.slice(0,12);
        }
        const inputAadhar=event.target.value

        setAadharNumber(inputAadhar);


    };
    //
    return (
        <div className="mx-auto border dark:border-gray-600 border-gray-300 rounded-lg">
            <form className="lg:grid md:grid lg:grid-cols-2 md:grid-cols-2 gap-6 p-4 py-8" method="POST">
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
                        Email
                    </label>
                    <input
                        id="type"
                        name="type"
                        className="form-input w-full"
                        placeholder='Enter your email..'
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
                        value={aadharNumber}
                        onChange={handleAadharChange}
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
