import { checkRole, checkRoleisOwner } from './auth';

export const MenuData = () => {
    return Promise.all([checkRole(), checkRoleisOwner()])
        .then(([isRoleAdmin, isRoleOwner]) => {
            if (isRoleOwner) {
                return {
                    Data: [
                        {
                            "header": "Owner Pages",
                            "items": [
                                {
                                    "text": "Dashboard",
                                    "icon": "bx bx-home",
                                    "available": true,
                                    "link": "/user/owner-dashboard"
                                }, {
                                    "text": "Ladge Complaint",
                                    "icon": "fa-solid fa-file-circle-exclamation",
                                    "available": true,
                                    "link": "/user/ladge-complaint"
                                }, {
                                    "text": "Complaint History",
                                    "icon": "fa-solid fa-clock-rotate-left",
                                    "available": true,
                                    "link": "/user/complaint-history"
                                }
                            ]
                        }
                    ]
                }

            }
            else if (isRoleAdmin) {
                return {
                    Data: [
                        {
                            "header": "Admin Pages",
                            "items": [
                                {
                                    "text": "Dashboard",
                                    "icon": "bx bx-home",
                                    "available": true,
                                    "link": "/user/dashboard"
                                }, {
                                    "text": "Sub-users",
                                    "icon": "bi bi-people",
                                    "available": true,
                                    "link": "/user/sub-users"
                                }, {
                                    "text": "Manage Tenants",
                                    "icon": "bi bi-person-add",
                                    "available": true,
                                    "link": "/user/manage-tenants"
                                }
                            ]
                        }, {
                            "header": "Properties",
                            "items": [
                                {
                                    "text": "Manage Stalls",
                                    "icon": "bx bx-store",
                                    "available": true,
                                    "link": "/user/manage-stalls"
                                }
                            ]
                        }, {
                            "header": "Appointments",
                            "items": [
                                {
                                    "text": "Stall Appointments",
                                    "icon": "bx bx-calendar",
                                    "available": true,
                                    "link": "",
                                    "submenu": [
                                        {
                                            "text": "All Appointments",
                                            "icon": "bi bi-calendar3",
                                            "available": true,
                                            "link": "/user/stall-all-appointments"
                                        }, {
                                            "text": "Approved Appointment",
                                            "icon": "bx bx-check-circle",
                                            "available": true,
                                            "link": "/user/stall-approved-appointment"
                                        }, {
                                            "text": "Cancelled Appointment",
                                            "icon": "bx bx-x-circle",
                                            "available": true,
                                            "link": "/user/stall-cancelled-appointment"
                                        }, {
                                            "text": "Request Appointment",
                                            "icon": "bx bx-calendar-check",
                                            "available": true,
                                            "link": "/user/stall-request-appointment"
                                        }
                                    ]
                                }
                            ]
                        }, {
                            "header": "Complaints",
                            "items": [
                                {
                                    "text": "Manage Complaints",
                                    "icon": "bi bi-exclamation-diamond",
                                    "available": true,
                                    "link": "",
                                    "submenu": [
                                        {
                                            "text": "All Complaints",
                                            "icon": "bx bx-alarm-exclamation",
                                            "available": true,
                                            "link": "/user/all-complaints"
                                        }, {
                                            "text": "Resolved Complaints",
                                            "icon": "fa-solid fa-clipboard-check",
                                            "available": true,
                                            "link": "/user/resolved-complaints"
                                        }, {
                                            "text": "In Process Complaints",
                                            "icon": "bx bx-loader-circle",
                                            "available": true,
                                            "link": "/user/in-process-complaints"
                                        }, {
                                            "text": "Not Processed Complaints",
                                            "icon": "bx bx-time",
                                            "available": true,
                                            "link": "/user/not-process-complaints"
                                        }
                                    ]
                                }, {
                                    "text": "Category",
                                    "icon": "bx bx-category",
                                    "available": true,
                                    "link": "",
                                    "submenu": [
                                        {
                                            "text": "Add Category",
                                            "icon": "bx bx-book-add",
                                            "available": true,
                                            "link": "/user/add-category"
                                        }, {
                                            "text": "Manage Category",
                                            "icon": "bx bx-cog",
                                            "available": true,
                                            "link": "/user/manage-category"
                                        }
                                    ]
                                }, {
                                    "text": "Sub-Category",
                                    "icon": "bx bx-category-alt",
                                    "available": true,
                                    "link": "",
                                    "submenu": [
                                        {
                                            "text": "Add Sub-Category",
                                            "icon": "bx bx-duplicate",
                                            "available": true,
                                            "link": "/user/add-sub-category"
                                        }, {
                                            "text": "Manage Sub-Category",
                                            "icon": "fa-solid fa-list-check",
                                            "available": true,
                                            "link": "/user/manage-sub-category"
                                        }
                                    ]
                                }
                            ]
                        }, {
                            "header": "Discover",
                            "items": [
                                {
                                    "text": "Add Discover",
                                    "icon": "bx bx-comment-add",
                                    "available": true,
                                    "link": "/user/add-discover"
                                }, {
                                    "text": "Manage Discover",
                                    "icon": "bi bi-newspaper",
                                    "available": true,
                                    "link": "/user/manage-discover"
                                }
                            ]
                        }, {
                            "header": "Report",
                            "items": [
                                {
                                    "text": "Complaint List",
                                    "icon": "bx bx-list-ul",
                                    "available": true,
                                    "link": "/user/detailed-complaint-list-report"
                                }, {
                                    "text": "Complaint Summary",
                                    "icon": "bx bxs-report",
                                    "available": true,
                                    "link": "/user/complaint-summary-report"
                                }
                            ]
                        }
                    ]
                }
            } else {
                return { Data: [] }
            }
        }
        )
}