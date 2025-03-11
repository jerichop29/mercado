import * as XLSX from 'xlsx';

export default function SummaryReport() {
    // Example data for the Excel file
    const complaintData = [
        { "Total Complaints": 23, "Not Process Yet": 10, "In Process": 5, "Resolved Complaints": 8 }
    ];

    // Example dates for the filename
    const startDate = "2023-10-01"; // Replace with your actual start date
    const endDate = "2023-10-31";   // Replace with your actual end date

    // Generate Excel
    const generateExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(complaintData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Complaint Report');
        XLSX.writeFile(workbook, `Complaint_Report_${startDate}_to_${endDate}.xlsx`);
    };

    return (
        <>
            <div className="card">
                <h5 className="card-header">
                    Summary Report from {startDate} to {endDate}
                    <div className="float-end">
                        <button className="btn btn-sm btn-outline-secondary me-2" onClick={generateExcel}>
                            <i className="bx bxs-file-excel"></i> Download Excel
                        </button>
                    </div>
                </h5>
                <div className="card-body">
                    <div className="table-responsive text-nowrap">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Total Complaints</th>
                                    <th>Not Process Yet</th>
                                    <th>In Process</th>
                                    <th>Resolved Complaints</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><i className="fa-solid fa-file-circle-exclamation icon-md text-info me-4"></i> <span>23</span></td>
                                    <td><i className="fa-solid fa-file-circle-exclamation icon-md text-danger me-4"></i> <span>10</span></td>
                                    <td><i className="fa-solid fa-file-circle-exclamation icon-md text-warning me-4"></i> <span>5</span></td>
                                    <td><i className="fa-solid fa-file-circle-exclamation icon-md text-success me-4"></i> <span>8</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}