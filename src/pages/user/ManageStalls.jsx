import Card from "../../components/user/Card";
import StallsTable from "../../components/user/ManageStalls/StallsTable";
import searchFilters from "../../utils/SearchFilterData";
import CardStats from "../../utils/CardStatsData";

export default function ManageStallsPage() {

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
                {CardStats.stallStats.map((stat, index) => (
                    <Card key={index} {...stat} />
                ))}
            </div>
            <StallsTable stalls={stalls} search={[...searchFilters.building, ...searchFilters.stalls]
            } />
        </>
    )
}