import { FaAddressCard } from "react-icons/fa";
import { RiGovernmentLine } from "react-icons/ri";
import { IoSchoolOutline } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { BsBuilding } from "react-icons/bs";
import { PostRequestVCsFromIssuer } from "@/constants/ssi_endpoint_constants/IssuerEndpoints";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface IssuerDetailsProps {
  name: string,
  did: string,
  type: string,
  userDetailsId: string,
}

const RequestIssuerCard: React.FC<IssuerDetailsProps> = ({name, did, type, userDetailsId}) => {
  const router = useRouter();

  const handleRequestVC = async () => {
    toast.loading("Sending VC Request to Issuer..", {id: "LoadingReqIssuer"});
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "userId": userDetailsId,
      "issuerDid": did
    });

    console.log(raw);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    let response = await fetch(`${PostRequestVCsFromIssuer}`, requestOptions)

    console.log(response);

    if (response.ok) {
      toast.dismiss();
      let result = await response.json();
      console.log(result);
      toast.success("VC Request Sent Successfully!", {id: "SuccessReqIssuer"});
      router.push('/user-profile');
    } else {
      toast.error("VC Request Failed!", {id: "FailureReqIssuer"});
    }
  }

  return (
    <div className="w-full">

      <div className="rounded-xl bg-gradient-r shadow-lg ring-1 ring-black/10 p-8 flex w-full justify-between">
        <div className="flex gap-4 items-center">

          <div>
            {type === 'AgeVerification' &&
              <RiGovernmentLine className="text-black dark:text-white" size={60}/>
            }

            {type === 'StudentVerification' &&
              <IoSchoolOutline className="text-black dark:text-white" size={60}/>
            }

            {type === 'Both' &&
              <BsBuilding className="text-black dark:text-white" size={60}/>
            }

            {type === 'General' &&
              <IoHomeOutline className="text-black dark:text-white" size={60}/>
            }
          </div>

          <div className="flex flex-col gap-1">
            <h4>{name}</h4>
            <p>{did}</p>
          </div>

        </div>

        <div className="group flex items-center cursor-pointer">
          <div
            onClick={() => handleRequestVC()}
            className="btn btn-outline-primary group-hover:btn-primary flex flex-col gap-1 items-center justify-center"
          >
            <FaAddressCard className="text-dark dark:text-white group-hover:text-white dark:group-hover:text-dark" size={25}/>
            <h5 className="group-hover:text-white dark:group-hover:text-dark">Request VC</h5>
          </div>
        </div>
      </div>

    </div>
  )
}

export default RequestIssuerCard;
