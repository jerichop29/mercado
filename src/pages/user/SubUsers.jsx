import Card from "../../components/user/Card";
import UserTable from "../../components/user/SubUsers/UserTable";
import searchFilters from "../../utils/SearchFilterData";
import {CardStats} from "../../utils/CardStatsData";

export default function SubUsersPage() {

    const {userStats} = CardStats();

    return(
        <>
            <div className="row g-6 mb-6 justify-content-center">
                {userStats.map((stat, index) => (
                    <Card key={index} {...stat} />
                ))}
            </div>
            <UserTable search={searchFilters.role} />
        </>
    )
}