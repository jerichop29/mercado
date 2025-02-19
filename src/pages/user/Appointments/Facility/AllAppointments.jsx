import Card from "../../../../components/user/Card"
import FacilityAppointmentsTable from "../../../../components/user/Appointments/FacilityTable";
import searchFilters from "../../../../utils/SearchFilterData";
import CardStats from "../../../../utils/CardStatsData";

export default function StallAllAppointmentsPage() {

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
  },
  {
    id: 2,
    fullName: 'Jericho Pecho',
    email: 'jerichopecho@gmail.com',
    contact: '123-456-7890',
    proofOfIdentity: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzsaFEhwQnLa5ufm0B2oVzTwEij-b8YSdSWU_RvWS9466Cam5eHwnxPa7Gyaw5DDcL_9I&usqp=CAU', // Example ID image URL
    facility: 1,
    reservationStartRequest: "March 12, 2025",
    reservationDueRequest: "March 12, 2025",
    status: 'Approved'
  } ,
  {
    id: 3,
    fullName: 'Jericho Pecho',
    email: 'jerichopecho@gmail.com',
    contact: '123-456-7890',
    proofOfIdentity: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzsaFEhwQnLa5ufm0B2oVzTwEij-b8YSdSWU_RvWS9466Cam5eHwnxPa7Gyaw5DDcL_9I&usqp=CAU', // Example ID image URL
    facility: 1,
    reservationStartRequest: "March 12, 2025",
    reservationDueRequest: "March 12, 2025",
    status: 'Cancelled'
  } ,

];
  return (
    <>
      <div className="row g-6 mb-6 justify-content-center">
          {CardStats.facilityAppointmentStats.map((stat, index) => (
              <Card key={index} {...stat} />
          ))}
      </div>
      <FacilityAppointmentsTable FacilityAppointments={FacilityAppointments} search={searchFilters.status} />
    </>
  )
}