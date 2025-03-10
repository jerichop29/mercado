import Card from "../../../../components/user/Card"
import StallAppointmentsTable from "../../../../components/user/StallAppointments/AppointmentTable";
import searchFilters from "../../../../utils/SearchFilterData";
import {CardStats} from "../../../../utils/CardStatsData";


export default function StallAllAppointmentsPage() {

  const { stallAppointmentStats } = CardStats();
  


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
    {
      id: 2,
      fullName: 'Jericho Pecho',
      email: 'jerichopecho@gmail.com',
      contact: '123-456-7890',
      proofOfIdentity: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzsaFEhwQnLa5ufm0B2oVzTwEij-b8YSdSWU_RvWS9466Cam5eHwnxPa7Gyaw5DDcL_9I&usqp=CAU',
      requestedAppointment: '2021-08-01 12:00:00',
      startAppointment: '2021-08-01 12:00:00',
      endAppointment: '2021-08-01 12:00:00',
      status: 'Approved'
    },
    {
      id: 3,
      fullName: 'Jericho Pecho',
      email: 'jerichopecho@gmail.com',
      contact: '123-456-7890',
      proofOfIdentity: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzsaFEhwQnLa5ufm0B2oVzTwEij-b8YSdSWU_RvWS9466Cam5eHwnxPa7Gyaw5DDcL_9I&usqp=CAU', 
      requestedAppointment: '2021-08-01 12:00:00',
      startAppointment: '2021-08-01 12:00:00',
      endAppointment: '2021-08-01 12:00:00',
      status: 'Cancelled'
    }
  ];
  return (
    <>
      <div className="row g-6 mb-6 justify-content-center">
        {stallAppointmentStats.map((stat, index) => (
          <Card key={index} {...stat} />
        ))}
      </div>
      <StallAppointmentsTable StallAppointments={StallAppointments} search={searchFilters.status} />
    </>
  )
}