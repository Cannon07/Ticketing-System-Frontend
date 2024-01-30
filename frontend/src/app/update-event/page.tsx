
import UpdateEventForm from "@/components/UpdateEventForm";
import OrganizerPageHeader from "@/partials/OrganizerPageHeader";



const UpdateEvent = async () => {


    return (
        <>

            <OrganizerPageHeader title={"Update Event"} />
            <section className="section-sm">
                <div className="container">
                    <div className="row px-4">
                        <UpdateEventForm />
                    </div>
                </div>
            </section>
        </>
    );
};

export default UpdateEvent;
