import Card from "../../components/user/Card";
import TenantsTable from "../../components/user/ManageTenants/TenantsTable";

export default function ManageTenantsPage() {
    const tenantStats = [
        { title: "Total", count: 89, percentage: "100%", description: "Total Tenants", icon: "fa-solid fa-users"},
        { title: "Stalls", count: 20, percentage: "5%", description: "number of stalls with tenants", icon: "fa-solid fa-store" },
        { title: "New Tenants", count: 8, percentage: "9%", description: "number of new tenants this year", icon: "fa-solid fa-user-plus" },
        { title: "Long term Tenants", count: 81, percentage: "87%", description: "number of old tenants", icon: "bi bi-person-heart" },
    ];
    
    const searchFilter = [
        {
            title: "Select Building",
            options: [
                { label: "Building 1", value: "Building1" },
                { label: "Building 2", value: "Building2" },
                { label: "Building 3", value: "Building3" },
                { label: "Building 4", value: "Building4" },
                { label: "Building 5", value: "Building5" },
            ]
        }
    ];

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
                {tenantStats.map((stat, index) => (
                    <Card key={index} {...stat} />
                ))}
            </div>
            <TenantsTable tenants={tenants} search={searchFilter} />
        </>
    )
}