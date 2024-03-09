"use client"

import React, { useEffect, useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { useContract, useTx } from 'useink';
import { CONTRACT_ADDRESS } from '@/constants/contract_constants/ContractAddress';
import metadata from '@/constants/contract_constants/assets/TicketingSystem.json';
import { useTxNotifications } from 'useink/notifications';
import { generateHash } from '@/lib/utils/hashGenerator';
import { PostImage } from '@/constants/endpoint_constants/ImageEndpoints';
import { UpdateUserById } from '@/constants/endpoint_constants/UserEndpoints';
import { useGlobalContext } from '@/app/context/globalContext';

interface UserData {
  id: string,
  profileImg: string,
  transactionId: string,
  userDetailsId: string,
  userEmail: string,
  walletId: string,
}

interface UserDataProps {
  userData: UserData,
  originalImage: string | undefined,
  setImage: React.Dispatch<React.SetStateAction<string | undefined>>,
}

const UserProfileSettings: React.FC<UserDataProps> = ({userData, originalImage, setImage}) => {
    const contract = useContract(CONTRACT_ADDRESS,metadata);
    const updateUser = useTx(contract,'updateUser');
    useTxNotifications(updateUser);

    const { setUserData } = useGlobalContext();

    const [isEditing, setIsEditing] = useState<boolean>(false);
    //const [uname, setUname] = useState(name);
    //const [username, setUsername] = useState(userName);
    const [email, setEmail] = useState(userData.userEmail);
    const [profilePic, setProfilePic] = useState(null);
    const [fileName, setFileName] = useState('');
    const [transId, setTransId] = useState(userData.transactionId);
    const [loading, setLoading] = useState(false);

    const [file, setFile] = useState<File | undefined>();
    const imageRef = useRef<HTMLInputElement>(null);

    //const [originalName, setOriginalName] = useState(uname);
    //const [originalUsername, setOriginalUsername] = useState(username);
    const [originalEmail, setOriginalEmail] = useState(email);
    const [originalProfilePic, setOriginalProfilePic] = useState(null);

    const updateStatus = () => {
      if(updateUser.status === 'Finalized'){
        let txId = "";
        updateUser.result?.contractEvents?.map((value) => {
          txId = Object.values(value.args[1]).slice(0, 64).join("")
        });
        toast.dismiss()
        if (txId === "") {
          toast.error("Something went wrong!")
        } else {
          toast.success('Transaction finalized!')
          let register_toast = toast.loading('Updating User..')
          uploadImage(txId);
          toast.dismiss(register_toast);
        }
      }
      else if(updateUser.status === 'PendingSignature'){
        toast.dismiss()
        toast.loading('Pending signature..')
      }
      else if(updateUser.status === 'Broadcast'){
        toast.dismiss()
        toast.loading('Broadcasting transaction..')
      }
      else if(updateUser.status === 'InBlock'){
        toast.dismiss()
        toast.loading('Transaction In Block..')
      }
      else{
        toast.dismiss()
      }
    }

    useEffect(() => {
      updateStatus();
    }, [updateUser.status])

    const uploadImage = async (txId: string) => {
        if (typeof(file) === 'undefined') {
          putUser(txId, originalImage)
          return;
        }

        var formdata = new FormData();
        formdata.append("file", file);

        var requestOptions = {
          method: 'POST',
          body: formdata,
        };

        let response = await fetch(`${PostImage}`, requestOptions);
        let result = await response.text();
        console.log(result);
        putUser(txId, result);
    }

    const putUser = async (txId: string, imageUrl: string | undefined) => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "id": userData.id,
        "userEmail": email,
        "userDetailsId": userData.userDetailsId,
        "walletId": userData.walletId,
        "transactionId": txId,
        "profileImg": imageUrl,
      });

      console.log(raw);

      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
      };

      let response = await fetch(`${UpdateUserById}${userData.id}`, requestOptions)
      if (response.ok) {
        let result = await response.json();
        setTransId(txId);
        console.log(result)
        toast.success("User Updated!")
        setLoading(false)

        let updatedUserData: UserData = {
          "id": userData.id,
          "userEmail": email,
          "userDetailsId": userData.userDetailsId,
          "walletId": userData.walletId,
          "transactionId": txId,
          "profileImg": String(imageUrl),
        }

        setUserData(updatedUserData);
      }
  }

    const handleEditClick = () => {
        setIsEditing(true);
        //setOriginalName(uname);
        //setOriginalUsername(username);
        setOriginalEmail(email);
        setOriginalProfilePic(profilePic);
    };

    const handleSaveChanges = () => {
        //if (uname === "") toast.error("Name cannot be empty!");
        //else if (username === "") toast.error("Username cannot be empty!");
        if (email === "") toast.error("Email cannot be empty!");
        else {
            setLoading(true);
            const hashData = generateHash([email]);
            setFileName('');
            setIsEditing(false);
            updateUser.signAndSend([hashData]);
        }
    };

    const handleCancelEdit = () => {
        //setUname(originalName);
        //setUsername(originalUsername);
        setEmail(originalEmail);
        setProfilePic(originalProfilePic);
        setIsEditing(false);
        setFileName('');
        setImage(userData.profileImg);
        setFile(undefined);
    };

    return (
        <div className="h-full w-full">
            <div className="bg-theme-light dark:bg-darkmode-theme-light overflow-hidden shadow rounded-lg h-full w-full flex items-center justify-center">
                <div className="p-8 rounded shadow-md w-full">
                    <h1 className="text-2xl font-semibold mb-4 text-center">Profile Settings</h1>
                    <div>
                        {!isEditing &&

                            <div className="py-4">
                                <hr className="h-px w-full dark:bg-gray-600 border-0 bg-gray-200" />
                            </div>}

                        {/*<div className={`mb-4 ${isEditing ? '' : 'flex justify-between'}`}>
                            <label htmlFor="name" className="form-label-profile">
                                Name
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={uname}
                                    onChange={(e) => setUname(e.target.value)}
                                    className="form-input-profile"
                                />
                            ) : (
                                <div>{uname}</div>
                            )}
                        </div>*/}


                        {/*<div className={`mb-4 ${isEditing ? '' : 'flex justify-between'}`}>
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
                        </div>*/}

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

                        {!isEditing &&
                        <>
                        <div className={`mb-4 flex justify-between`}>
                            <label htmlFor="email" className="form-label-profile">
                                Wallet Id
                            </label>
                            <div>{userData.walletId}</div>
                        </div>

                        <div className={`mb-4 flex justify-between`}>
                            <label htmlFor="email" className="form-label-profile">
                                Transaction Id
                            </label>
                            <div>{loading ? 'Loading...' : transId}</div>
                        </div>
                        </>
                        }

                        {isEditing && <div className={"flex gap-6 flex-col md:flex-row w-full"}>
                          <div className="w-full">
                            <label
                              className="form-label-profile block"
                              htmlFor="file_input"
                            >
                              Profile Image
                            </label>
                            <div className="flex gap-2 items-center">
                              <button
                                onClick={() => {
                                  document.getElementById("image-input-profile")?.click()
                                }}
                                className="btn btn-sm btn-outline-primary h-fit mt-1">
                                Upload
                              </button>
                              <input
                                  id="uplaoded-file"
                                  name="uploaded-file"
                                  className="form-input-disable form-input-profile w-full"
                                  value={`${file ? file.name : "No file chosen"}`}
                                  disabled
                              />
                            </div>
                            <input
                              id="image-input-profile"
                              ref={imageRef}
                              type="file"
                              className="hidden"
                              onChange={({ target: {files} }) => {
                                if (files && files.length > 0) {
                                  setImage(URL.createObjectURL(files[0]));
                                  setFile(files[0]);
                                }
                              }}
                            />
                          </div>
                      </div>}
                    </div>
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
                                disabled={loading}
                            >
                                {loading ? "Updating..." : "Edit"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfileSettings;


