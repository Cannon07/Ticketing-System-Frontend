import AttendedEventsCard from "@/components/AttendedEventsCard";
import UserProfileLayout from "@/partials/UserProfileLayout"

const AttendedEvents = () => {

    return (
        <UserProfileLayout>

            <AttendedEventsCard />
            <AttendedEventsCard />
            <AttendedEventsCard />


        </UserProfileLayout>
    )
}

export default AttendedEvents;


