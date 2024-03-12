"use client"

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { PostImage } from '@/constants/endpoint_constants/ImageEndpoints';
import { UpdateUserById } from '@/constants/endpoint_constants/UserEndpoints';
import { PostUserDetails } from '@/constants/ssi_endpoint_constants/UserDetailsEndpoint';
import { GetUserDetailsById } from '@/constants/ssi_endpoint_constants/UserDetailsEndpoint';
import { UpdateUserDetails } from '@/constants/ssi_endpoint_constants/UserDetailsEndpoint';
import { SelectDocTypeDropdown } from './DocTypeDropdown';
import { SelectGenderDropdown } from './GenderDropdown';
import { ImageSelectorDoc } from './ImageSelectorDoc';
import { useGlobalContext } from '@/app/context/globalContext';

interface UserData {
  id: string,
  profileImg: string,
  transactionId: string,
  userDetailsId: string,
  userEmail: string,
  walletId: string,
}

interface policy {
  SignaturePolicy: string,
  ScanResult: string,
  JsonSchemaPolicy: string,
  AgeVerification: string,
}

interface verificationResult {
  result: string,
  issuerDid: string,
  policy: policy,
}

interface UserDetails {
  userDid: string,
  firstName: string,
  lastName: string,
  address: string,
  dateOfBirth: string,
  gender: string,
  placeOfBirth: string,
  proofId: string,
  docType: string,
  verificationResult: verificationResult[],
  issuedVCs: string[],
}

interface UserDataProps {
  userData: UserData,
}

