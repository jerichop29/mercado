import DiscoverTable from "../../../components/user/Discover/DiscoverTable";

export default function ManageDiscoverPage(){
    const Discover = [
        {
            id: 2,
            title: "Stall Maintenance Issues",
            description: "Stall maintenance issues refer to any structural, functional, or operational problems related to a rented or owned stall space.",
            publish: "15/03/2025 12:04am",
            end: "15/03/2025 12:04pm",
            background: "https://www.britishclubbangkok.org/wp-content/uploads/2022/05/Table-Tennis-Tournament-1600.jpg",
            link: "https://forms.gle/Kx2n5ucy3umD9zaw"
        },
    ];

    return(
        <>
            <DiscoverTable Discover={Discover}/>
        </>
    )
}
