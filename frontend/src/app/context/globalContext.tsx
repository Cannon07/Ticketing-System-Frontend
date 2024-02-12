"use client"

import { createContext, useContext, Dispatch, SetStateAction,useState, ReactNode } from "react";

interface ContextProps{
    selectedCity: string,
    setSelectCity: Dispatch<SetStateAction<string>>,
    walletAddress: string,
    setWalletAddress: Dispatch<SetStateAction<string>>,
    hasAccount: boolean,
    setHasAccount: Dispatch<SetStateAction<boolean>>,
    connectLoading: boolean,
    setConnectLoading: Dispatch<SetStateAction<boolean>>,
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

    return (
        <GlobalContext.Provider value = {{selectedCity,setSelectCity,walletAddress,setWalletAddress,hasAccount,setHasAccount,connectLoading,setConnectLoading}}>

            {children}

        </GlobalContext.Provider>
    )
 }

 export const useGlobalContext = () => useContext(GlobalContext);
