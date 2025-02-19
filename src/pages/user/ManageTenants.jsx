import Card from "../../components/user/Card";
import TenantsTable from "../../components/user/ManageTenants/TenantsTable";
import searchFilters from "../../utils/SearchFilterData";
import CardStats from "../../utils/CardStatsData";

export default function ManageTenantsPage() {

    const tenants = [
        {
            id: 1,
            avatar: 'https://cdn-icons-png.flaticon.com/512/9203/9203764.png',
            fullName: 'Jericho Pecho',
            email: 'jerichopecho@gmail.com',
            contact: '0991-239-2093',
            sex: 'Male',
            address: 'Brgy.Bañadero, Calamba City, Laguna',
            building: '1',
            stall: 'C-123',
            owner: 'Jericho Pecho'
        },
        {
            id: 1,
            avatar: 'https://cdn-icons-png.flaticon.com/512/9203/9203764.png',
            fullName: 'Jericho Pecho',
            email: 'jerichopecho@gmail.com',
            contact: '0991-239-2093',
            sex: 'Male',
            address: 'Brgy.Bañadero, Calamba City, Laguna',
            building: '1',
            stall: 'C-123',
            owner: 'Jericho Pecho'
        },
        {
            id: 1,
            avatar: 'https://cdn-icons-png.flaticon.com/512/9203/9203764.png',
            fullName: 'Jericho Pecho',
            email: 'jerichopecho@gmail.com',
            contact: '0991-239-2093',
            sex: 'Male',
            address: 'Brgy.Bañadero, Calamba City, Laguna',
            building: '1',
            stall: 'C-123',
            owner: 'Jericho Pecho'
        },
        {
            id: 1,
            avatar: 'https://cdn-icons-png.flaticon.com/512/9203/9203764.png',
            fullName: 'Jericho Pecho',
            email: 'jerichopecho@gmail.com',
            contact: '0991-239-2093',
            sex: 'Male',
            address: 'Brgy.Bañadero, Calamba City, Laguna',
            building: '1',
            stall: 'C-123',
            owner: 'Jericho Pecho'
        },
        {
            id: 1,
            avatar: 'https://cdn-icons-png.flaticon.com/512/9203/9203764.png',
            fullName: 'Jericho Pecho',
            email: 'jerichopecho@gmail.com',
            contact: '0991-239-2093',
            sex: 'Male',
            address: 'Brgy.Bañadero, Calamba City, Laguna',
            building: '1',
            stall: 'C-123',
            owner: 'Jericho Pecho'
        },


    ];

    return (
        <>
            <div className="row g-6 mb-6 justify-content-center">
                {CardStats.tenantStats.map((stat, index) => (
                    <Card key={index} {...stat} />
                ))}
            </div>
            <TenantsTable tenants={tenants} search={searchFilters.building} />
        </>
    )
}