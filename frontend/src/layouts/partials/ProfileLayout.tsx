import Profile from "@/components/Profile"
import Accordion from "@/shortcodes/Accordion"

const ProfileLayout = ({children}:any) => {

    return (
        <div className="section-sm">
            <div className="container">
                <div className="row">
                    <div className="grid grid-cols-3">
                        <div className="lg:hidden flex col-span-3 md:px-8">
                            <Accordion title="..." className="w-full">
                                 <Profile />
                            </Accordion>
                        </div>
                        <div className="hidden lg:contents">
                            <Profile />
                        </div>

                        <div className="col-span-3 lg:col-span-2 pt-3">
                            <div className="flex justify-center items-center flex-wrap">

                             {children}

                            </div>

                        </div>
                        <div></div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProfileLayout;