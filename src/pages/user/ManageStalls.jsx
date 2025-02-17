import Card from "../../components/user/Card";
import StallsTable from "../../components/user/ManageStalls/StallsTable";

export default function ManageStallsPage() {

    const StallStats = [
        { title: "Occupied Stalls", count: 20, percentage: "5%", description: "number of stalls of building 1", icon: "bx bx-lock-alt" },
        { title: "Reserved Stalls", count: 20, percentage: "5%", description: "number of stalls of building 2", icon: "fa-solid fa-hourglass-half" },
        { title: "Available Stalls", count: 20, percentage: "5%", description: "number of stalls of building 3", icon: "bx bx-door-open" },
        { title: "Unavailable", count: 500, percentage: "100%", description: "Total Tenants", icon: "bx bx-x" },
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
        },
        {
            title: "Select Stalls Status",
            options: [
                { label: "Occupied", value: "Occupied" },
                { label: "Reserved", value: "Reserved" },
                { label: "Available", value: "Available" },
                { label: "Unavailable", value: "Unavailable" },
            ]
        }
    ];

    const stalls = [
        {
            id: 1,
            avatar: 'https://cdn-icons-png.flaticon.com/512/9203/9203764.png',
            fullName: 'Jericho Pecho',
            email: 'jerichopecho@gmail.com',
            code: 'C-123',
            type: 'Meat',
            building: '1',
            status: 'Occupied',
            start: 'April 01, 2025',
            due: 'May 01, 2025'
        },

        {
            id: 2,
            avatar: 'https://cdn-icons-png.flaticon.com/512/9203/9203764.png',
            fullName: 'Jericho Pecho',
            email: 'jerichopecho@gmail.com',
            code: 'F-123',
            type: 'Fish',
            building: '1',
            status: 'Reserved',
            start: 'april 01, 2025',
            due: 'May 01, 2025'
        },

        
        {
            id: 2,
            avatar: 'https://cdn-icons-png.flaticon.com/512/9203/9203764.png',
            fullName: 'Jericho Pecho',
            email: 'jerichopecho@gmail.com',
            code: 'F-123',
            type: 'Vegetable',
            building: '1',
            status: 'Available',
            start: 'april 01, 2025',
            due: 'May 01, 2025'
        },

        
        {
            id: 2,
            avatar: 'https://cdn-icons-png.flaticon.com/512/9203/9203764.png',
            fullName: 'Jericho Pecho',
            email: 'jerichopecho@gmail.com',
            code: 'F-123',
            type: 'Others',
            building: '1',
            status: 'Maintainance',
            start: 'april 01, 2025',
            due: 'May 01, 2025'
        },
        {
            id: 2,
            avatar: 'https://cdn-icons-png.flaticon.com/512/9203/9203764.png',
            fullName: 'Jericho Pecho',
            email: 'jerichopecho@gmail.com',
            code: 'F-123',
            type: 'Variety',
            building: '1',
            status: 'Maintainance',
            start: 'april 01, 2025',
            due: 'May 01, 2025'
        },
    ];

    return (
        <>
            <div className="row g-6 mb-6 justify-content-center">
                {StallStats.map((stat, index) => (
                    <Card key={index} {...stat} />
                ))}
            </div>
            <StallsTable stalls={stalls} search={searchFilter} />
        </>
    )
}