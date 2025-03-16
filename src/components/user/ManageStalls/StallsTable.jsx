import React,{useState} from 'react';
import { useData } from '../../../../backend/src/views/useData';
import EditStall from './EditStall';

const StallsTable = ({ search }) => {
  const [filter,setFilter] = useState('');
  const [ChangeFilter,setChangeFilter] = useState('');
  const {stall} = useData(filter,ChangeFilter);
  const [displayData , setdisplayData] = useState(10);
  const [currentPage, setCurrentPage] = useState(1); 
  const [selectedStall, setSelectedStall] = useState({});
  const totalPages = Math.ceil(stall.length / displayData);
  const startIndex = (currentPage - 1) * displayData;
  const endIndex = startIndex + displayData;
  const displayedUsers = stall.slice(startIndex, endIndex);
  

const handleChange = (e) => {
  setChangeFilter(e.target.value);
  setFilter((prev) => (prev ? prev + ' ' : ' ')); // Add a space if there's a value, otherwise set to space
  setCurrentPage(1); // Reset to the first page when the filter changes
  setTimeout(() => {
      setFilter((prev) => (prev ? prev.trim() : '')); // Remove the extra space after delay
  }, 100);
};

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleEditClick = (e, stall) => {
    e.preventDefault();
    setSelectedStall({
        Owner_Id:stall.Owner_Id || "",
        StallCode: stall.StallCode || "",
        Type_Id: stall.Type_Id || "",
        BuildingName: stall.BuildingName || "",
        OwnerFname: stall.OwnerFname || "",
        OwnerMname: stall.OwnerMname || "",
        OwnerLname: stall.OwnerLname || "",
        Status: stall.Status_Id || "",
        Date_Start: stall.Date_Start || "",
        due: stall.due || "",
        Stall_Id: stall.Stall_Id || "",
        // Add any other fields you need to edit
    });

    // Show the AddTenant component for editing
    const offcanvasElement = document.getElementById('offcanvasEditStall'); // Adjust this ID if necessary
    const offcanvas = new bootstrap.Offcanvas(offcanvasElement);
    offcanvas.show();
  };


  const handleCloseEdit = () => {
    setSelectedStall(null);
  };

  const handleSubmitSuccess = (updatedStall) => {
    setFilter((prev) => (prev
        ? prev + ' '
        : ' ')); // Add a space if there's a value, otherwise set to space

    setTimeout(() => {
        setFilter((prev) => (prev
            ? prev.trim()
            : '')); // Remove the extra space after delay
    }, 100);
    handleCloseEdit();
  };

    return (
        <div className="card">
            <div className="card-header border-bottom">
                <h5 className="card-title mb-0">Search Filters</h5>
                <div className="d-flex justify-content-flex-start align-items-center row pt-4 gap-md-0 g-6">
                    {/* Loop through search filters */}
                    {search.map((filter, index) => (
                        <div key={index} className="col-md-4 user_role">
                            <select id={`filter-${index}`} className="form-select text-capitalize"value={ChangeFilter} onChange={handleChange}>
                                <option value="">{filter.title}</option>
                                {filter.options.map((option, idx) => (
                                    <option key={idx} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>
            </div>

            <div className="card-datatable">
                <div id="DataTables_Table_0_wrapper" className="dt-container dt-bootstrap5 dt-empty-footer">
                    <div className="row mx-3 my-0 justify-content-between">
                        <div className="d-md-flex justify-content-between align-items-center dt-layout-start col-md-auto me-auto mt-0">
                            <div className="dt-length mb-md-6 mb-0">
                                <select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0" className="form-select ms-0" id="dt-length-0" value={displayData} onChange={(e)=>{setdisplayData(e.target.value)}}>
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select><label htmlFor="dt-length-0"></label>
                            </div>
                        </div>

                        <div className="d-md-flex align-items-center dt-layout-end col-md-auto ms-auto d-flex gap-md-4 justify-content-md-between justify-content-center gap-4 flex-wrap mt-0">
                            <div className="dt-search mb-md-6 mb-2">
                                <input type="search" className="form-control" id="dt-search-0" placeholder="Search Stall" aria-controls="DataTables_Table_0" onChange={(e) =>{setFilter(e.target.value)}} />
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
                                    <col data-dt-column="3" style={{ width: '50px' }} />
                                    <col data-dt-column="4" style={{ width: '80px' }} />
                                    <col data-dt-column="5" style={{ width: '120px' }} />
                                    <col data-dt-column="6" style={{ width: '20px' }} />
                                    <col data-dt-column="7" style={{ width: '100px' }} />
                                    <col data-dt-column="8" style={{ width: '120px' }} />
                                    <col data-dt-column="9" style={{ width: '120px' }} />
                                    <col data-dt-column="10" style={{ width: '80px' }} />
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
                                            <span className="dt-column-title" role="button">Stall Code</span>
                                        </th>
                                        <th data-dt-column="4" className="dt-orderable-asc dt-orderable-desc">
                                            <span className="dt-column-title" role="button">Type</span>
                                        </th>
                                        <th data-dt-column="5" className="dt-orderable-asc dt-orderable-desc">
                                            <span className="dt-column-title" role="button">Building</span>
                                        </th>
                                        <th data-dt-column="6" className="dt-orderable-asc dt-orderable-desc">
                                            <span className="dt-column-title" role="button">Owner</span>
                                        </th>
                                        <th data-dt-column="7" className="dt-orderable-asc dt-orderable-desc">
                                            <span className="dt-column-title" role="button">Status</span>
                                        </th>
                                        <th data-dt-column="8" className="dt-orderable-asc dt-orderable-desc">
                                            <span className="dt-column-title" role="button">Start Date</span>
                                        </th>
                                        <th data-dt-column="9" className="dt-orderable-asc dt-orderable-desc">
                                            <span className="dt-column-title" role="button">Due Date</span>
                                        </th>
                                        <th data-dt-column="10" className="dt-orderable-none">
                                            <span className="dt-column-title">Actions</span>
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {displayedUsers.map((stalls, index) => (
                                        <tr key={index}>
                                            <td className="control dtr-hidden" tabIndex="0" style={{ display: 'none' }}></td>
                                            <td className="dt-select">
                                                <input aria-label="Select row" className="form-check-input" type="checkbox" />
                                            </td>
                                            <td>
                                                <span className="fw-medium">{stalls.Stall_Id}</span>
                                            </td>
                                            <td>{stalls.StallCode}</td>
                                            <td>
                                                <span className="text-truncate d-flex align-items-center text-heading">
                                                    {stalls.TypeName === "Fish" && (
                                                        <i className="icon-base fa-solid fa-fish text-primary me-2"></i>
                                                    )}
                                                    {stalls.TypeName === "Meat" && (
                                                        <i className="icon-base fa-solid fa-drumstick-bite text-danger me-2"></i>
                                                    )}
                                                    {stalls.TypeName === "Vegetables" && (
                                                        <i className="icon-base bx bxs-leaf text-success me-2"></i>
                                                    )}
                                                    {stalls.TypeName === "Variety" && (
                                                        <i className="icon-base fa-solid fa-basket-shopping text-info me-2"></i>
                                                    )}
                                                    {stalls.TypeName === "Other" && (
                                                        <i className="icon-base fa-solid fa-pizza-slice text-warning me-2"></i>
                                                    )}
                                                    {stalls.TypeName === "None"? "": stalls.TypeName}
                                                </span>
                                            </td>
                                            <td>
                                                <span className="text-truncate d-flex align-items-center text-heading">
                                                    <i className="icon-base fa-solid fa-building text-primary me-2"></i>{stalls.BuildingName}
                                                </span>
                                            </td>
                                            <td className="sorting_1">
                                                <div className="d-flex justify-content-start align-items-center user-name">
                                                    <div className="avatar-wrapper">
                                                        <div className="avatar avatar-sm me-4">
                                                            <img src={stalls.avatar || "https://cdn-icons-png.flaticon.com/512/9203/9203764.png"} alt="Avatar" className="rounded-circle" />
                                                        </div>
                                                    </div>
                                                    <div className="d-flex flex-column">
                                                        <a href="#" className="text-heading text-truncate">
                                                            <span className="fw-medium">{stalls.OwnerFname? stalls.OwnerFname +" "+ stalls.OwnerMname +" "+ stalls.OwnerLname:" "}</span>
                                                        </a>
                                                        <small>{stalls.Email}</small>
                                                    </div>
                                                </div>
                                            </td>
                                            <td  >
                                                <span className={`badge ${stalls.Status === 'Available'
                                                    ? 'bg-label-success'
                                                    : stalls.Status === 'Occupied' || stalls.Status === 'Unavailable'
                                                        ? 'bg-label-danger' :
                                                        stalls.Status === 'Reserved' ? 'bg-label-warning'
                                                            : 'bg-label-primary'
                                                    }`} text-capitalized="">
                                                    {stalls.Status}
                                                </span>
                                            </td>
                                            <td>    
                                            {stalls.Date_Start &&(<span className="text-truncate d-flex align-items-center text-heading">
                                                    <i className="icon-base bi bi-calendar-check-fill text-success me-2"></i>{stalls.Date_Start}
                                                </span>)}
                                            </td>
                                            <td>
                                                {stalls.due &&(<span className="text-truncate d-flex align-items-center text-heading">
                                                    <i className="icon-base bi bi-calendar-x text-danger me-2"></i>{stalls.due}
                                                </span>)}
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    
                                                    <a href="app-user-view-account.html" className="btn btn-icon">
                                                        <i className="icon-base bx bx-show icon-md icon-lg"></i>
                                                    </a>
                                                    <button 
                                                        className="btn btn-icon" 
                                                        onClick={(e) => handleEditClick(e, stalls)}
                                                    >
                                                        <i className="icon-base bx bx-edit icon-md icon-lg"></i>
                                                    </button>
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
                              Showing {startIndex + 1} to {Math.min(endIndex, stall.length)} of {stall.length} entries
                            </div>
                        </div>
                        <div className="d-md-flex align-items-center dt-layout-end col-md-auto ms-auto d-flex gap-md-4 justify-content-md-between justify-content-center gap-4 flex-wrap mt-0">
                            <div className="dt-paging">
                                <nav aria-label="pagination">
                                    <ul className="pagination">
                                        <li className={`dt-paging-button page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                            <button
                                                className="page-link previous"
                                                onClick={() => handlePageChange(currentPage - 1)}
                                            >
                                                <i className="icon-base bx bx-chevron-left icon-18px"></i>
                                            </button>
                                        </li>

                                        {/* Limit the number of page buttons to 5 */}
                                        {[...Array(Math.min(5, totalPages))].map((_, index) => {
                                            const pageNumber = currentPage + index - 2; // Center the current page in the range
                                            if (pageNumber < 1 || pageNumber > totalPages) return null; // Skip out-of-bounds pages
                                            return (
                                                <li key={pageNumber} className={`dt-paging-button page-item ${currentPage === pageNumber ? "active" : ""}`}>
                                                    <button
                                                        className="page-link"
                                                        onClick={() => handlePageChange(pageNumber)}
                                                    >
                                                        {pageNumber}
                                                    </button>
                                                </li>
                                            );
                                        })}

                                        <li className={`dt-paging-button page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                                            <button
                                                className="page-link next"
                                                onClick={() => handlePageChange(currentPage + 1)}
                                            >
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
                <EditStall 
                    stall={selectedStall} 
                    onClose={() => {
                        setSelectedStall(null);
                    }}
                    onSubmitSuccess={handleSubmitSuccess} 
                />
        </div>
    );
};

export default StallsTable;
