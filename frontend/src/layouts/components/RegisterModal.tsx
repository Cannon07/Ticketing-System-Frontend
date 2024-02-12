"use client"

import React, { useEffect, useState, useRef } from "react";
import { useGlobalContext } from "@/app/context/globalContext";
import { useContract, useTx, useWallet } from "useink";
import { CONTRACT_ADDRESS } from '@/constants/contract_constants/ContractAddress';
import metadata from '@/constants/contract_constants/assets/TicketingSystem.json';
import { useTxNotifications } from "useink/notifications";
import { generateHash } from "@/lib/utils/hashGenerator";
import toast from "react-hot-toast";
import { PostUser } from "@/constants/UserEndpoints";
import { PostImage } from "@/constants/ImageEndpoints";

const RegisterModal = () => {

  const { walletAddress, setConnectLoading } = useGlobalContext();
  const { disconnect } = useWallet();

  const contract = useContract(CONTRACT_ADDRESS,metadata);

  const registerUser = useTx(contract,'registerUser');
  useTxNotifications(registerUser);

  const [email,setEmail] = useState('');
  const [fullname,setFullname] = useState('');
  const [username,setUsername] = useState('');
  const [file, setFile] = useState<File | undefined>();
  const imageRef = useRef<HTMLInputElement>(null);

  const registerStatus = () => {
    if(registerUser.status === 'Finalized'){
      let txId = "";
      registerUser.result?.contractEvents?.map((value) => {
        txId = Object.values(value.args[1]).slice(0, 64).join("")
      });
      toast.dismiss()
      toast.success('Transaction finalized!')
      let register_toast = toast.loading('Registering User..')
      uploadImage(txId);
      toast.dismiss(register_toast);
      toast.success('User Registered!')
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

  const saveUser = async (txId: String, imageUrl: String) => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "name": fullname,
        "userName": username,
        "userEmail": email,
        "walletId": walletAddress,
        "transactionId": txId,
        "profileImg": imageUrl,
      });

      console.log(raw);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
      };

      let response = await fetch(`${PostUser}`, requestOptions)
      if (response.ok) {
        console.log(response);
        setFullname("");
        setUsername("");
        setEmail("");
        setFile(undefined);
      }
  }

  const uploadImage = async (txId: String) => {
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
    else if (fullname === "") toast.error("Please enter Full Name");
    else if (username === "") toast.error("Please enter Username");
    else if (typeof(file) === 'undefined') toast.error("Please upload Profile Image");
    else {
      const hashData = generateHash([walletAddress,email,fullname,username])
      const registerModal = document.getElementById("registerModal");
      registerUser.signAndSend([hashData]);

      registerModal!.classList.remove("show");
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
                <div className={"flex gap-6 flex-col md:flex-row w-full"}>
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
                      <label htmlFor="title" className="form-label block">
                        Email
                      </label>
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
                  </div>
                </div>
                <div className={"flex gap-6 flex-col md:flex-row w-full"}>
                  <div className="w-full">
                      <label htmlFor="title" className="form-label block">
                        Full Name
                      </label>
                      <input
                          id="full-name"
                          name="full-name"
                          className="form-input w-full"
                          placeholder="Enter your full name"
                          type="text"
                          value={fullname}
                          onChange={(e)=>setFullname(e.target.value)}
                          required
                      />
                  </div>

                  <div className="w-full">
                      <label htmlFor="date" className="form-label block">
                        Username
                      </label>
                      <input
                          id="date"
                          name="date"
                          className="form-input w-full"
                          placeholder="Enter your username"
                          type="text"
                          value={username}
                          onChange={(e)=>setUsername(e.target.value)}
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
