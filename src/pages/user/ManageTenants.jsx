import Card from "../../components/user/Card";
import TenantsTable from "../../components/user/ManageTenants/TenantsTable";
import searchFilters from "../../utils/SearchFilterData";
import { CardStats } from "../../utils/CardStatsData";

export default function ManageTenantsPage() {
    const {tenantStats} = CardStats();
    return (
        <>
            <div className="row g-6 mb-6 justify-content-center">
                {tenantStats.map((stat, index) => (
                    <Card key={index} {...stat} />
                ))}
            </div>
            <TenantsTable search={searchFilters.building} />
        </>
    )
}