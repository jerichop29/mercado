import { useData } from '../hooks/useData';

export const CardStats = () => {
    const { admin, owner, tenant, stall } = useData();

    // Calculate user stats
    const totalAdmins = admin.length || 0;
    const totalOwners = owner.length || 0;
    const totalUsers = totalAdmins + totalOwners || 1; // Prevent division by zero
    const adminPercentage = ((totalAdmins / totalUsers) * 100).toFixed(0);
    const ownerPercentage = ((totalOwners / totalUsers) * 100).toFixed(0);

    /// Get the current year
    const currentYear = new Date().getFullYear();

    // Calculate tenant stats
    const totalTenants = tenant.length || 0;
    // Calculate new tenants (those who started this year)
    const newTenants = tenant.filter(t => {
        const startDate = new Date(t.Date_Start);
        return startDate.getFullYear() === currentYear; // Check if the year matches the current year
    }).length || 0;

    const longTermTenants = tenant.filter(t => {
        const startDate = new Date(t.Date_Start);
        return startDate.getFullYear() < currentYear; // Check if the year matches the current year
    }).length || 0; // Assuming there's a property to identify long-term tenants

    // Calculate stall stats
    const totalStalls = stall.length || 0;
    const occupiedStalls = stall.filter(stall => stall.Status_Id === "4").length || 0;
    const availableStalls = stall.filter(stall => stall.Status_Id === "1").length || 0;
    const unavailableStalls = stall.filter(stall => stall.Status_Id === "2").length || 0;
    const reservedStalls = stall.filter(stall => stall.Status_Id === "3").length || 0;
    const stallOccupancyRate = totalStalls ? `${((occupiedStalls / totalStalls) * 100).toFixed(2)}%` : "0";

    return {
        userStats: [
            {
                title: "Users",
                count: totalUsers,
                percentage: "100%",
                description: "Total Users",
                icon: "fa-solid fa-users",
                bgColor: "bg-label-primary"
            },
            {
                title: "Owner",
                count: totalOwners,
                percentage: `${ownerPercentage}%`,
                description: "Total Owners",
                icon: "fa-solid fa-user-tie",
                bgColor: "bg-label-danger"
            },
            {
                title: "Admin",
                count: totalAdmins,
                percentage: `${adminPercentage}%`,
                description: "Total Admins",
                icon: "fa-solid fa-users-gear",
                bgColor: "bg-label-success"
            },
            {
                title: "Super Admin",
                count: 1,
                percentage: `${(1 / totalUsers * 100).toFixed(0)}%`,
                description: "Total Super-Admin",
                icon: "fa-solid fa-user-secret",
                bgColor: "bg-label-warning"
            }
        ],
        tenantStats: [
            { title: "Total", count: totalTenants, percentage: "100%", description: "Total Tenants", icon: "fa-solid fa-users" },
            { title: "Stalls", count: totalStalls, percentage: stallOccupancyRate, description: "number of stalls with tenants", icon: "fa-solid fa-store" },
            { title: "New Tenants", count: newTenants, percentage: `${((newTenants / totalTenants) * 100).toFixed(0)}%`, description: "number of new tenants this year", icon: "fa-solid fa-user-plus" },
            { title: "Long term Tenants", count: longTermTenants, percentage: `${((longTermTenants / totalTenants) * 100).toFixed(0)}%`, description: "number of old tenants", icon: "bi bi-person-heart" },
        ],
        stallAppointmentStats: [
            {
                title: "Stall Appointments",
                count: 0,
                percentage: "0%",
                description: "Total Appointments",
                icon: "fa-solid fa-calendar-check",
                bgColor: "bg-label-info"
            }
        ],
        stallStats: [
            { title: "Occupied Stalls", count: occupiedStalls, percentage: `${((occupiedStalls / totalStalls) * 100).toFixed(2)}%`, description: "number of stalls of building 1", icon: "bx bx-lock-alt" },
            { title: "Reserved Stalls", count: reservedStalls, percentage: `${((reservedStalls / totalStalls) * 100).toFixed(2)}%`, description: "number of stalls of building 2", icon: "fa-solid fa-hourglass-half" },
            { title: "Available Stalls", count: availableStalls, percentage: `${((availableStalls / totalStalls) * 100).toFixed(2)}%`, description: "number of stalls of building 3", icon: "bx bx-door-open" },
            { title: "Unavailable", count: unavailableStalls, percentage: `${((unavailableStalls / totalStalls) * 100).toFixed(2)}%`, description: "Total Tenants", icon: "bx bx-x" },
        ],
        facilityAppointmentStats: [
            {
                title: "Facility Bookings",
                count: 0,
                percentage: "0%",
                description: "Total Bookings",
                icon: "fa-solid fa-building",
                bgColor: "bg-label-warning"
            }
        ],
        stallAppointmentStats: [
            { title: "New", count: 20, description: "new appointments this week", icon: "bi bi-calendar3" },
            { title: "Approved", count: 20, description: "Approved Appointments", icon: "bx bx-check-circle" },
            { title: "Cancelled", count: 20, description: "Cancelled Appointments", icon: "bx bx-x-circle" },
            { title: "Request", count: 500, description: "Request Appointments", icon: "bx bx-calendar-check" },
        ],
        facilityAppointmentStats: [
            { title: "New", count: 20, description: "new appointments this week", icon: "bi bi-calendar3" },
            { title: "Approved", count: 20, description: "Approved Appointments", icon: "bx bx-check-circle" },
            { title: "Cancelled", count: 20, description: "Cancelled Appointments", icon: "bx bx-x-circle" },
            { title: "Request", count: 500, description: "Request Appointments", icon: "bx bx-calendar-check" },
        ],
        complaintStats: [
            { title: "Total", count: 20, description: "Total Complaints", icon: "bx bx-alarm-exclamation" },
            { title: "Closed", count: 10, description: "Number of Closed Complaints", icon: "bx bx-lock" },
            { title: "In-Process", count: 5, description: "Number ofIn-Process Complaints", icon: "bx bx-loader-circle" },
            { title: "Pending", count: 5, description: "Number of Pending Complaints", icon: "bx bx-time" },
        ],
    
    };
};

export default CardStats;
