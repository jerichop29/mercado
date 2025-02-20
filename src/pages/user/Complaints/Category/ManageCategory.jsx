import CategoryTable from "../../../../components/user/Category/CategoryTable";

export default function ManageCategoryPage() {

    const Category = [
        {
            id: 2,
            title: "Stall Maintenance Issues",
            description: "Stall maintenance issues refer to any structural, functional, or operational problems related to a rented or owned stall space.",
        },
    ];
    return (
        <>
            <CategoryTable Category={Category} />
        </>
    )
}