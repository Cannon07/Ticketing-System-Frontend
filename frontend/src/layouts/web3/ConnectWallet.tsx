import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useInstalledWallets, useUninstalledWallets, useWallet } from 'useink';
import { useGlobalContext } from "@/app/context/globalContext";
import { GetUserByWalletId } from "@/constants/UserEndpoints";
import toast from "react-hot-toast";

export interface WalletList {
  name: string;
  extensionName: string;
  url: string;
  installed?: boolean;
}

export interface AccountList {
  name: string | undefined;
  address: string;
  source: string;
  active: boolean;
}

export const ConnectWallet = () => {
  const { account, accounts, setAccount, connect, disconnect } = useWallet();
  const installedWallets = useInstalledWallets();
  const uninstalledWallets = useUninstalledWallets();
  const {setHasAccount, setWalletAddress, connectLoading, setConnectLoading} = useGlobalContext();
  const registerModal = document.getElementById("registerModal");
  //const {currentAccount, setCurrentAccount} = useState<AccountList>();

  const installedWalletsData: WalletList[] = installedWallets.map(({title, extensionName, installUrl}) => ({
    name: title,
    url: installUrl,
    extensionName: extensionName,
    installed: true,
  }))

  const uninstalledWalletsData: WalletList[] = uninstalledWallets.map(({title, extensionName, installUrl}) => ({
    name: title,
    url: installUrl,
    extensionName: extensionName,
    installed: false
  }))

  const allWallets: WalletList[] = installedWalletsData.concat(uninstalledWalletsData)
  let accountsList: AccountList[] = [];
  let currentAccount: AccountList;

  useEffect (() => {
    const fetchUser = async () => {
      setConnectLoading(true);
      toast.loading("Fetching user..")
      var requestOptions = {
        method: 'GET',
      };
      let response = await fetch(`${GetUserByWalletId}${account?.address}`, requestOptions)
      let result = await response.json()
      console.log(result)
      if (response.status == 404) {
        toast.dismiss();
        registerModal!.classList.add("show");
      } else {
        toast.dismiss();
        toast.success("User Fetched");
        setConnectLoading(false);
      }
    }

    if (account) {
      currentAccount = {
        name: account?.name,
        address: account?.address,
        source: account?.source,
        active: true,
      }

      fetchUser();

    }

    if (accounts) {
      accountsList = accounts.map(({name, address, source}) => ({
        name: name,
        address: address,
        source: source,
        active: false
      }))
    }
    console.log(currentAccount, accountsList);
  }, [account])

  if (!account) {
  return (
        <ul
          id="nav-menu"
          className="navbar-nav order-3 hidden w-full pb-6 lg:order-1 lg:flex lg:w-auto lg:space-x-2 lg:pb-0 xl:space-x-8"
        >
            <React.Fragment key={'wallet-map'}>
                <li className="nav-item nav-dropdown group relative">
                  <span
                    className={`btn btn-outline-primary btn-sm hidden lg:inline-flex items-center cursor-pointer w-40 justify-center`}
                  >
                    <p className="overflow-hidden whitespace-nowrap text-ellipsis">{connectLoading ? "Loading..." : "Connect Wallet"}</p>
                    {!connectLoading && <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>}
                  </span>
                  <ul className="nav-dropdown-list hidden group-hover:block lg:invisible lg:absolute lg:block lg:opacity-0 lg:group-hover:visible lg:group-hover:opacity-100">
                    {allWallets.map((child: WalletList, i: number) => (
                      <li className="w-32 nav-dropdown-item" key={`children-${i}`}>
                        {child.installed ? (
                          <span
                            className="nav-dropdown-link block cursor-pointer"
                            onClick={() => connect(child.extensionName)}
                          >
                            {child.name}
                          </span>
                        ) : (
                          <Link
                            href={child.url}
                            className={`nav-dropdown-link block opacity-50 active cursor-pointer`}
                          >
                            {child.name}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </li>
            </React.Fragment>
          </ul>
    )
  } else {
    setHasAccount(true);
    setWalletAddress(account?.address);
    const disconnectWallet=()=>{
      setHasAccount(false);
      setWalletAddress('');
      disconnect();
    }

  return (
      <ul
          id="nav-menu"
          className="navbar-nav order-3 hidden w-full pb-6 lg:order-1 lg:flex lg:w-auto lg:space-x-2 lg:pb-0 xl:space-x-8"
        >
            <React.Fragment key={'wallet-map'}>
                <li className="nav-item nav-dropdown group relative">
                  <span
                    className={`btn btn-outline-primary btn-sm hidden lg:inline-flex items-center cursor-pointer w-40 justify-center`}
                  >
                    <p className="overflow-hidden whitespace-nowrap text-ellipsis">{connectLoading ? "Loading..." : `${account.name}`}</p>
                    {!connectLoading && <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>}
                  </span>
                  <ul className="nav-dropdown-list hidden group-hover:block lg:invisible lg:absolute lg:block lg:opacity-0 lg:group-hover:visible lg:group-hover:opacity-100">
                    {accounts && accounts.map((child) => (
                      (account !== child) &&
                      <li className="w-32 nav-dropdown-item" key={`children-${Math.random()}`}>
                          <span
                            className="nav-dropdown-link block cursor-pointer"
                            onClick={() => (setAccount(child))}
                          >
                            <p className="overflow-hidden whitespace-nowrap text-ellipsis">{child.name}</p>
                          </span>
                      </li>
                    ))}
                    <li className="w-32 nav-dropdown-item" key={`children-${Math.random()}`}>
                          <span
                            className="nav-dropdown-link block cursor-pointer"
                            onClick={disconnectWallet}
                          >
                            <p className="overflow-hidden whitespace-nowrap text-ellipsis">Disconnect</p>
                          </span>
                    </li>
                  </ul>
                </li>
            </React.Fragment>
          </ul>
  )
  }

}

