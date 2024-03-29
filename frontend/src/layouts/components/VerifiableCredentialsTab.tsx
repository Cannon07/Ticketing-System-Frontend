import { useState } from "react";
import VerifiableCredentialsCard from "./VerifiableCredentialsCard"
import { RiGovernmentLine } from "react-icons/ri";
import { RiGovernmentFill } from "react-icons/ri";
import { IoHome } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { IoSchoolOutline } from "react-icons/io5";
import { IoSchool } from "react-icons/io5";
import { IoWalletOutline } from "react-icons/io5";

const VerifiableCredentialsTab = () => {
  const [credTab, setCredTab] = useState('Government Ids')

  return (
    <div className="flex justify-between w-full gap-4">

      <div className="flex flex-col gap-4 w-full justify-center items-center">
        <VerifiableCredentialsCard
          name={"Government Id"}
          vc={"fb0ea18c-8499-4d5c-83c7-f715b82f969f"}
          type={1}
          issue_date={"February 10, 2024"}
          expiry_date={"March 10, 2024"}
        />

        <VerifiableCredentialsCard
          name={"Government Id"}
          vc={"fb0ea18c-8499-4d5c-83c7-f715b82f969f"}
          type={1}
          issue_date={"March 10, 2024"}
          expiry_date={"April 10, 2024"}
        />
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
