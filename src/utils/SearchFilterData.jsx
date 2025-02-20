const searchFilters = {
    status: [
        {
            title: "Select Status",
            options: [
                { label: "Approved Appointments", value: "ApprovedAppointments" },
                { label: "Cancelled Appointments", value: "CancelledAppointments" },
                { label: "Request Appointments", value: "RequestAppointments" },
            ]
        }
    ],
    role: [
        {
            title: "Select Role",
            options: [
                { label: "Admin", value: "Admin" },
                { label: "Owner", value: "Owner" },
                { label: "Super Admin", value: "SuperAdmin" }
            ]
        }
    ],
    building: [
        {
            title: "Select Building",
            options: [
                { label: "Building 1", value: "Building1" },
                { label: "Building 2", value: "Building2" },
                { label: "Building 3", value: "Building3" },
                { label: "Building 4", value: "Building4" },
                { label: "Building 5", value: "Building5" },
            ]
        }
    ],
    stalls: [
        {
            title: "Select Stalls Status",
            options: [
                { label: "Occupied", value: "Occupied" },
                { label: "Reserved", value: "Reserved" },
                { label: "Available", value: "Available" },
                { label: "Unavailable", value: "Unavailable" },
            ]
        }
    ],
        stalls: [
        {
            title: "Select Stalls Status",
            options: [
                { label: "Occupied", value: "Occupied" },
                { label: "Reserved", value: "Reserved" },
                { label: "Available", value: "Available" },
                { label: "Unavailable", value: "Unavailable" },
            ]
        }
    ],
    category: [
        {
            title: "Select Stalls Status",
            options: [
                { label: "Stall Maintenance Issues", value: "Stall Maintenance Issues" },
                { label: "Stall Maintenance Issues", value: "Stall Maintenance Issues" },
                { label: "Stall Maintenance Issues", value: "Stall Maintenance Issues" },
                { label: "Stall Maintenance Issues", value: "Stall Maintenance Issues" },
            ]
        }
    ]
};

export default searchFilters;
