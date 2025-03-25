import {useEffect, useState} from "react";
import ownerHandler from "../controllers/js/OwnerHandler.js";
import adminHandler from "../controllers/js/AdminHandler.js";
import tenantHandler from "../controllers/js/TenantHandler.js";
import stallHandler from "../controllers/js/stallHandler.js";
import AppointmentHandler from "../controllers/js/AppointmentHandler.js";
import complaintsHandler from "../controllers/js/complaintsHandler.js";
import DiscoverHandler from '../controllers/js/DiscoverHandler.js';
import CategoryHandler from "../controllers/js/CategoryHandler.js";
import SubCategoryHandler from "../controllers/js/SubCategoryHandler.js";
import AvatarHandler from "../controllers/js/AvatarHandler.js";
export const useData = (search, role) => {
    const [avatar,
        setAvatar]= useState([]);
    const [subCategories,
        setSubCategories] = useState([]);
    const [subCategoriesWid,
            setSubCategoriesWid] = useState([]);
    const [username,
        setUsername] = useState([]);
    const [owner,
        setOwner] = useState([]);
    const [admin,
        setAdmin] = useState([]);
    const [tenant,
        setTenant] = useState([]);
    const [combined,
        setCombined] = useState([]);
    const [stall,
        setStall] = useState([]);
    const [appointment,
        setApppointment] = useState([]);
    const [complaints,
        setComplaints] = useState([]);
    const [discover,
        setDiscover] = useState([]);
    const [categories,
        setCategories] = useState([]);
    const handleFilterData = async() => {
        try {
            //
            const tenantData = await tenantHandler.getTenants();
            const ownerData = await ownerHandler.getOwners();
            const adminData = await adminHandler.getAdmins();
            const stallData = await stallHandler.getStalls();
            const categoriesData = await CategoryHandler.getCategory();
            const subCategoriesData = await SubCategoryHandler.getSubCategory();
            const avatarData = await AvatarHandler.getAllAvatars();
            // const subCategoriesData = await SubCategor
            const appointment = await AppointmentHandler.getAppointments();
            const complaints = await complaintsHandler.getComplaints();
            const discoverData = await DiscoverHandler.getDiscoveries();



            const filterAvatarData = avatarData
                .data
                .filter(data => {
                    if (!search) 
                        return true;
                    const personId = data
                        ?.Person_Id === search || '';
                    return personId;
                });
                setAvatar(filterAvatarData);

            const filterCategoryTitle = categoriesData
                .data
                .filter(data => {
                    if (!search) 
                        return true;
                    const title = data
                        ?.Title
                            ?.toLowerCase() === search || '';
                    return title;
                });
            setCategories(filterCategoryTitle);
            
            const filterSubCategoryTitle = subCategoriesData
                .data
                .filter(data => {
                    if (!search) 
                        return null;
                    const title = data
                        ?.Title
                            ?.toLowerCase() === search || '';
                    return title;
                });
            setSubCategories(filterSubCategoryTitle);

            const filterSubCategoryWithCatId = subCategoriesData
                .data
                .filter(data => {
                    if (!search) 
                        return true;
                    const catId = data
                        ?.Category_Id === search || '';
                    return catId;
                });
            setSubCategoriesWid(filterSubCategoryWithCatId);

            const filteredUsername = ownerData
                .data
                .filter(data => {
                    if (!search && !role) 
                        return null;
                    const username = data
                        ?.Username
                            ?.toLowerCase() === search || '';
                    return username
                });

            const filteredUsernameAdmin = adminData
                .data
                .filter(data => {
                    if (!search && !role) 
                        return null;
                    const username = data
                        ?.Username
                            ?.toLowerCase() === search || '';
                    return username
                });
            setUsername([
                ...filteredUsername,
                ...filteredUsernameAdmin
            ]);

            if (!ownerData
                ?.data || !adminData
                    ?.data || !tenantData
                        ?.data) 
                return;
            
            // Filter owners based on search
            const filteredOwners = ownerData
                .data
                .filter(data => {
                    // Skip filtering if no search criteria
                    if (!search && !role) 
                        return true;
                    
                    // Normalize search and role once
                    const searchLower = search
                        ?.toLowerCase() || '';
                    const roleLower = role
                        ?.toLowerCase() || '';
                    const dataRole = data
                        ?.role
                            ?.toLowerCase() || '';
                    const dataEmail = data
                        ?.Email
                            ?.toLowerCase() || '';
                    // Check search criteria
                    const nameMatch = !search || dataEmail.includes(searchLower);
                    // Check role criteria
                    const roleMatch = !role || dataRole === roleLower;
                    return nameMatch && roleMatch;
                });

            setOwner(filteredOwners);

            // Filter owners based on search
            const filteredAdmin = adminData
                .data
                .filter(data => {
                    // Skip filtering if no search criteria
                    if (!search && !role) 
                        return data.role
                            ?.toLowerCase() !== 'superadmin';
                    
                    // Normalize search and role once
                    const searchLower = search
                        ?.toLowerCase() || '';
                    const roleLower = role
                        ?.toLowerCase() || '';
                    const dataRole = data
                        ?.role
                            ?.toLowerCase() || '';
                    const dataEmail = data
                        ?.Email
                            ?.toLowerCase() || '';
                    // Check search criteria
                    const nameMatch = !search || dataEmail.includes(searchLower);
                    // Check role criteria
                    const roleMatch = !role || dataRole === roleLower;
                    return nameMatch && roleMatch;
                });

            setAdmin(filteredAdmin);
            setCombined([
                ...filteredOwners,
                ...filteredAdmin
            ]);

            const filteredTenants = tenantData
                .data
                .filter(data => {
                    // Skip filtering if no search criteria
                    if (!search && !role) 
                        return true;
                    
                    // Normalize search and role once
                    const searchLower = search
                        ?.toLowerCase() || '';
                    const roleLower = role
                        ?.toLowerCase() || '';

                    // Normalize tenant data once
                    const firstName = data
                        ?.FName
                            ?.toLowerCase() || '';
                    const lastName = data
                        ?.LName
                            ?.toLowerCase() || '';
                    const ownerFirstName = data
                        ?.Owner_FName
                            ?.toLowerCase() || '';
                    const ownerLastName = data
                        ?.Owner_LName
                            ?.toLowerCase() || '';
                    const buildingName = data
                        ?.BuildingName
                            ?.toLowerCase() || '';

                    // Check name matches if search term exists
                    const nameMatch = !search || (firstName.includes(searchLower) || lastName.includes(searchLower) || ownerFirstName.includes(searchLower) || ownerLastName.includes(searchLower));

                    // Check building match if role exists
                    const bldgMatch = !role || buildingName.includes(roleLower);

                    return nameMatch && bldgMatch;
                });
            setTenant(filteredTenants);

            const filteredStalls = stallData
                .data
                .filter(data => {
                    // Skip filtering if no search term
                    if (!search && !role) 
                        return true;
                    
                    // Normalize search and stall code once
                    const searchLower = search
                        ?.toLowerCase() || '';
                    const roleLower = role
                        ?.toLowerCase() || '';

                    const stallCode = data
                        ?.StallCode
                            ?.toLowerCase() || '';
                    const stallBuilding = data
                        ?.BuildingName
                            ?.toLowerCase() || '';
                    const stallStatus = data
                        ?.Status
                            ?.toLowerCase() || ''; // Assuming Status is the field for StallStatus

                    // Check status and building match if role exists
                    const statusMatch = !role || stallStatus.includes(roleLower);
                    const bldgMatch = !role || stallBuilding.includes(roleLower);

                    return stallCode.includes(searchLower) && statusMatch || stallCode.includes(searchLower) && bldgMatch;
                });
            setStall(filteredStalls);

            const fileteredDiscovery = discoverData
                .data
                .filter(data => {
                    // Skip filtering if no search criteria
                    if (!search && !role) 
                        return true;
                    
                    // Normalize search and role once
                    const searchLower = search
                        ?.toLowerCase() || '';

                    const Title = data
                        ?.Title
                            ?.toLowerCase() || '';

                    // Check building match if role exists
                    const titleMatch = !search || Title.includes(searchLower);

                    return titleMatch;
                });
            setDiscover(fileteredDiscovery);

        } catch (e) {
            console.error("Error fetching Data:", e);
        }
    };

    useEffect(() => {
        handleFilterData();
    }, [search]); // Re-run effect when search changes

    return {
        owner,
        admin,
        combined,
        tenant,
        stall,
        username,
        appointment,
        complaints,
        discover,
        categories,
        subCategories,
        avatar,
        subCategoriesWid
    };
};
