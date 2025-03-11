import React from 'react';
import * as XLSX from 'xlsx'; // For Excel generation

const ListReport = ({ startDate, endDate }) => {
    // Complaint data
    const complaintData = [
        {
            id: 1,
            complainant: "John Doe",
            category: "Technical",
            subCategory: "Software Issue",
            message: "Unable to login to the system.",
            image: "image1.png",
            status: "Resolved"
        },
        {
            id: 2,
            complainant: "Jane Smith",
            category: "Billing",
            subCategory: "Overcharge",
            message: "Charged twice for the same service.",
            image: "image2.png",
            status: "In-Process"
        },
        {
            id: 3,
            complainant: "Alice Johnson",
            category: "Support",
            subCategory: "Hardware Issue",
            message: "Laptop not turning on.",
            image: "image3.png",
            status: "Not Processed"
        },
        {
            id: 4,
            complainant: "Bob Brown",
            category: "Feedback",
            subCategory: "Service Feedback",
            message: "Great service, but room for improvement.",
            image: "image4.png",
            status: "Resolved"
        },
        {
            id: 5,
            complainant: "Charlie Davis",
            category: "Technical",
            subCategory: "Network Issue",
            message: "Internet connection is unstable.",
            image: "image5.png",
            status: "In-Process"
        }
    ];
    

    // Function to determine status color
    const getStatusColor = (status) => {
        switch (status) {
            case "Resolved":
                return "bg-label-success";
            case "In-Process":
                return "bg-label-warning";
            case "Not Processed":
                return "bg-label-danger";
            default:
                return "bg-label-secondary";
        }
    };

    // Generate Excel
    const generateExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(complaintData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Complaint Report');
        XLSX.writeFile(workbook, `Complaint_Report_${startDate}_to_${endDate}.xlsx`);
    };

    // Copy to Clipboard
    const copyToClipboard = () => {
        const tableData = complaintData.map(item => ({
            ID: item.id,
            Complainant: item.complainant,
            Category: item.category,
            'Sub-Category': item.subCategory,
            Message: item.message,
            Status: item.status
        }));
        const text = JSON.stringify(tableData, null, 2);
        navigator.clipboard.writeText(text).then(() => {
            alert('Data copied to clipboard!');
        });
    };

    return (
        <div className="card">
            <h5 className="card-header">
                Complaint Report from {startDate} to {endDate}
                <div className="float-end">
                    <button className="btn btn-sm btn-outline-secondary me-2" onClick={generateExcel}>
                        <i className="bx bxs-file-excel"></i> Download Excel
                    </button>
                    <button className="btn btn-sm btn-outline-secondary" onClick={copyToClipboard}>
                        <i className="bx bxs-copy"></i> Copy
                    </button>
                </div>
            </h5>
            <div className="table-responsive text-nowrap">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Complainant</th>
                            <th>Category</th>
                            <th>Sub-Category</th>
                            <th>Message</th>
                            <th>Image</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody className="table-border-bottom-0">
                        {complaintData.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.complainant}</td>
                                <td>{item.category}</td>
                                <td>{item.subCategory}</td>
                                <td>{item.message}</td>
                                <td>
                                    {item.image && (
                                        <img
                                            src={`../assets/img/${item.image}`}
                                            alt="Complaint"
                                            className="rounded-circle"
                                            width="50"
                                            height="50"
                                        />
                                    )}
                                </td>
                                <td>
                                    <span className={`badge ${getStatusColor(item.status)} me-1`}>
                                        {item.status}
                                    </span>
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