import Card from "../../components/user/Card";
import StallsTable from "../../components/user/ManageStalls/StallsTable";
import searchFilters from "../../utils/SearchFilterData";
import { CardStats } from "../../utils/CardStatsData";

export default function ManageStallsPage() {
    const {stallStats} = CardStats();
    

    return (
        <>
            <div className="row g-6 mb-6 justify-content-center">
                {stallStats.map((stat, index) => (
                    <Card key={index} {...stat} />
                ))}
            </div>
            <StallsTable     search={[...searchFilters.building, ...searchFilters.stalls]
            } />
        </>
    )
}