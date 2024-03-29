import { RiGovernmentLine } from "react-icons/ri";
import { TbShieldCheckFilled } from "react-icons/tb";

const VerifiableCredentialsCard = () => {
  return (
    <div className="w-fit rounded-xl bg-gradient-r shadow-xl ring-1 ring-black/10 p-8">
      <div className="w-full flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <RiGovernmentLine className="text-black dark:text-white" size={45} />
            </div>

            <div>
              <h5>Government ID</h5>
              <p>National Government</p>
            </div>
          </div>

          <div>
            <TbShieldCheckFilled className="text-green-400" size={30}/>
          </div>
        </div>

        <div>
          <h4>Verified Credential Id</h4>
          <p className="h5">fb0ea18c-8499-4d5c-83c7-f715b82f969f</p>
        </div>

        <div className="flex justify-between">
          <div>
            <h6>Issuance Date</h6>
            <p className="h6">February 10, 2024</p>
          </div>

          <div>
            <h6>Expiration Date</h6>
            <p className="h6">March 10, 2024</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerifiableCredentialsCard
