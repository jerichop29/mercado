import { useLocation } from "react-router-dom";

export default function StallAppointmentsTable({ StallAppointments }) {
    const location = useLocation();

    const getTitle = () => {
        switch (location.pathname) {
            case "/user/stall-approved-appointment":
                return "Approved Appointment";
            case "/user/stall-request-appointment":
                return "Request Appointment";
            case "/user/stall-cancelled-appointment":
                return "Cancelled Appointment";
            default:
                return null; // No title for other paths
        }
    };

    const title = getTitle(); 














    
    return (
        <>
            <div className="card">
                <div className="card-header border-bottom">
                    {title && <h5 className="card-title mb-0">{title}</h5>}
                </div>
                <div className="card-datatable">
                    <div id="DataTables_Table_0_wrapper" className="dt-container dt-bootstrap5 dt-empty-footer">
                        <div className="row mx-3 my-0 justify-content-between">
                            <div className="d-md-flex justify-content-between align-items-center dt-layout-start col-md-auto me-auto mt-0">
                                <div className="dt-length mb-md-6 mb-0">
                                    <select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0" className="form-select ms-0" id="dt-length-0">
                                        <option value="10">10</option>
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                    </select><label htmlFor="dt-length-0"></label>
                                </div>
                            </div>

                            <div className="d-md-flex align-items-center dt-layout-end col-md-auto ms-auto d-flex gap-md-4 justify-content-md-between justify-content-center gap-4 flex-wrap mt-0">
                                <div className="dt-search mb-md-6 mb-2">
                                    <input type="search" className="form-control" id="dt-search-0" placeholder="Search Appointment" aria-controls="DataTables_Table_0" />
                                    <label htmlFor="dt-search-0"></label>
                                </div>
                            </div>
                        </div>

                        <div className="justify-content-between dt-layout-table">
                            <div className="d-md-flex justify-content-between align-items-center dt-layout-full table-responsive">
                                <table className="datatables-users table border-top dataTable dtr-column collapsed" id="DataTables_Table_0" aria-describedby="DataTables_Table_0_info" style={{ width: '100%' }}>
                                    <colgroup>
                                        <col data-dt-column="1" style={{ width: '50px' }} />
                                        <col data-dt-column="2" style={{ width: '50px' }} />
                                        <col data-dt-column="3" style={{ width: '150px' }} />
                                        <col data-dt-column="4" style={{ width: '300px' }} /> 
                                        <col data-dt-column="6" style={{ width: '300px' }} />
                                        <col data-dt-column="7" style={{ width: '100px' }} />
                                        <col data-dt-column="8" style={{ width: '150px' }} />
                                        <col data-dt-column="9" style={{ width: '150px' }} />
                                        <col data-dt-column="10" style={{ width: '150px' }} />
                                        <col data-dt-column="1" style={{ width: '150px' }} />
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th data-dt-column="0" className="control dt-orderable-none dtr-hidden" style={{ display: 'none' }}></th>
                                            <th data-dt-column="1" className="dt-select dt-orderable-none">
                                                <input className="form-check-input" type="checkbox" aria-label="Select all rows" />
                                            </th>
                                            <th data-dt-column="2" className="dt-orderable-asc dt-orderable-desc dt-ordering-desc">
                                                <span className="dt-column-title" role="button">ID</span>
                                            </th>
                                            <th data-dt-column="3" className="dt-orderable-asc dt-orderable-desc">
                                                <span className="dt-column-title" role="button">Full Name</span>
                                            </th>
                                            <th data-dt-column="4" className="dt-orderable-asc dt-orderable-desc">
                                                <span className="dt-column-title" role="button">Email</span>
                                            </th>
                                            <th data-dt-column="5" className="dt-orderable-asc dt-orderable-desc">
                                                <span className="dt-column-title" role="button">Contact</span>
                                            </th>
                                            <th data-dt-column="6" className="dt-orderable-asc dt-orderable-desc">
                                                <span className="dt-column-title" role="button">Proof of Identification</span>
                                            </th>
                                            <th data-dt-column="7" className="dt-orderable-asc dt-orderable-desc">
                                                <span className="dt-column-title" role="button">Requested Date</span>
                                            </th>
                                            <th data-dt-column="8" className="dt-orderable-asc dt-orderable-desc">
                                                <span className="dt-column-title" role="button">Appointment Start</span>
                                            </th>
                                            <th data-dt-column="9" className="dt-orderable-asc dt-orderable-desc">
                                                <span className="dt-column-title" role="button">Appointment End</span>
                                            </th>
                                            <th data-dt-column="10" className="dt-orderable-asc dt-orderable-desc">
                                                <span className="dt-column-title" role="button">Status</span>
                                            </th>
                                            <th data-dt-column="11" className="dt-orderable-none">
                                                <span className="dt-column-title">Actions</span>
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {StallAppointments && StallAppointments.map((StallAppointments, index) => (
                                            <tr key={index}>
                                                <td className="control dtr-hidden" tabIndex="0" style={{ display: 'none' }}></td>
                                                <td className="dt-select">
                                                    <input aria-label="Select row" className="form-check-input" type="checkbox" />
                                                </td>
                                                <td>
                                                    <span className="fw-medium">{StallAppointments.id}</span>
                                                </td>
                                                <td>
                                                    <span className="fw-medium">
                                                        {StallAppointments.fullName}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="fw-medium">
                                                        {StallAppointments.email}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="fw-medium">
                                                    <i className="icon-base bx bx-phone-call text-primary me-2"></i>{StallAppointments.contact}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="fw-medium">
                                                        <img src={StallAppointments.proofOfIdentity} alt="Proof of Identity" width="100" height="70" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="fw-medium">
                                                    <i className="icon-base fa-solid fa-calendar-day text-info me-2"></i>{StallAppointments.requestedAppointment}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="fw-medium">
                                                    <i className="icon-base fa-solid fa-calendar-check text-success me-2"></i>{StallAppointments.startAppointment}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="fw-medium">
                                                    <i className="icon-base fa-solid fa-calendar-xmark text-danger me-2"></i>{StallAppointments.endAppointment}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className={`badge ${StallAppointments.status === 'Approved' ? 'bg-label-success' : StallAppointments.status === 'Cancelled' ? 'bg-label-danger' : 'bg-label-primary'}`}>
                                                        {StallAppointments.status}
                                                    </span>
                                                </td>

                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <a href="" className="btn btn-icon delete-record">
                                                            <i className="icon-base bx bx-trash icon-md icon-lg"></i>
                                                        </a>
                                                        <a href="app-user-view-account.html" className="btn btn-icon">
                                                            <i className="icon-base bx bx-show icon-md icon-lg"></i>
                                                        </a>
                                                        <a href="app-user-edit-account.html" className="btn btn-icon">
                                                            <i className="icon-base bx bx-edit icon-md icon-lg"></i>
                                                        </a>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot></tfoot>
                                </table>
                            </div>
                        </div>

                        <div className="row mx-3 justify-content-between">
                            <div className="d-md-flex justify-content-between align-items-center dt-layout-start col-md-auto me-auto mt-0">
                                <div className="dt-info" aria-live="polite" id="DataTables_Table_0_info" role="status">
                                    Showing 1 to 10 of {StallAppointments.length} entries
                                </div>
                            </div>
                            <div className="d-md-flex align-items-center dt-layout-end col-md-auto ms-auto d-flex gap-md-4 justify-content-md-between justify-content-center gap-4 flex-wrap mt-0">
                                <div className="dt-paging">
                                    <nav aria-label="pagination">
                                        <ul className="pagination">
                                            <li className="dt-paging-button page-item disabled">
                                                <button className="page-link previous" role="link" type="button" aria-controls="DataTables_Table_0" aria-disabled="true" aria-label="Previous" data-dt-idx="previous" tabIndex="-1">
                                                    <i className="icon-base bx bx-chevron-left icon-18px"></i>
                                                </button>
                                            </li>
                                            <li className="dt-paging-button page-item active">
                                                <button className="page-link" role="link" type="button" aria-controls="DataTables_Table_0" aria-current="page" data-dt-idx="0">1</button>
                                            </li>
                                            <li className="dt-paging-button page-item">
                                                <button className="page-link" role="link" type="button" aria-controls="DataTables_Table_0" data-dt-idx="1">2</button>
                                            </li>
                                            <li className="dt-paging-button page-item">
                                                <button className="page-link" role="link" type="button" aria-controls="DataTables_Table_0" data-dt-idx="2">3</button>
                                            </li>
                                            <li className="dt-paging-button page-item">
                                                <button className="page-link" role="link" type="button" aria-controls="DataTables_Table_0" data-dt-idx="3">4</button>
                                            </li>
                                            <li className="dt-paging-button page-item">
                                                <button className="page-link" role="link" type="button" aria-controls="DataTables_Table_0" data-dt-idx="4">5</button>
                                            </li>
                                            <li className="dt-paging-button page-item">
                                                <button className="page-link next" role="link" type="button" aria-controls="DataTables_Table_0" aria-label="Next" data-dt-idx="next">
                                                    <i className="icon-base bx bx-chevron-right icon-18px"></i>
                                                </button>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}