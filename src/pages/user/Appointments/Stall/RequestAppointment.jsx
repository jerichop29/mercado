import StallAppointmentsTable from "../../../../components/user/StallAppointments/AppointmentTable";
import searchFilters from "../../../../utils/SearchFilterData";

export default function RequestAppointmentsPage() {

    const StallAppointments = [
        {
            id: 1,
            fullName: 'Jericho Pecho',
            email: 'jerichopecho@gmail.com',
            contact: '123-456-7890',
            proofOfIdentity: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzsaFEhwQnLa5ufm0B2oVzTwEij-b8YSdSWU_RvWS9466Cam5eHwnxPa7Gyaw5DDcL_9I&usqp=CAU', 
            requestedAppointment: '2021-08-01 12:00:00',
            startAppointment: '2021-08-01 12:00:00',
            endAppointment: '2021-08-01 12:00:00',
            status: 'Request'
          },
    ];
    return (
        <>
            <StallAppointmentsTable StallAppointments={StallAppointments} search={searchFilters.status} />
        </>
    )
}