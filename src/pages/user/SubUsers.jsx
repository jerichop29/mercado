import Card from "../../components/user/Card";
import UserTable from "../../components/user/SubUsers/UserTable"
import searchFilters from "../../utils/SearchFilterData";
import CardStats from "../../utils/CardStatsData";

export default function SubUsersPage(){

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
                {CardStats.userStats.map((stat, index) => (
                    <Card key={index} {...stat} />
                ))}
            </div>
            <UserTable users={users} search={searchFilters.role} />
        </>
    )
}