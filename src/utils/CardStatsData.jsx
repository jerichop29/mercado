const CardStats = {
    userStats: [
        { title: "Users", count: 500, percentage: "100%", description: "Total Users", icon: "fa-solid fa-users"},
        { title: "Owner", count: 489, percentage: "97.8%", description: "Total Owners", icon: "fa-solid fa-user-tie" },
        { title: "Admin", count: 10, percentage: "0.2%", description: "Total Admins", icon: "fa-solid fa-users-gear" },
        { title: "Super Admin", count: 1, percentage: "0.02%", description: "Total Super-Admin", icon: "fa-solid fa-user-secret" }
    ],

    tenantStats: [
        { title: "Total", count: 89, percentage: "100%", description: "Total Tenants", icon: "fa-solid fa-users"},
        { title: "Stalls", count: 20, percentage: "5%", description: "number of stalls with tenants", icon: "fa-solid fa-store" },
        { title: "New Tenants", count: 8, percentage: "9%", description: "number of new tenants this year", icon: "fa-solid fa-user-plus" },
        { title: "Long term Tenants", count: 81, percentage: "87%", description: "number of old tenants", icon: "bi bi-person-heart" },
    ],

    stallStats: [
        { title: "Occupied Stalls", count: 20, percentage: "5%", description: "number of stalls of building 1", icon: "bx bx-lock-alt" },
        { title: "Reserved Stalls", count: 20, percentage: "5%", description: "number of stalls of building 2", icon: "fa-solid fa-hourglass-half" },
        { title: "Available Stalls", count: 20, percentage: "5%", description: "number of stalls of building 3", icon: "bx bx-door-open" },
        { title: "Unavailable", count: 500, percentage: "100%", description: "Total Tenants", icon: "bx bx-x" },
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
};

export default CardStats;
