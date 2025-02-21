import SubCategoryTable from "../../../../components/user/SubCategory/SubCategoryTable";
import searchFilters from "../../../../utils/SearchFilterData";

export default function ManageSubCategoryPage() {

    const SubCategory = [
        {
            id: 2,
            category: "Maintainance Issue",
            title: "Stall Maintenance Issues",
            description: "Stall maintenance issues refer to any structural, functional, or operational problems related to a rented or owned stall space.",
        },
    ];
    return (
        <>
            <SubCategoryTable SubCategory={SubCategory} search={searchFilters.category}/>
        </>
    )
}