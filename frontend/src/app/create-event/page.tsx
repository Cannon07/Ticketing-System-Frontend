
import CreateEventForm from "@/components/CreateEventForm";
import OrganizerPageHeader from "@/partials/OrganizerPageHeader";



const CreateEvent = async () => {
    


    return (
        <>
          
            <OrganizerPageHeader title={"Create Event"} />
            <section className="section-sm">
                <div className="container">
                    <div className="row px-4">
                            <CreateEventForm />
                    </div>
                </div>
            </section>
        </>
    );
};

export default CreateEvent;
