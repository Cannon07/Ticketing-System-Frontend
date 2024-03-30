import { IoSchoolOutline } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { RiGovernmentLine } from "react-icons/ri";
import { TbShieldCheckFilled } from "react-icons/tb";
import { BsBuilding } from "react-icons/bs";

interface VCDetailsProps {
  name: string,
  vc: string,
  type: string,
  issue_date: string,
  expiry_date: string,
}

const VerifiableCredentialsCard: React.FC<VCDetailsProps> = ({name, vc, type, issue_date, expiry_date}) => {
  return (
    <div className="w-fit rounded-xl bg-gradient-r shadow-xl ring-1 ring-black/10 p-8">
      <div className="w-full flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              {type === 'AgeVerification' &&
                <RiGovernmentLine className="text-black dark:text-white" size={45} />
              }

              {type === 'StudentVerification' &&
                <IoSchoolOutline className="text-black dark:text-white" size={45} />
              }

              {type === 'Both' &&
                <BsBuilding className="text-black dark:text-white" size={45} />
              }

              {type === 'General' &&
                <IoHomeOutline className="text-black dark:text-white" size={45} />
              }
            </div>

            <div>
              {type === 'AgeVerification' &&
                <h5>Government ID</h5>
              }

              {type === 'StudentVerification' &&
                <h5>Student ID</h5>
              }

              {type === 'Both' &&
                <h5>Common ID</h5>
              }

              {type === 'General' &&
                <h5>General ID</h5>
              }
              <p>{name}</p>
            </div>
          </div>

          <div>
            <TbShieldCheckFilled className="text-green-400" size={30}/>
          </div>
        </div>

        <div>
          <h4>Verified Credential Id</h4>
          <p className="h5">{vc}</p>
        </div>

        <div className="flex justify-between">
          <div>
            <h6>Issuance Date</h6>
            <p className="h6">{issue_date}</p>
          </div>

          <div>
            <h6>Expiration Date</h6>
            <p className="h6">{expiry_date}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerifiableCredentialsCard
