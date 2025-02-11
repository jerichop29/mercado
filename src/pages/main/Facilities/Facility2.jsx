import PageTitle from "../../../components/main/PageTitle/PageTitle";
import Facility from "../../../components/main/Facilities/Facility";
import facilityData from "../../../utils/FacilityData";

export default function Facility2Page() {
    const facility = facilityData.find(fac => fac.id === 2); // Get Facility 1 Data

    return (
        <>
            <PageTitle />
            <Facility facility={facility} />
        </>
    );
}
