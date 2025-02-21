import { useEffect, useState } from "react";
import ownerHandler from "../../backend/src/handler/js/OwnerHandler.js";
import adminHandler from "../../backend/src/handler/js/AdminHandler.js";
import tenantHandler from "../../backend/src/handler/js/TenantHandler.js";
export const useData = (search , role) => {
    const [owner, setOwner] = useState([]);
    const [admin, setAdmin] = useState([]);
    const [tenant, setTenant] = useState([]);
    const [combined, setCombined] = useState([]);
    const handleFilterData = async () => {
        try {
            //
            const tenantData = await tenantHandler.getTenants();
            const ownerData = await ownerHandler.getOwners();
            const adminData = await adminHandler.getAdmins();

            if (!ownerData?.data|| !adminData?.data || !tenantData?.data) return;
            // Filter owners based on search
            const filteredOwners = search
                ? ownerData.data.filter((data) => {
                    const nameMatch = data?.FName?.toLowerCase().includes(search.toLowerCase());
                    const roleMatch = data?.role ? data.role.toLowerCase().includes(role.toLowerCase()) : true;
                    return nameMatch && roleMatch;
                })
                : role
                ? ownerData.data.filter((data) => data?.role ? data.role.toLowerCase() === role.toLowerCase() : true)
                : ownerData.data;


            setOwner(filteredOwners);
            // Filter owners based on search
            const filteredAdmin =search
                ? adminData.data.filter((data) => {
                    const nameMatch = data?.FName?.toLowerCase().includes(search.toLowerCase());
                    const roleMatch = data?.role ? data.role.toLowerCase() === role.toLowerCase() :true;    
                    return nameMatch && roleMatch;
                })
                : role
                ? adminData.data.filter((data) => data?.role ? data.role.toLowerCase() === role.toLowerCase() : true)
                : adminData.data;

            setAdmin(filteredAdmin);
            setCombined([...filteredOwners, ...filteredAdmin]);

            const filteredTenants = search
            ? tenantData.data.filter((data) => {
                const nameMatch = data?.FName?.toLowerCase().includes(search.toLowerCase())
                                || data?.LName?.toLowerCase().includes(search.toLowerCase())
                                || data?.Owner_FName?.toLowerCase().includes(search.toLowerCase())
                                || data?.Owner_LName?.toLowerCase().includes(search.toLowerCase());
                const bldgMatch = data?.BuildingName ? data.role.toLowerCase().includes(role.toLowerCase()) : true;
                return nameMatch && bldgMatch;
            })
            : role
            ? tenantData.data.filter((data) => data?.BuildingName?.toLowerCase().includes(role.toLowerCase()))
            : tenantData.data;
            
            setTenant(filteredTenants);
        } catch (e) {
            console.error("Error fetching owners:", e);
        }
    };

    useEffect(() => {
        handleFilterData();
    }, [search]); // Re-run effect when search changes

    return { owner , admin , combined , tenant };
};
