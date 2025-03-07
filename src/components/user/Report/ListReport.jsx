import React from 'react';

const ListReport = () => {
    // Data for the table
    const tableData = [
        {
            id: 1,
            project: { name: "Sketch Project", icon: "bx bxl-sketch", color: "text-warning" },
            client: "Ronnie Shane",
            users: ["2.png", "3.png", "4.png"],
            status: { label: "Active", color: "bg-label-primary" },
            actions: ["Edit", "Delete"]
        },
        {
            id: 2,
            project: { name: "React Project", icon: "bx bxl-react", color: "text-info" },
            client: "Barry Hunter",
            users: ["2.png", "3.png", "4.png"],
            status: { label: "Completed", color: "bg-label-success" },
            actions: ["Edit", "Delete"]
        },
        {
            id: 3,
            project: { name: "Angular Project", icon: "bx bxl-angular", color: "text-danger" },
            client: "Albert Cook",
            users: ["2.png", "3.png", "4.png"],
            status: { label: "Active", color: "bg-label-primary" },
            actions: ["Edit", "Delete"]
        },
        {
            id: 4,
            project: { name: "VueJs Project", icon: "bx bxl-vuejs", color: "text-success" },
            client: "Trevor Baker",
            users: ["2.png", "3.png", "4.png"],
            status: { label: "Scheduled", color: "bg-label-info" },
            actions: ["Edit", "Delete"]
        },
        {
            id: 5,
            project: { name: "Bootstrap Project", icon: "bx bxl-bootstrap", color: "text-primary" },
            client: "Jerry Milton",
            users: ["2.png", "3.png", "4.png"],
            status: { label: "Pending", color: "bg-label-warning" },
            actions: ["Edit", "Delete"]
        },
        {
            id: 6,
            project: { name: "Sketch Project", icon: "bx bxl-sketch", color: "text-warning" },
            client: "Sarah Banks",
            users: ["2.png", "3.png", "4.png"],
            status: { label: "Active", color: "bg-label-primary" },
            actions: ["Edit", "Delete"]
        },
        {
            id: 7,
            project: { name: "React Custom", icon: "bx bxl-react", color: "text-info" },
            client: "Ted Richer",
            users: ["2.png", "3.png", "4.png"],
            status: { label: "Scheduled", color: "bg-label-info" },
            actions: ["Edit", "Delete"]
        },
        {
            id: 8,
            project: { name: "Latest Bootstrap", icon: "bx bxl-bootstrap", color: "text-primary" },
            client: "Perry Parker",
            users: ["2.png", "3.png", "4.png"],
            status: { label: "Pending", color: "bg-label-warning" },
            actions: ["Edit", "Delete"]
        },
        {
            id: 9,
            project: { name: "Angular UI", icon: "bx bxl-angular", color: "text-danger" },
            client: "Ana Bell",
            users: ["2.png", "3.png", "4.png"],
            status: { label: "Completed", color: "bg-label-success" },
            actions: ["Edit", "Delete"]
        },
        {
            id: 10,
            project: { name: "Bootstrap UI", icon: "bx bxl-bootstrap", color: "text-primary" },
            client: "Jerry Milton",
            users: ["2.png", "3.png", "4.png"],
            status: { label: "Completed", color: "bg-label-success" },
            actions: ["Edit", "Delete"]
        }
    ];

    return (
        <div className="card">
            <h5 className="card-header">Contextual Classes</h5>
            <div className="table-responsive text-nowrap">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Project</th>
                            <th>Client</th>
                            <th>Users</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="table-border-bottom-0">
                        {tableData.map((item) => (
                            <tr key={item.id} className={`table-${item.status.color.replace('bg-label-', '')}`}>
                                <td>
                                    <i className={`icon-base ${item.project.icon} icon-md ${item.project.color} me-4`}></i>
                                    <span>{item.project.name}</span>
                                </td>
                                <td>{item.client}</td>
                                <td>
                                    <ul className="list-unstyled m-0 avatar-group d-flex align-items-center">
                                        {item.users.map((user, index) => (
                                            <li key={index} data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" className="avatar avatar-xs pull-up" aria-label="Lilian Fuller" data-bs-original-title="Lilian Fuller">
                                                <img src={`../assets/img/avatars/${user}`} alt="Avatar" className="rounded-circle" />
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td>
                                    <span className={`badge ${item.status.color} me-1`}>{item.status.label}</span>
                                </td>
                                <td>
                                    <div className="dropdown">
                                        <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                            <i className="icon-base bx bx-dots-vertical-rounded"></i>
                                        </button>
                                        <div className="dropdown-menu">
                                            {item.actions.map((action, index) => (
                                                <a key={index} className="dropdown-item" href="javascript:void(0);">
                                                    <i className={`icon-base bx bx-${action.toLowerCase()} me-1`}></i> {action}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListReport;