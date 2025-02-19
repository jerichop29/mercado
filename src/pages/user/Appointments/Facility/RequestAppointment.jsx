import FacilityAppointmentsTable from "../../../../components/user/Appointments/FacilityTable";
import searchFilters from "../../../../utils/SearchFilterData";

export default function FacilityRequestAppointmentPage(){

    const FacilityAppointments = [
        {
            id: 1,
            fullName: 'Jericho Pecho',
            email: 'jerichopecho@gmail.com',
            contact: '123-456-7890',
            proofOfIdentity: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzsaFEhwQnLa5ufm0B2oVzTwEij-b8YSdSWU_RvWS9466Cam5eHwnxPa7Gyaw5DDcL_9I&usqp=CAU', // Example ID image URL
            facility: 1,
            reservationStartRequest: "March 12, 2025",
            reservationDueRequest: "March 12, 2025",
            status: 'Request'
          } ,
    ];
    return(
        <>
         <FacilityAppointmentsTable FacilityAppointments={FacilityAppointments} search={searchFilters.status} />
        </>
    )
}