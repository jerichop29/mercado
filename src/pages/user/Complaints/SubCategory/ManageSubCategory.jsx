import SubCategoryTable from "../../../../components/user/SubCategory/SubCategoryTable";

export default function ManageCategoryPage() {

    const SubCategory = [
        {
            id: 3,
            type: "Stall Maintenance Issues",
            title: "Plumbing problem",
            description: "Issues such as leaking pipes, clogged drains, or malfunctioning water supply systems that affect the stall’s operations.",
        }
    ];
    return (
        <>
            <SubCategoryTable SubCategory={SubCategory} />
        </>
    )
}