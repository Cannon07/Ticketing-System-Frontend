"use client"

import { createContext, useContext, Dispatch, SetStateAction,useState, ReactNode } from "react";

interface ContextProps{
    selectedCity: string,
    setSelectCity: Dispatch<SetStateAction<string>>,
}

const GlobalContext = createContext<ContextProps>({
    selectedCity: "",
    setSelectCity: (): string=>'',
})

interface GlobalContextProviderProps{
    children: ReactNode;
}

export const GlobalContextProvider = ({children}:GlobalContextProviderProps)=>{
    const city=localStorage.getItem('city')?localStorage.getItem('city')?.toString():"";
    const [selectedCity,setSelectCity] = useState(city?city.toString():"");

    return (
        <GlobalContext.Provider value = {{selectedCity,setSelectCity}}>

            {children}

        </GlobalContext.Provider>
    )
 }

 export const useGlobalContext = () => useContext(GlobalContext);
