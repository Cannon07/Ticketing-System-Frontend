"use client"

import React, { useEffect, useState, useRef } from "react";
import { useGlobalContext } from "@/app/context/globalContext";
import { useContract, useTx, useWallet } from "useink";
import { CONTRACT_ADDRESS } from '@/constants/contract_constants/ContractAddress';
import metadata from '@/constants/contract_constants/assets/TicketingSystem.json';
import { useTxNotifications } from "useink/notifications";
import { generateHash } from "@/lib/utils/hashGenerator";
import toast from "react-hot-toast";
import { PostUser } from "@/constants/endpoint_constants/UserEndpoints";
import { PostImage } from "@/constants/endpoint_constants/ImageEndpoints";
import { PostUserOtp } from "@/constants/endpoint_constants/UserEndpoints";

interface UserData {
  id: string,
  profileImg: string,
  transactionId: string,
  userDetailsId: string,
  userEmail: string,
  walletId: string,
}

const RegisterModal = () => {

  const { walletAddress, setConnectLoading, setUserData } = useGlobalContext();
  const { disconnect } = useWallet();

  const contract = useContract(CONTRACT_ADDRESS,metadata);

  const registerUser = useTx(contract,'registerUser');
  useTxNotifications(registerUser);

  const [email,setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [userOtp, setUserOtp] = useState('');
  //const [fullname,setFullname] = useState('');
  //const [username,setUsername] = useState('');
  const [file, setFile] = useState<File | undefined>();
  const imageRef = useRef<HTMLInputElement>(null);

  const registerStatus = () => {
    if(registerUser.status === 'Finalized'){
      let txId = "";
      registerUser.result?.contractEvents?.map((value) => {
        txId = Object.values(value.args[1]).slice(0, 64).join("")
      });
      toast.dismiss()
      if (txId === "") {
        toast.error("Something went wrong!")
        //setFullname("");
        //setUsername("");
        setEmail("");
        setFile(undefined);
        disconnect();
      } else {
        toast.success('Transaction finalized!')
        let register_toast = toast.loading('Registering User..')
        uploadImage(txId);
        toast.dismiss(register_toast);
      }
      setConnectLoading(false)
    }
    else if(registerUser.status === 'PendingSignature'){
      toast.dismiss()
      toast.loading('Pending signature..')
    }
    else if(registerUser.status === 'Broadcast'){
      toast.dismiss()
      toast.loading('Broadcasting transaction..')
    }
    else if(registerUser.status === 'InBlock'){
      toast.dismiss()
      toast.loading('Transaction In Block..')
    }
    else{
      toast.dismiss()
    }
  }

  useEffect(() => {
    const registerModal = document.getElementById("registerModal");
    const registerModalOverlay = document.getElementById("registerModalOverlay");
    const registerModalTriggers = document.querySelectorAll(
      "[data-register-trigger]",
    );

    registerModalTriggers.forEach((button) => {
      button.addEventListener("click", function () {
        const registerModal = document.getElementById("registerModal");
        registerModal!.classList.add("show");
      });
    });

    registerModalOverlay!.addEventListener("click", function () {
      registerModal!.classList.remove("show");
      toast.dismiss()
      setConnectLoading(false)
      disconnect()
    });

    registerStatus()
  }, [registerUser.status]);

  const saveUser = async (txId: string, imageUrl: string) => {
      toast.loading("Registering User..")
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "userEmail": email,
        "walletId": walletAddress,
        "userDetailsId": "",
        "transactionId": txId,
        "profileImg": imageUrl,
      });

      console.log(raw);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
      };

      let response = await fetch(`${PostUser}?userCode=${userOtp}&orgCode=${otp}`, requestOptions)
      console.log(response)

      if (response.ok) {
        let result = await response.json();
        console.log(result)
        let newUserData: UserData = {
          "id": result.statusMsg,
          "userEmail": email,
          "walletId": walletAddress,
          "userDetailsId": "",
          "transactionId": txId,
          "profileImg": imageUrl,
        }
        setUserData(newUserData);
        toast.dismiss();
        toast.success("User Registered!")
        //setFullname("");
        //setUsername("");
        setUserOtp("");
        setEmail("");
        setFile(undefined);
      } else {
        setUserOtp("");
        setEmail("");
        setFile(undefined);
        toast.error("Something went wrong!")
      }
  }

  const uploadImage = async (txId: string) => {
    if (typeof(file) === 'undefined') return;

    var formdata = new FormData();
    formdata.append("file", file);

    var requestOptions = {
      method: 'POST',
      body: formdata,
    };

    let response = await fetch(`${PostImage}`, requestOptions);
    let result = await response.text()
    saveUser(txId, result)
  }

  const handleRegisterClick= async () => {
    if (email === "") toast.error("Please enter Email");
    else if (userOtp === "") toast.error("Please enter your OTP")
    else if (otp !== userOtp) toast.error("Incorrect OTP");
    else if (typeof(file) === 'undefined') toast.error("Please upload Profile Image");
    else {
      const hashData = generateHash([email])
      const registerModal = document.getElementById("registerModal");
      registerUser.signAndSend([hashData]);

      registerModal!.classList.remove("show");
    }
  }

  const handleGetOTP = async () => {
    toast.loading("Sending OTP..");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({});

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    let response = await fetch(`${PostUserOtp}${email}`, requestOptions)
    if (response.ok) {
      let result = await response.text();
      setOtp(result);
      console.log(result)
      toast.dismiss()
      toast.success("OTP sent successfully!")
    } else {
      toast.dismiss()
      toast.error("Failed to send OTP!")
    }
  }

  return (
    <div id="registerModal" className="search-modal">
      <div id="registerModalOverlay" className="search-modal-overlay" />
      <div className="search-wrapper">
        <div className="search-wrapper-header">
          <div className={"flex flex-col items-center gap-4 h-96 overflow-y-auto overflow-x-hidden no-scrollbar"}>
            <h3 className={"mb-4"}>Register Now!</h3>
            <div className="mx-auto mb-4 w-full sm:px-4 md:px-8 lg:px-12">
            <div className="flex flex-col gap-6">
                <div className={"flex gap-6 flex-col w-full"}>
                  <div className="w-full">
                      <label htmlFor="title" className="form-label block">
                        Wallet Address
                      </label>
                      <input
                        disabled
                        id="wallet-address"
                        name="wallet-address"
                        className="form-input-disable w-full"
                        value={walletAddress}
                        type="text"
                        required
                      />
                  </div>
                  <div className="w-full">
                    <div>
                      <label htmlFor="title" className="form-label block">
                        Email
                      </label>
                      <div className={"flex gap-4"}>
                        <input
                            id="Email"
                            name="Email"
                            className="form-input w-full"
                            placeholder="Enter your email"
                            type="text"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            required
                        />
                        <button onClick={handleGetOTP} className={"btn btn-primary w-full"}>
                          <h5 className={"text-white dark:text-dark flex justify-center"}>Get OTP</h5>
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
                <div className="w-full">
                  <div>
                    <label htmlFor="title" className="form-label block">
                      Enter OTP
                    </label>
                    <div className={"flex"}>
                      <input
                          id="Email"
                          name="Email"
                          className="form-input w-full"
                          placeholder="Enter OTP"
                          type="text"
                          value={userOtp}
                          onChange={(e)=>setUserOtp(e.target.value)}
                          required
                      />
                    </div>
                  </div>
                </div>

                <div className={"flex gap-6 flex-col md:flex-row w-full"}>
                  <div className="w-full">
                    <label
                      className="form-label block"
                      htmlFor="file_input"
                    >
                      Profile Image
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
                      ref={imageRef}
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
            <button onClick={handleRegisterClick} className={"btn btn-primary w-full"}>
              <h5 className={"text-white dark:text-dark flex justify-center"}>Register</h5>
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
