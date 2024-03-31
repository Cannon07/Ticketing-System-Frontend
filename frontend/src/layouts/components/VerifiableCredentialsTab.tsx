import { useState, useEffect } from "react";
import VerifiableCredentialsCard from "./VerifiableCredentialsCard"
import { RiGovernmentLine } from "react-icons/ri";
import { RiGovernmentFill } from "react-icons/ri";
import { IoHome } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { IoSchoolOutline } from "react-icons/io5";
import { IoSchool } from "react-icons/io5";
import { IoWalletOutline } from "react-icons/io5";
import { BsBuilding } from "react-icons/bs";
import { BsBuildingFill } from "react-icons/bs";
import { GetUserDetailsById } from "@/constants/ssi_endpoint_constants/UserDetailsEndpoint";
import { GetVCsByUserDid } from "@/constants/ssi_endpoint_constants/UserDetailsEndpoint";
import { useGlobalContext } from "@/app/context/globalContext";
import toast from "react-hot-toast";

interface VCDetails {
  name: string,
  vc: string,
  type: string,
  issue_date: string,
  expiry_date: string,
}

const VerifiableCredentialsTab = () => {
  const [credTab, setCredTab] = useState('Government Ids')
  const [userDid, setUserDid] = useState<string>('');
  const [userVCs, setUserVCs] = useState<VCDetails[]>([]);
  const [filterVCs, setFilterVCs] = useState<VCDetails[]>([]);

  const { userData } = useGlobalContext();

  function formatDate(inputDate: any) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const dateParts = inputDate.split(' ')[0].split('-');
    const year = parseInt(dateParts[0]);
    const monthIndex = parseInt(dateParts[1]) - 1;
    const day = parseInt(dateParts[2]);

    const monthName = months[monthIndex];

    return `${monthName} ${day}, ${year}`;
  }

  const fetchUserDid = async () => {
    setUserDid('');
    toast.loading("Fetching User Did..", {id: "FetchUserDetails"})

    var requestOptions = {
      method: 'GET',
    };
    let response = await fetch(`${GetUserDetailsById}${userData?.userDetailsId}`, requestOptions)
    console.log(response)

    if (response.ok) {
      let result = await response.json();
      console.log(result);
      toast.dismiss();
      toast.success("User Did Fetched Successfully!", {id: "SuccessUserDetails"});
      setUserDid(result.userDid);
    } else {
      toast.dismiss();
      toast.error("User Did not found!", {id: "FailUserDetails"});
    }
  }

  const fetchUserVCs = async () => {
    toast.loading("Fetching User's VCs..", {id: "FetchUserVCs"})

    var requestOptions = {
      method: 'GET',
    };
    let response = await fetch(`${GetVCsByUserDid}${userDid}`, requestOptions)
    console.log(response)

    if (response.ok) {
      let result = await response.json();
      console.log(result);
      toast.dismiss();
      toast.success("User VCs Fetched Successfully!", {id: "SuccessUserVCs"});

      let userVCsList: VCDetails[] = [];
      result.map((vcData: any) => {
        let tempUserVC: VCDetails = {
          name: vcData.issuer.name,
          vc: vcData.id,
          type: vcData.proof.proofPurpose,
          issue_date: formatDate(vcData.validFrom),
          expiry_date: formatDate(vcData.expirationDate)
        }
        userVCsList.push(tempUserVC);
      })
      setUserVCs(userVCsList);
      filterUserVCs(userVCsList);
    } else {
      toast.dismiss();
      toast.error("User VCs not found!", {id: "FailUserVCs"});
    }
  }

  const filterUserVCs = (vcList: VCDetails[]) => {
    if (credTab == 'Government Ids') {
      let tempVCList: VCDetails[] = [];
      tempVCList = vcList.filter((vc) => {
        return vc.type === 'AgeVerification';
      })
      setFilterVCs(tempVCList);
    } else if (credTab == 'Student Ids') {
      let tempVCList: VCDetails[] = [];
      tempVCList = vcList.filter((vc) => {
        return vc.type === 'StudentVerification';
      })
      setFilterVCs(tempVCList);
    } else if (credTab == 'Both Ids') {
      let tempVCList: VCDetails[] = [];
      tempVCList = vcList.filter((vc) => {
        return vc.type === 'Both';
      })
      setFilterVCs(tempVCList);
    } else if (credTab == 'General Ids') {
      let tempVCList: VCDetails[] = [];
      tempVCList = vcList.filter((vc) => {
        return vc.type === 'General';
      })
      setFilterVCs(tempVCList);
    }
  }

  useEffect(() => {
    fetchUserDid();
  }, [])

  useEffect(() => {
    if (userDid !== '') {
      fetchUserVCs();
    }
  }, [userDid])

  useEffect(() => {
    filterUserVCs(userVCs)
  }, [credTab])

  return (
    <div className="flex justify-between w-full h-full gap-4">

      <div className="flex flex-col gap-4 w-full items-center">
        {filterVCs.length > 0 ?
          filterVCs.map((vc, index) => {
          return (
            <VerifiableCredentialsCard
              key={index}
              name={vc.name}
              vc={vc.vc}
              type={vc.type}
              issue_date={vc.issue_date}
              expiry_date={vc.expiry_date}
            />
          )
        }) :
          <div className={"p-8 flex flex-col items-center justify-center h-full"}>
            <h1 className={"h2 text-center"}>No VCs Available</h1>
            <div className={"content flex flex-col items-center"}>
              <p className={"mb-0 text-center"}>
                There are no VCs of the type {credTab} available at the moment, but you can apply to get one.
              </p>
            </div>
          </div>
        }
      </div>

      <div className="lg:sticky lg:top-28 w-80 h-fit bg-theme-light dark:bg-darkmode-theme-light rounded-lg lg:border lg:border-border lg:dark:border-darkmode-border p-8">

        <div className="flex flex-col gap-2">

          <div className="flex gap-2 items-center">
            <IoWalletOutline className="text-black dark:text-white" size={35}/>
            <h4>Credentials</h4>
          </div>

          <div className="py-4">
            <hr className="h-px w-full dark:bg-gray-600 border-0 bg-gray-200" />
          </div>

          <div className="flex flex-col gap-4">
            <div
              onClick={() => {
                setCredTab("Government Ids")
              }}
              className="cursor-pointer"
            >
              {credTab === 'Government Ids' ?
                <div className={`flex gap-2 items-center`}>
                  <RiGovernmentFill className="text-black dark:text-white" size={30}/>
                  <h5>Government Ids</h5>
                </div>
                :
                <div className={`flex gap-2 items-center`}>
                  <RiGovernmentLine className="text-black dark:text-gray-400" size={30}/>
                  <h5 className="dark:text-gray-400">Government Ids</h5>
                </div>
              }

            </div>

            <div
              onClick={() => {
                setCredTab("Student Ids")
              }}
              className="cursor-pointer"
            >
              {credTab === 'Student Ids' ?
                <div className={`flex gap-2 items-center`}>

                  <IoSchool className="text-black dark:text-white" size={30}/>
                  <h5>Student Ids</h5>
                </div>
                :
                <div className={`flex gap-2 items-center`}>
                  <IoSchoolOutline className="text-black dark:text-gray-400" size={30}/>
                  <h5 className="dark:text-gray-400">Student Ids</h5>
                </div>
              }

            </div>

            <div
              onClick={() => {
                setCredTab('Both Ids')
              }}
              className="cursor-pointer"
            >
              {credTab === 'Both Ids' ?
                <div className={`flex gap-2 items-center`}>
                  <BsBuildingFill className="text-black dark:text-white" size={30}/>
                  <h5>Combined Ids</h5>
                </div>
                :
                <div className={`flex gap-2 items-center`}>
                  <BsBuilding className="text-black dark:text-gray-400" size={30}/>
                  <h5 className="dark:text-gray-400">Combined Ids</h5>
                </div>
              }

            </div>

            <div
              onClick={() => {
                setCredTab('General Ids')
              }}
              className="cursor-pointer"
            >
              {credTab === 'General Ids' ?
                <div className={`flex gap-2 items-center`}>
                  <IoHome className="text-black dark:text-white" size={30}/>
                  <h5>General Ids</h5>
                </div>
                :
                <div className={`flex gap-2 items-center`}>
                  <IoHomeOutline className="text-black dark:text-gray-400" size={30}/>
                  <h5 className="dark:text-gray-400">General Ids</h5>
                </div>
              }

            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default VerifiableCredentialsTab
