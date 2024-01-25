"use client";

import React, { useEffect } from "react";
import { useGlobalContext } from "@/app/context/globalContext";
import { useWallet } from "useink";

const RegisterModal = () => {

  const { walletAddress } = useGlobalContext();
  const { disconnect } = useWallet();

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

  return (
    <div id="registerModal" className="search-modal">
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
                          required
                      />
                  </div>
                </div>
            </form>
          </div>
          <div className="w-full sm:px-4 md:px-8 lg:px-12">
            <button className={"btn btn-primary w-full"}>
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
