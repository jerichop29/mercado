import StallAppointmentsTable from "../../../../components/user/Appointments/StallTable";

export default function ApprovedAppointmentsPage() {

    const StallAppointments = [
        {
            id: 2,
            fullName: 'Jericho Pecho',
            email: 'jerichopecho@gmail.com',
            contact: '123-456-7890',
            proofOfIdentity: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzsaFEhwQnLa5ufm0B2oVzTwEij-b8YSdSWU_RvWS9466Cam5eHwnxPa7Gyaw5DDcL_9I&usqp=CAU', // Example ID image URL
            status: 'Approved'
        },
    ];
    return (
        <>
            <StallAppointmentsTable StallAppointments={StallAppointments}/>
        </>
    )
}