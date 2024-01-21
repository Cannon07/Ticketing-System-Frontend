import UserTicket from "@/components/UserTicket"

const UserProfile = () => {

    const numsTop = ['10px', '20px', '30px', '40px', '40px']
    const numsBottom = [0, 3]

    return (
        <div className="section-sm">
            <div className="container">
                <div className="row">

                    <div className="grid grid-cols-3">

                        <div></div>
                        <div className="col-span-3 lg:col-span-2">
                            <div className="flex justify-center items-center flex-wrap">
                      
                            <UserTicket />
                            <UserTicket />
                            <UserTicket />
                            <UserTicket />
                            <UserTicket />
 
                            </div>



                        </div>

                        <div></div>


                    </div>




                </div>
            </div>

        </div>
    )
}

export default UserProfile