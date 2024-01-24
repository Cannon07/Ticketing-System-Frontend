"use client"

import React, { useState } from 'react';
import ImageFallback from '@/helpers/ImageFallback';

const OrganizerProfileSettings = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('Nikhil Magar');
    const [username, setUsername] = useState('Nikhil44');
    const [email, setEmail] = useState('nikhildmagar@gmail.com');
    const [identity, setIdentity] = useState('443444994554');
    const [profilePic, setProfilePic] = useState(null);
    const [fileName, setFileName] = useState('')

    const [originalName, setOriginalName] = useState(name);
    const [originalUsername, setOriginalUsername] = useState(username);
    const [originalEmail, setOriginalEmail] = useState(email);
    const [originalIdentity, setOriginalIdentity] = useState(identity);
    const [originalProfilePic, setOriginalProfilePic] = useState(null);



    const handleEditClick = () => {
        setIsEditing(true);
        setOriginalName(name);
        setOriginalUsername(username);
        setOriginalEmail(email);
        setOriginalIdentity(identity)
        setOriginalProfilePic(profilePic);
    };

    const handleSaveChanges = (e: any) => {
        e.preventDefault();
        setFileName('');
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setName(originalName);
        setUsername(originalUsername);
        setEmail(originalEmail);
        setIdentity(originalIdentity)
        setProfilePic(originalProfilePic);
        setIsEditing(false);
        setFileName('');

    };

    const handleProfilePicChange = (e: any) => {
        const file = e.target.files?.[0];
        setFileName(file.name);
        setProfilePic(file || null);
    };
    return (
        <div className="h-full w-full">
            <div className="bg-theme-light dark:bg-darkmode-theme-light overflow-hidden shadow rounded-lg h-full w-full flex items-center justify-center">
                <div className="p-8 rounded shadow-md w-full">


                    <h1 className="text-2xl font-semibold mb-4 text-center">Profile Settings</h1>



                    <form>
                        <div className={`mb-4 ${isEditing ? '' : 'flex items-center justify-center'}`}>


                            {isEditing ? (
                                <div>
                                    <label htmlFor="profilePic" className="flex flex-col items-center justify-center gap-2 border border-gray-300 dark:border-darkmode-border max-w-[200px] h-[100px] rounded cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                        </svg>
                                        Upload profile picture



                                    </label>
                                    <input
                                        type="file"
                                        id="profilePic"
                                        name="profilePic"
                                        onChange={handleProfilePicChange}
                                        accept="image/*"
                                        className="hidden"
                                    />

                                    {fileName}


                                </div>
                            ) : (
                                <div>
                                    {profilePic ? (
                                        <div className="w-44 h-44 overflow-hidden rounded-full">

                                            <ImageFallback
                                                height={100}
                                                width={100}
                                                src={URL.createObjectURL(profilePic)}
                                                alt="event image"
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                    ) : (
                                        'No picture selected'
                                    )}
                                </div>
                            )}
                        </div>

                        {!isEditing &&

                            <div className="py-4">
                                <hr className="h-px w-full dark:bg-gray-600 border-0 bg-gray-200" />
                            </div>}

                        <div className={`mb-4 ${isEditing ? '' : 'flex justify-between'}`}>
                            <label htmlFor="name" className="form-label-profile">
                                Name
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="form-input-profile"
                                />
                            ) : (
                                <div>{name}</div>
                            )}
                        </div>


                        <div className={`mb-4 ${isEditing ? '' : 'flex justify-between'}`}>
                            <label htmlFor="username" className="form-label-profile">
                                Username
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="form-input-profile"
                                />
                            ) : (
                                <div>{username}</div>
                            )}
                        </div>

                        <div className={`mb-4 ${isEditing ? '' : 'flex justify-between'}`}>
                            <label htmlFor="email" className="form-label-profile">
                                Email
                            </label>
                            {isEditing ? (
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="form-input-profile"
                                />
                            ) : (
                                <div>{email}</div>
                            )}
                        </div>

                        <div className={`mb-4 ${isEditing ? '' : 'flex justify-between'}`}>
                            <label htmlFor="email" className="form-label-profile">
                                Adhar Number
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    id="identity"
                                    name="identity"
                                    value={identity}
                                    onChange={(e) => setIdentity(e.target.value)}
                                    className="form-input-profile"
                                />
                            ) : (
                                <div>{identity}</div>
                            )}
                        </div>
                    </form>
                    <div className="flex justify-start mt-6">


                        {isEditing ? (
                            <>
                                <button
                                    onClick={handleSaveChanges}
                                    className="mr-2 btn-sm btn-primary"
                                >
                                    Save Changes
                                </button>
                                <button
                                    onClick={handleCancelEdit}
                                    className="btn-sm btn-primary"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={handleEditClick}
                                className="btn-sm btn-primary"
                            >
                                Edit
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrganizerProfileSettings;


