import { useEffect, useState } from "react";
import ownerHandler from "../../backend/src/handler/js/OwnerHandler.js";
import adminHandler from "../../backend/src/handler/js/AdminHandler.js";
import tenantHandler from "../../backend/src/handler/js/TenantHandler.js";
import stallHandler from "../../backend/src/handler/js/stallHandler.js";

export const useData = (search , role) => {
    const [owner, setOwner] = useState([]);
    const [admin, setAdmin] = useState([]);
    const [tenant, setTenant] = useState([]);
    const [combined, setCombined] = useState([]);
    const [stallFilter, setStallFilter] = useState([]);
    const [stall,setStall]=useState([]);
    const handleFilterData = async () => {
        try {
            //
            const tenantData = await tenantHandler.getTenants();
            const ownerData = await ownerHandler.getOwners();
            const adminData = await adminHandler.getAdmins();
            const stallData = await stallHandler.getStalls();

            if (!ownerData?.data|| !adminData?.data || !tenantData?.data) return;
            // Filter owners based on search
            const filteredOwners = ownerData.data.filter(data => {
                // Skip filtering if no search criteria
                if (!search && !role) return true;
                // Normalize search and role once
                const searchLower = search?.toLowerCase() || '';
                const roleLower = role?.toLowerCase() || '';
                const dataRole = data?.role?.toLowerCase() || '';
                const dataEmail = data?.Email?.toLowerCase() || '';
                // Check search criteria
                const nameMatch = !search || dataEmail.includes(searchLower);
                // Check role criteria
                const roleMatch = !role || dataRole === roleLower;
                return nameMatch && roleMatch;
            });


            setOwner(filteredOwners);
            // Filter owners based on search
            const filteredAdmin = adminData.data.filter(data => {
                // Skip filtering if no search criteria
                if (!search && !role) return true;
                // Normalize search and role once
                const searchLower = search?.toLowerCase() || '';
                const roleLower = role?.toLowerCase() || '';
                const dataRole = data?.role?.toLowerCase() || '';
                const dataEmail = data?.Email?.toLowerCase() || '';
                // Check search criteria
                const nameMatch = !search || dataEmail.includes(searchLower);
                // Check role criteria
                const roleMatch = !role || dataRole === roleLower;
                return nameMatch && roleMatch;
            });

            setAdmin(filteredAdmin);
            setCombined([...filteredOwners, ...filteredAdmin]);

            const filteredTenants = tenantData.data.filter(data => {
                // Skip filtering if no search criteria
                if (!search && !role) return true;
                
                // Normalize search and role once
                const searchLower = search?.toLowerCase() || '';
                const roleLower = role?.toLowerCase() || '';
                
                // Normalize tenant data once
                const firstName = data?.FName?.toLowerCase() || '';
                const lastName = data?.LName?.toLowerCase() || '';
                const ownerFirstName = data?.Owner_FName?.toLowerCase() || '';
                const ownerLastName = data?.Owner_LName?.toLowerCase() || '';
                const buildingName = data?.BuildingName?.toLowerCase() || '';
                
                // Check name matches if search term exists
                const nameMatch = !search || (
                    firstName.includes(searchLower) ||
                    lastName.includes(searchLower) ||
                    ownerFirstName.includes(searchLower) ||
                    ownerLastName.includes(searchLower)
                );
                
                // Check building match if role exists
                const bldgMatch = !role || buildingName.includes(roleLower);
                
                return nameMatch && bldgMatch;
            });
            
            setTenant(filteredTenants);

            const filteredStalls = stallData.data.filter(data => {
                // Skip filtering if no search term
                if (!search && !role) return true;
                
                // Normalize search and stall code once
                const searchLower = search?.toLowerCase() || '';
                const roleLower = role?.toLowerCase() || '';

                const stallCode = data?.StallCode?.toLowerCase() || '';
                const stallBuilding = data?.BuildingName?.toLowerCase() || '';
                const stallStatus = data?.Status?.toLowerCase() || ''; // Assuming Status is the field for StallStatus
                
                // Check status and building match if role exists
                const statusMatch = !role || stallStatus.includes(roleLower);
                const bldgMatch = !role || stallBuilding.includes(roleLower);

                return stallCode.includes(searchLower) && statusMatch || stallCode.includes(searchLower) && bldgMatch;
            });
            setStall(filteredStalls);
        } catch (e) {
            console.error("Error fetching owners:", e);
        }
    };

    useEffect(() => {
        handleFilterData();
    }, [search]); // Re-run effect when search changes

    return { owner , admin , combined , tenant , stall };
};
