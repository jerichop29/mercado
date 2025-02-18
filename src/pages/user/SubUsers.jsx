import Card from "../../components/user/Card";
import UserTable from "../../components/user/SubUsers/UserTable"

export default function SubUsersPage(){
    const userStats = [
        { title: "Users", count: 500, percentage: "100%", description: "Total Users", icon: "fa-solid fa-users"},
        { title: "Owner", count: 489, percentage: "97.8%", description: "Total Owners", icon: "fa-solid fa-user-tie" },
        { title: "Admin", count: 10, percentage: "0.2%", description: "Total Admins", icon: "fa-solid fa-users-gear" },
        { title: "Super Admin", count: 1, percentage: "0.02%", description: "Total Super-Admin", icon: "fa-solid fa-user-secret" }
    ];

    const searchFilter = [
        {
          title: "Select Role",
          options: [
            { label: "Admin", value: "Admin" },
            { label: "Owner", value: "Owner" },
            { label: "Super Admin", value: "SuperAdmin" }
          ]
        }
      ];

    const users = [
        {
          id: 1,
          fullName: 'Jericho Pecho',
          email: 'jerichopecho@gmail.com',
          contact: '0991-239-2093',
          sex: 'Male',
          address: 'Brgy.Bañadero, Calamba City, Laguna',
          role: 'Owner',
          avatar: 'https://cdn-icons-png.flaticon.com/512/9203/9203764.png',
        },
        {
            id: 2,
            fullName: 'Jericho Pecho',
            email: 'jerichopecho@gmail.com',
            contact: '0991-239-2093',
            sex: 'Male',
            address: 'Brgy.Bañadero, Calamba City, Laguna',
            role: 'Admin',
            avatar: 'https://cdn-icons-png.flaticon.com/512/9203/9203764.png',
          },
          {
            id: 3,
            fullName: 'Jericho Pecho',
            email: 'jerichopecho@gmail.com',
            contact: '0991-239-2093',
            sex: 'Male',
            address: 'Brgy.Bañadero, Calamba City, Laguna',
            role: 'Super Admin',
            avatar: 'https://cdn-icons-png.flaticon.com/512/9203/9203764.png',
          },
          
      ];

    return(
        <>
            <div className="row g-6 mb-6 justify-content-center">
                {userStats.map((stat, index) => (
                    <Card key={index} {...stat} />
                ))}
            </div>
            <UserTable users={users} search={searchFilter} />
        </>
    )
}