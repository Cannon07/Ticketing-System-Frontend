import { FaAddressCard } from "react-icons/fa";
import { RiGovernmentLine } from "react-icons/ri";
import { IoSchoolOutline } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";

interface IssuerDetailsProps {
  name: string,
  did: string,
  type: number,
}

const RequestIssuerCard: React.FC<IssuerDetailsProps> = ({name, did, type}) => {
  return (
    <div className="w-full">

      <div className="rounded-xl bg-gradient-r shadow-lg ring-1 ring-black/10 p-8 flex w-full justify-between">
        <div className="flex gap-4 items-center">

          <div>
            {type === 1 &&
              <RiGovernmentLine className="text-black dark:text-white" size={60}/>
            }

            {type === 2 &&
              <IoSchoolOutline className="text-black dark:text-white" size={60}/>
            }

            {type === 3 &&
              <IoHomeOutline className="text-black dark:text-white" size={60}/>
            }
          </div>

          <div className="flex flex-col gap-1">
            <h4>{name}</h4>
            <p>{did}</p>
          </div>

        </div>

        <div className="group flex items-center cursor-pointer">
          <div className="btn btn-outline-primary group-hover:btn-primary flex flex-col gap-1 items-center justify-center">
            <FaAddressCard className="text-dark dark:text-white group-hover:text-white dark:group-hover:text-dark" size={25}/>
            <h5 className="group-hover:text-white dark:group-hover:text-dark">Request VC</h5>
          </div>
        </div>
      </div>

    </div>
  )
}

export default RequestIssuerCard;
