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
                { label: "Building 1", value: "1" },
                { label: "Building 2", value: "2" },
                { label: "Building 3", value: "3" },
                { label: "Building 4", value: "4" },
                { label: "Building 5", value: "5" },
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
                { label: "Maintenance", value: "Maintenance" },
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
    ],
    complaints: [
        {
            title: "Select Complaints Status",
            options: [
                { label: "Closed Complaints", value: "Closed Complaints" },
                { label: "In Process Complaints", value: "In Process Complaints" },
                { label: "Not Process Complaints", value: "Not Process Complaints" },
            ]
        }
    ]
};

export default searchFilters;
