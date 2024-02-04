"use client";

import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/app/context/globalContext";
import { useContract, useTx, useWallet } from "useink";
import { CONTRACT_ADDRESS } from '@/constants/contractAddress';
import metadata from '@/constants/TicketingSystem.json';
import { useTxNotifications } from "useink/notifications";
import { generateHash } from "@/lib/utils/hashGenerator";

const RegisterModal = () => {

  const { walletAddress } = useGlobalContext();
  const { disconnect } = useWallet();

  const contract = useContract(CONTRACT_ADDRESS,metadata);

  const registerUser = useTx(contract,'registerUser');
  useTxNotifications(registerUser);

  const [email,setEmail] = useState('');
  const [fullname,setFullname] = useState('');
  const [username,setUsername] = useState('');


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
      disconnect()
    });
  }, []);


  

  const handleRegisterClick=(e:any)=>{
      e.preventDefault();
      const hashData = generateHash([walletAddress,email,fullname,username])
      const registerModal = document.getElementById("registerModal");
      registerUser.signAndSend([hashData]);

      registerModal!.classList.remove("show");
      

  }

  return (
    <div id="registerModal" className="search-modal">
      {/* <p>{hashData}</p> */}
      <div id="registerModalOverlay" className="search-modal-overlay" />
      <div className="search-wrapper">
        <div className="search-wrapper-header">
          <div className={"flex flex-col items-center gap-4"}>
            <h3 className={"mb-4"}>Register Now!</h3>
            <div className="mx-auto mb-4 w-full sm:px-4 md:px-8 lg:px-12">
            <form className="flex flex-col gap-6" method="POST">
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
            </form>
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
