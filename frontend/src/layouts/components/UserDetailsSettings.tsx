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
import { SelectDocTypeDropdown } from './DocTypeDropdown';
import { ImageSelectorDoc } from './ImageSelectorDoc';

interface UserData {
  id: string,
  name: string,
  profileImg: string,
  transactionId: String,
  userEmail: string,
  userName: string,
  walletId: string,
  originalImage: string | undefined,
  setImage: React.Dispatch<React.SetStateAction<string | undefined>>,
}

const UserDetailsSettings: React.FC<UserData> = ({id, name, userName, userEmail, profileImg, transactionId, walletId, originalImage, setImage}) => {
    const contract = useContract(CONTRACT_ADDRESS,metadata);
    const updateUser = useTx(contract,'updateUser');
    useTxNotifications(updateUser);

    const docTypeList: string[] = [
      'Student ID',
      'Aadhar Card',
    ]
    const [selectedDocType, setSelectedDocType] = useState<string>('');
    const [docFile, setDocFile] = useState<File | undefined>();

    const [isRegistered, setIsRegistered] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [uname, setUname] = useState(name);
    const [username, setUsername] = useState(userName);
    const [email, setEmail] = useState(userEmail);
    const [profilePic, setProfilePic] = useState(null);
    const [fileName, setFileName] = useState('');
    const [transId, setTransId] = useState(transactionId);
    const [loading, setLoading] = useState(false);

    const [file, setFile] = useState<File | undefined>();
    const imageRef = useRef<HTMLInputElement>(null);

    const [originalName, setOriginalName] = useState(uname);
    const [originalUsername, setOriginalUsername] = useState(username);
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

    const putUser = async (txId: String, imageUrl: String | undefined) => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "id": id,
        "name": uname,
        "userName": username,
        "userEmail": email,
        "walletId": walletId,
        "transactionId": txId,
        "profileImg": imageUrl,
      });

      console.log(raw);

      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
      };

      let response = await fetch(`${UpdateUserById}${id}`, requestOptions)
      if (response.ok) {
        let result = await response.json();
        setTransId(txId);
        console.log(result)
        toast.success("User Updated!")
        setLoading(false)
      }
  }

    const handleEditClick = () => {
        setIsEditing(true);
        setOriginalName(uname);
        setOriginalUsername(username);
        setOriginalEmail(email);
        setOriginalProfilePic(profilePic);
    };

    const handleSaveChanges = () => {
        if (uname === "") toast.error("Name cannot be empty!");
        else if (username === "") toast.error("Username cannot be empty!");
        else if (email === "") toast.error("Email cannot be empty!");
        else {
            setLoading(true);
            const hashData = generateHash([uname,username,email,profilePic]);
            setFileName('');
            setIsEditing(false);
            updateUser.signAndSend([hashData]);
        }
    };

    const handleCancelEdit = () => {
        setUname(originalName);
        setUsername(originalUsername);
        setEmail(originalEmail);
        setProfilePic(originalProfilePic);
        setIsEditing(false);
        setFileName('');
        setImage(profileImg);
        setFile(undefined);
    };

    return (
        <div className="h-full w-full">
            <div className="bg-theme-light dark:bg-darkmode-theme-light overflow-hidden shadow rounded-lg h-full w-full flex items-center justify-center">
                {!isRegistered ?
                <div className={"p-8 flex flex-col items-center"}>
                  <h1 className="text-2xl font-semibold text-center">Complete User Registration</h1>
                  <div className="content">
                    <p>
                      To apply for Verifiable Credentials, please complete your registration by filling out this form.
                    </p>
                  </div>
                  <button
                    className={"btn-sm btn-primary"}
                    onClick={() => {
                      setIsRegistered(true);
                      setIsEditing(true);
                    }}
                  >
                    Continue Registration
                  </button>
                </div>
                :
                <div className="p-8 rounded shadow-md w-full">
                    <h1 className="text-2xl font-semibold mb-4 text-center">User Details Settings</h1>
                    <div>


                        {!isEditing &&

                            <div className="py-4">
                                <hr className="h-px w-full dark:bg-gray-600 border-0 bg-gray-200" />
                            </div>}

                        {isEditing ?
                          <>
                            <div className={"flex flex-col lg:flex-row lg:gap-4 md:flex-row md:gap-4 w-full"}>
                              <div className={`mb-4 flex flex-col justify-between w-full`}>
                                <label htmlFor="firstname" className="form-label-profile">
                                    First Name
                                </label>
                                <input
                                  type="text"
                                  id="firstname"
                                  name="firstname"
                                  value={uname}
                                  onChange={(e) => setUname(e.target.value)}
                                  className="form-input-profile"
                                />
                              </div>

                              <div className={`mb-4 flex flex-col justify-between w-full`}>
                                <label htmlFor="lastname" className="form-label-profile">
                                    Last Name
                                </label>
                                <input
                                  type="text"
                                  id="lastname"
                                  name="lastname"
                                  value={username}
                                  onChange={(e) => setUsername(e.target.value)}
                                  className="form-input-profile"
                                />
                              </div>
                            </div>

                            <div className={`mb-4 flex flex-col justify-between`}>
                              <label htmlFor="address" className="form-label-profile">
                                  Address
                              </label>
                              <input
                                type="text"
                                id="address"
                                name="address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-input-profile"
                              />
                            </div>

                            <div className={"flex flex-col lg:flex-row lg:gap-4 md:flex-row md:gap-4 w-full"}>
                              <div className={`mb-4 flex flex-col justify-between w-full`}>
                                <label htmlFor="dateOfBirth" className="form-label-profile">
                                    Date Of Birth
                                </label>
                                <input
                                  type="date"
                                  id="dateOfBirth"
                                  name="dateOfBirth"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  className="form-input-profile dark:dark-date"
                                />
                              </div>

                              <SelectDocTypeDropdown
                                docTypeList={docTypeList}
                                selectedDocType={selectedDocType}
                                setselectedDocType={setSelectedDocType}
                              />
                            </div>

                            <div>
                              <ImageSelectorDoc
                                title={"Document"}
                                file={docFile}
                                setFile={setDocFile}
                              />
                            </div>
                          </>
                        :
                        <>
                          <div className={`mb-4 flex justify-between`}>
                            <label htmlFor="firstname" className="form-label-profile">
                                First Name
                            </label>
                            <div>{uname}</div>
                          </div>

                          <div className={`mb-4 flex justify-between`}>
                            <label htmlFor="lastname" className="form-label-profile">
                                Last Name
                            </label>
                            <div>{username}</div>
                          </div>

                          <div className={`mb-4 flex justify-between`}>
                            <label htmlFor="address" className="form-label-profile">
                                Address
                            </label>
                            <div>{email}</div>
                          </div>

                          <div className={`mb-4 flex justify-between`}>
                            <label htmlFor="dateOfBirth" className="form-label-profile">
                                Date Of Birth
                            </label>
                            <div>{email}</div>
                          </div>

                          <div className={`mb-4 flex justify-between`}>
                            <label htmlFor="doctype" className="form-label-profile">
                                Document Type
                            </label>
                            <div>{selectedDocType}</div>
                          </div>
                        </>
                        }
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
              }
            </div>
        </div>
    );
};

export default UserDetailsSettings;