const UserDetailsSettings: React.FC<UserDataProps> = ({ userData }) => {
    const { setUserData} = useGlobalContext();

    const [did, setDid] = useState<string>('');
    const [verificationResultList, setVerificationResultList] = useState<verificationResult[]>([]);
    const [issuedVCsList, setIssuedVCsList] = useState<string[]>([]);

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [dateOfBirth, setDateOfBirth] = useState<string>('');
    const [placeOfBirth, setPlaceOfBirth] = useState<string>('');

    const docTypeList: string[] = [
      'Student ID',
      'Aadhar Card',
    ]
    const [selectedDocType, setSelectedDocType] = useState<string>('');
    const [docFile, setDocFile] = useState<File | undefined>();
    const [docImage, setDocImage] = useState<string | undefined>('');

    const genderList: string[] = [
      'Male',
      'Female',
      'Other',
    ];
    const [selectedGender, setSelectedGender] = useState<string>('');

    const [originalFirstName, setOriginalFirstName] = useState<string>('');
    const [originalLastName, setOriginalLastName] = useState<string>('');
    const [originalAddress, setOriginalAddress] = useState<string>('');
    const [originalDateOfBirth, setOriginalDateOfBirth] = useState<string>('');
    const [originalPlaceOfBirth, setOriginalPlaceOfBirth] = useState<string>('');
    const [originalSelectedDocType, setOriginalSelectedDocType] = useState<string>('');
    const [originalSelectedGender, setOriginalSelectedGender] = useState<string>('');
    const [originalDocImage, setOriginalDocImage] = useState<string | undefined>('');

    const [isRegistered, setIsRegistered] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const fetchUserDetails = async () => {
        setLoading(true);
        toast.loading("Fetching User Details..", {id: "FetchUserDetails"})
        var requestOptions = {
          method: 'GET',
        };
        let response = await fetch(`${GetUserDetailsById}${userData.userDetailsId}`, requestOptions)
        console.log(response)

        if (response.ok) {
          let result = await response.json();
          console.log(result);
          toast.dismiss();
          toast.success("User Details Fetched Successfully!", {id: "SuccessUserDetails"});
          setLoading(false);

          let fetchedUserDetails: UserDetails = result;

          setDid(fetchedUserDetails.userDid);
          setVerificationResultList(fetchedUserDetails.verificationResult);
          setIssuedVCsList(fetchedUserDetails.issuedVCs);

          setFirstName(fetchedUserDetails.firstName);
          setLastName(fetchedUserDetails.lastName);
          setAddress(fetchedUserDetails.address);
          setDateOfBirth(fetchedUserDetails.dateOfBirth);
          setPlaceOfBirth(fetchedUserDetails.placeOfBirth);
          setSelectedGender(fetchedUserDetails.gender);
          setSelectedDocType(fetchedUserDetails.docType);
          setDocImage(fetchedUserDetails.proofId);

          setOriginalFirstName(fetchedUserDetails.firstName);
          setOriginalLastName(fetchedUserDetails.lastName);
          setOriginalAddress(fetchedUserDetails.address);
          setOriginalDateOfBirth(fetchedUserDetails.dateOfBirth);
          setOriginalPlaceOfBirth(fetchedUserDetails.placeOfBirth);
          setOriginalSelectedGender(fetchedUserDetails.gender);
          setOriginalSelectedDocType(fetchedUserDetails.docType);
          setOriginalDocImage(fetchedUserDetails.proofId);

        } else {
          setLoading(false);
          toast.dismiss();
          toast.error("User Details not found!", {id: "FailUserDetails"});
        }
      }

      if (userData.userDetailsId === "") {
        setIsRegistered(false);
      } else {
        setIsRegistered(true);
        fetchUserDetails();
      }
    }, [])

    const uploadImage = async () => {
        if (typeof(docFile) === 'undefined') {
          //putUser(txId, originalImage)
          return;
        }

        toast.loading("Uploading Document..", {id: "DocUploadLoading"});
        var formdata = new FormData();
        formdata.append("file", docFile);

        var requestOptions = {
          method: 'POST',
          body: formdata,
        };

        let response = await fetch(`${PostImage}`, requestOptions);
        let result = await response.text();
        toast.dismiss();
        toast.success("Document Uploaded Successfully!", {id: "DocUploadSuccess"});
        console.log(result);
        if (userData.userDetailsId === "") {
          saveUserDetails(result);
        } else {
          updateUserDetailsContents(result);
        }
    }

    const formatDate = (unformattedDate: string) => {
      const date = new Date(unformattedDate);
      const year = date.getFullYear();
      let month: any = date.getMonth() + 1;
      let day: any = date.getDate();

      month = month < 10 ? '0' + month : month;
      day = day < 10 ? '0' + day : day;

      return year + '-' + month + '-' + day;
    };

    const saveUserDetails = async (imageUrl: string | undefined) => {
      toast.loading("Saving User Details..", {id: "SaveUserLoading"})
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "firstName": firstName,
        "lastName": lastName,
        "address": address,
        "dateOfBirth": formatDate(dateOfBirth),
        "gender": selectedGender,
        "placeOfBirth": placeOfBirth,
        "proofId": imageUrl,
        "docType": selectedDocType,
      });

      console.log(raw);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
      };

      let response = await fetch(`${PostUserDetails}`, requestOptions)

      console.log(response);

      if (response.ok) {
        toast.dismiss();
        let result = await response.json();
        console.log(result);
        toast.success("User Details saved Successfully!", {id: "SaveUserSuccess"});
        setDid(result?.userDid);
        updateUserDetailsId(result?.id, imageUrl);
      } else {
        toast.error("Something went wrong!", {id: "SaveUserFailure"});
        setLoading(false);
      }
    }

    const updateUserDetailsId = async (userDetailsId: string, imageUrl: string | undefined) => {
      toast.loading("Updating User..", {id: "UpdateUserLoading"})
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "id": userData.id,
        "profileImg": userData.profileImg,
        "transactionId": userData.transactionId,
        "userDetailsId": userDetailsId,
        "userEmail": userData.userEmail,
        "walletId": userData.walletId,
      });

      console.log(raw);

      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
      };

      let response = await fetch(`${UpdateUserById}${userData.id}`, requestOptions)

      console.log(response);

      if (response.ok) {
        toast.dismiss();
        let result = await response.json();
        console.log(result);

        let newUserData: UserData = {
          "id": userData.id,
          "userEmail": userData.userEmail,
          "walletId": userData.walletId,
          "userDetailsId": userDetailsId,
          "transactionId": userData.transactionId,
          "profileImg": userData.profileImg,
        }

        setUserData(newUserData);

        setOriginalFirstName(firstName);
        setOriginalLastName(lastName);
        setOriginalAddress(address);
        setOriginalDateOfBirth(dateOfBirth);
        setOriginalPlaceOfBirth(placeOfBirth);
        setOriginalSelectedGender(selectedGender);
        setOriginalSelectedDocType(selectedDocType);
        setOriginalDocImage(imageUrl);

        toast.success("User updated Successfully!", {id: "UserUpdateSuccess"});
        setLoading(false);
      } else {
        toast.error("Something went wrong!", {id: "UserUpdateFailure"});
        setLoading(false);
      }
    }

    const updateUserDetailsContents = async (imageUrl: string | undefined) => {
      toast.loading("Updating User Details..", {id: "UpdateUserDetailsLoading"})
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "userDid": did,
        "firstName": firstName,
        "lastName": lastName,
        "address": address,
        "dateOfBirth": formatDate(dateOfBirth),
        "gender": selectedGender,
        "placeOfBirth": placeOfBirth,
        "proofId": imageUrl,
        "docType": selectedDocType,
        "verificationResult": verificationResultList,
        "issuedVCs": issuedVCsList,
      });

      console.log(raw);

      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
      };

      let response = await fetch(`${UpdateUserDetails}${userData.userDetailsId}`, requestOptions)

      console.log(response);

      if (response.ok) {
        toast.dismiss();
        //let result = await response.json();
        //console.log(result);

        setOriginalFirstName(firstName);
        setOriginalLastName(lastName);
        setOriginalAddress(address);
        setOriginalDateOfBirth(dateOfBirth);
        setOriginalPlaceOfBirth(placeOfBirth);
        setOriginalSelectedGender(selectedGender);
        setOriginalSelectedDocType(selectedDocType);
        setOriginalDocImage(docImage);

        toast.success("User Details updated Successfully!", {id: "UserDetailsUpdateSuccess"});
        setLoading(false);
      } else {
        toast.error("Something went wrong!", {id: "UserDetailsUpdateFailure"});
        setLoading(false);
      }
    }

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveChanges = () => {
        if (firstName === "") toast.error("First Name cannot be empty!");
        else if (lastName === "") toast.error("Last Name cannot be empty!");
        else if (address === "") toast.error("Address cannot be empty!");
        else if (dateOfBirth === "") toast.error("Date Of Birth cannot be empty!");
        else if (placeOfBirth === "") toast.error("Place Of Birth cannot be empty!");
        else if (selectedGender === "") toast.error("Gender cannot be empty!");
        else if (selectedDocType === "") toast.error("Document Type cannot be empty!");
        else if (docImage === "") toast.error("Please upload the required Document!");
        else {
            setLoading(true);
            setIsEditing(false);
            if (docImage == originalDocImage) {
              updateUserDetailsContents(originalDocImage);
            } else {
              uploadImage();
            }

        }
    };

    const handleCancelEdit = () => {
        if (userData.userDetailsId === "") {
          setIsRegistered(false);
        }
        setFirstName(originalFirstName);
        setLastName(originalLastName);
        setAddress(originalAddress);
        setDateOfBirth(originalDateOfBirth);
        setPlaceOfBirth(originalPlaceOfBirth);
        setSelectedGender(originalSelectedGender);
        setSelectedDocType(originalSelectedDocType);
        setDocImage(originalDocImage);
        setDocFile(undefined);
        setIsEditing(false);
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
                                  placeholder='Enter First Name'
                                  value={firstName}
                                  onChange={(e) => setFirstName(e.target.value)}
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
                                  placeholder='Enter Last Name'
                                  value={lastName}
                                  onChange={(e) => setLastName(e.target.value)}
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
                                placeholder='Enter Address'
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
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
                                  value={dateOfBirth}
                                  onChange={(e) => setDateOfBirth(e.target.value)}
                                  className="form-input-profile dark:dark-date"
                                />
                              </div>

                              <div className={`mb-4 flex flex-col justify-between w-full`}>
                                <label htmlFor="placeOfBirth" className="form-label-profile">
                                    Place Of Birth
                                </label>
                                <input
                                  type="text"
                                  id="placeOfBirth"
                                  name="placeOfBirth"
                                  placeholder='Enter Place Of Birth'
                                  value={placeOfBirth}
                                  onChange={(e) => setPlaceOfBirth(e.target.value)}
                                  className="form-input-profile"
                                />
                              </div>
                            </div>

                            <div className={"flex flex-col lg:flex-row lg:gap-4 md:flex-row md:gap-4 w-full"}>
                              <SelectGenderDropdown
                                genderList={genderList}
                                selectedGender={selectedGender}
                                setSelectedGender={setSelectedGender}
                              />

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
                                docImg={docImage}
                                setDocImg={setDocImage}
                              />
                            </div>
                          </>
                        :
                        <>
                          <div className={`mb-4 flex justify-between`}>
                            <label htmlFor="firstname" className="form-label-profile">
                                Decentralized Identity (DID)
                            </label>
                            <div>{loading ? 'Loading...': did}</div>
                          </div>

                          <div className={`mb-4 flex justify-between`}>
                            <label htmlFor="firstname" className="form-label-profile">
                                First Name
                            </label>
                            <div>{loading ? 'Loading...': originalFirstName}</div>
                          </div>

                          <div className={`mb-4 flex justify-between`}>
                            <label htmlFor="lastname" className="form-label-profile">
                                Last Name
                            </label>
                            <div>{loading ? 'Loading...': originalLastName}</div>
                          </div>

                          <div className={`mb-4 flex justify-between`}>
                            <label htmlFor="address" className="form-label-profile">
                                Address
                            </label>
                            <div>{loading ? 'Loading...': originalAddress}</div>
                          </div>

                          <div className={`mb-4 flex justify-between`}>
                            <label htmlFor="dateOfBirth" className="form-label-profile">
                                Date Of Birth
                            </label>
                            <div>{loading ? 'Loading...': originalDateOfBirth}</div>
                          </div>

                          <div className={`mb-4 flex justify-between`}>
                            <label htmlFor="dateOfBirth" className="form-label-profile">
                                Place Of Birth
                            </label>
                            <div>{loading ? 'Loading...': originalPlaceOfBirth}</div>
                          </div>

                          <div className={`mb-4 flex justify-between`}>
                            <label htmlFor="dateOfBirth" className="form-label-profile">
                                Gender
                            </label>
                            <div>{loading ? 'Loading...': originalSelectedGender}</div>
                          </div>

                          <div className={`mb-4 flex justify-between`}>
                            <label htmlFor="doctype" className="form-label-profile">
                                Document Type
                            </label>
                            <div>{loading ? 'Loading...': originalSelectedDocType}</div>
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
                                    Save
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
