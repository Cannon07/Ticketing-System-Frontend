"use client"

import { createContext, useContext, Dispatch, SetStateAction,useState, ReactNode } from "react";


interface UserData {
  id: string,
  name: string,
  profileImg: string,
  transactionId: string,
  userEmail: string,
  userName: string,
  walletId: string,
}

interface ContextProps{
    selectedCity: string,
    setSelectCity: Dispatch<SetStateAction<string>>,
    walletAddress: string,
    setWalletAddress: Dispatch<SetStateAction<string>>,
    hasAccount: boolean,
    setHasAccount: Dispatch<SetStateAction<boolean>>,
    connectLoading: boolean,
    setConnectLoading: Dispatch<SetStateAction<boolean>>,
    userData: UserData | null,
    setUserData: Dispatch<SetStateAction<UserData | null>>,
}

const GlobalContext = createContext<ContextProps>({
    selectedCity: "",
    setSelectCity: (): string=>'',
    walletAddress: "",
    setWalletAddress: (): string=>'',
    hasAccount: false,
    setHasAccount: (): boolean=>false,
    connectLoading: false,
    setConnectLoading: (): boolean=>false,
    userData: null,
    setUserData: (): UserData | null => null,
})

interface GlobalContextProviderProps{
    children: ReactNode;
}

export const GlobalContextProvider = ({children}:GlobalContextProviderProps)=>{
    const city=localStorage.getItem('city')?localStorage.getItem('city'):"";
    const [selectedCity,setSelectCity] = useState(city?city.toString():"");
    const [walletAddress,setWalletAddress] = useState('');
    const [hasAccount,setHasAccount] = useState(false);
    const [connectLoading, setConnectLoading] = useState(false);
    const [userData, setUserData] = useState<UserData | null>(null);

    return (
        <GlobalContext.Provider value = {{selectedCity,setSelectCity,walletAddress,setWalletAddress,hasAccount,setHasAccount,connectLoading,setConnectLoading,userData,setUserData}}>

            {children}

        </GlobalContext.Provider>
    )
 }

 export const useGlobalContext = () => useContext(GlobalContext);
