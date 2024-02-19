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
    date: { today: boolean, tomorrow: boolean, weekend: boolean },
    setDate: Dispatch<SetStateAction<{ today: boolean, tomorrow: boolean, weekend: boolean }>>,
    price: { Free: boolean, below_500: boolean, between_500_1000: boolean, Above_2000: boolean },
    setPrice: Dispatch<SetStateAction<{ Free: boolean, below_500: boolean, between_500_1000: boolean, Above_2000: boolean }>>,
    categories: {
      Rock: boolean,
      Pop: boolean,
      Jazz: boolean,
      Classical: boolean,
      Hip_hop: boolean,
      Electronic_Dance: boolean,
      Country: boolean,
      R_B_Soul: boolean,
      Folk: boolean,
      Alternative: boolean
    },
    setCategories: Dispatch<SetStateAction<{
      Rock: boolean,
      Pop: boolean,
      Jazz: boolean,
      Classical: boolean,
      Hip_hop: boolean,
      Electronic_Dance: boolean,
      Country: boolean,
      R_B_Soul: boolean,
      Folk: boolean,
      Alternative: boolean
    }>>,
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
    date: { today: false, tomorrow: false, weekend: false },
    setDate: () => ({ today: false, tomorrow: false, weekend: false }),
    price: { Free: false, below_500: false, between_500_1000: false, Above_2000: false },
    setPrice: () => ({ Free: false, below_500: false, between_500_1000: false, Above_2000: false }),
    categories: {
      Rock: false,
      Pop: false,
      Jazz: false,
      Classical: false,
      Hip_hop: false,
      Electronic_Dance: false,
      Country: false,
      R_B_Soul: false,
      Folk: false,
      Alternative: false
    },
    setCategories: () => ({
      Rock: false,
      Pop: false,
      Jazz: false,
      Classical: false,
      Hip_hop: false,
      Electronic_Dance: false,
      Country: false,
      R_B_Soul: false,
      Folk: false,
      Alternative: false
    }),
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
    const [date, setDate] = useState({ today: false, tomorrow: false, weekend: false });
    const [price, setPrice] = useState({ Free: false, below_500: false, between_500_1000: false, Above_2000: false });
    const [categories, setCategories] = useState({
      Rock: false,
      Pop: false,
      Jazz: false,
      Classical: false,
      Hip_hop: false,
      Electronic_Dance: false,
      Country: false,
      R_B_Soul: false,
      Folk: false,
      Alternative: false
    });

    return (
        <GlobalContext.Provider value = {{selectedCity,setSelectCity,walletAddress,setWalletAddress,hasAccount,setHasAccount,connectLoading,setConnectLoading,userData,setUserData,date,setDate,price,setPrice,categories,setCategories}}>

            {children}

        </GlobalContext.Provider>
    )
 }

 export const useGlobalContext = () => useContext(GlobalContext);
