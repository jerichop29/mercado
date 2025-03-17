import React,{ useState } from 'react';
import { useData } from '../../../../backend/src/views/useData';
import { Confirm } from '../../main/DialogueBox/DialogueBox';
import { useDeleteDiscover } from '../../../../backend/src/forms/templates/Discover/deletediscover';
import { useNavigate } from 'react-router-dom';
export default function DiscoverTable() {
    const navigate = useNavigate();
    const [filter,setFilter] = useState('');
  const [displayData , setdisplayData] = useState(10);
  const [currentPage, setCurrentPage] = useState(1); 
  const { discover  } = useData(filter);
  const totalPages = Math.ceil(discover.length / displayData);
  const startIndex = (currentPage - 1) * displayData;
  const endIndex = startIndex + displayData;
  const displayedDiscover = discover
  const [selectedDiscover, setSelectedDiscover] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const { handleDelete, message } = useDeleteDiscover(() => {
    setFilter((prev) => prev + ' ');
    setTimeout(() => {
      setFilter((prev) => (prev ? prev.trim() : '')); 
  }, 100);
  });

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleDeleteClick = async (e, discover) => {
    console.log("Selected Disover for Deletion:",  discover);
    e.preventDefault();

    const result = await Confirm("Are you sure you want to proceed?", "Confirmation");
    if (result) {
        await handleDelete(discover);
    } else {
    }
  };
  const handleSelectDiscover = (discover) => {
    setSelectedDiscover((prevSelected) => {
      if (prevSelected.some(selectedDiscover => selectedDiscover.discover_Id === discover.discover_Id)) {
        return prevSelected.filter(selectedDiscover => selectedDiscover.discover_Id !==  discover.discover_Id); // Deselect user
      } else {
        return [...prevSelected, discover]; // Select user
      }
    });
  };

  const handleDeleteSelected = async () => {
    const result = await Confirm("Are you sure you want to proceed?", "Confirmation");
    if (result) {
        for (const user of selectedDiscover) {
          await handleDelete(user); // Assuming handleDelete can take the entire user object
        }
        setSelectedDiscover([]); // Clear selection after deletion
    } else {
    }
  };

  const handleSelectAllChange = (event) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
    if (isChecked) {
      setSelectedDiscover(displayedDiscover);
    } else {
     setSelectedDiscover([]);
    }
  };

  const handleEditClick = (e, discover) => {
    e.preventDefault();
    
    // Prepare the data for editing
    const editData = {
        Title: discover.Title || "",
        image: discover.image || "",
        Activity: discover.Title || "",
        Description: discover.Description || "",
        Date_Start: discover.Date_Start || "",
        Date_End: discover.Date_End || "",
        Link: discover.Link || "",
        id: discover.discover_Id
    };
    
    // Navigate to the AddSubCategory component with the edit data
    navigate('/user/add-discover', { 
        state: { 
            isEditing: true,
            editData: editData
        } 
    });
};


    return (
        <>
            <div className="card">
                <div className="card-header border-bottom">
                    <h5 className="card-title mb-0">Discover Announcements</h5>
                </div>

                <div className="card-datatable">
                    <div id="DataTables_Table_0_wrapper" className="dt-container dt-bootstrap5 dt-empty-footer">
                        <div className="row mx-3 my-0 justify-content-between">
                            <div className="d-md-flex justify-content-between align-items-center dt-layout-start col-md-auto me-auto mt-0">
                                <div className="dt-length mb-md-6 mb-0">
                                    <select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0" className="form-select ms-0" id="dt-length-0"value={displayData} onChange={(e)=>{setdisplayData(e.target.value)}}>
                                        <option value="10">10</option>
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                    </select><label htmlFor="dt-length-0"></label>
                                </div>
                            </div>

                            <div className="d-md-flex align-items-center dt-layout-end col-md-auto ms-auto d-flex gap-md-4 justify-content-md-between justify-content-center gap-4 flex-wrap mt-0">
                            {selectedDiscover.length > 0 && (
                                <button className="btn btn-danger" onClick={handleDeleteSelected}>
                                    Delete Selected
                                </button>
                                )}
                                <div className="dt-search mb-md-6 mb-2">
                                    <input type="search" className="form-control" id="dt-search-0" placeholder="Search Discover" aria-controls="DataTables_Table_0" value={filter} onChange={(e) => setFilter(e.target.value)}/>
                                    <label htmlFor="dt-search-0"></label>
                                </div>
                                <div className="dt-buttons btn-group flex-wrap d-flex gap-4 mb-md-0 mb-6">               
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
                                        <col data-dt-column="4" style={{ width: '500px' }} />
                                        <col data-dt-column="5" style={{ width: '150px' }} />
                                        <col data-dt-column="6" style={{ width: '150px' }} />
                                        <col data-dt-column="7" style={{ width: '150px' }} />
                                        <col data-dt-column="8" style={{ width: '50px' }} />
                                        <col data-dt-column="9" style={{ width: '150px' }} />
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th data-dt-column="0" className="control dt-orderable-none dtr-hidden" style={{ display: 'none' }}></th>
                                            <th data-dt-column="1" className="dt-select dt-orderable-none">
                                            <input 
                                                    className="form-check-input" 
                                                    type="checkbox" 
                                                    aria-label="Select all rows" 
                                                    checked={selectAll}
                                                    onChange={handleSelectAllChange}
                                                />
                                            </th>
                                            <th data-dt-column="2" className="dt-orderable-asc dt-orderable-desc dt-ordering-desc">
                                                <span className="dt-column-title" role="button">ID</span>
                                            </th>
                                            <th data-dt-column="3" className="dt-orderable-asc dt-orderable-desc">
                                                <span className="dt-column-title" role="button">Title</span>
                                            </th>
                                            <th data-dt-column="4" className="dt-orderable-asc dt-orderable-desc">
                                                <span className="dt-column-title" role="button">Description</span>
                                            </th>
                                            <th data-dt-column="4" className="dt-orderable-asc dt-orderable-desc">
                                                <span className="dt-column-title" role="button">Publish</span>
                                            </th>
                                            <th data-dt-column="4" className="dt-orderable-asc dt-orderable-desc">
                                                <span className="dt-column-title" role="button">End</span>
                                            </th>
                                            <th data-dt-column="4" className="dt-orderable-asc dt-orderable-desc">
                                                <span className="dt-column-title" role="button">Background Image</span>
                                            </th>
                                            <th data-dt-column="4" className="dt-orderable-asc dt-orderable-desc">
                                                <span className="dt-column-title" role="button">Link</span>
                                            </th>
                                            <th data-dt-column="5" className="dt-orderable-none">
                                                <span className="dt-column-title">Actions</span>
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {displayedDiscover.map((Discover, index) => (
                                            <tr key={index}>
                                                <td className="control dtr-hidden" tabIndex="0" style={{ display: 'none' }}></td>
                                                <td className="dt-select">
                                                <input 
                                                    aria-label="Select row" 
                                                    className="form-check-input" 
                                                    type="checkbox" 
                                                    checked={selectedDiscover.some(selectedDiscover => selectedDiscover.discover_Id === Discover.discover_Id)} 
                                                    onChange={() => handleSelectDiscover(Discover)} 
                                                    />
                                                </td>
                                                <td>
                                                    <span className="fw-medium">
                                                    {Discover.discover_Id}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="fw-medium">
                                                    <i className="icon-base fa-solid fa-triangle-exclamation text-warning me-2"></i>{Discover.Title}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="fw-medium">
                                                    <i className="icon-base bi bi-chat-left-text-fill text-secondary me-2"></i>
                                                    <div dangerouslySetInnerHTML={{ __html: Discover.Description }} />
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="fw-medium">
                                                    <i className="icon-base bx bx-calendar-check text-success me-2"></i>{Discover.Date_Start}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="fw-medium">
                                                    <i className="icon-base bx bx-calendar-x text-danger me-2"></i>{Discover.Date_End}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="fw-medium">
                                                        <img src={Discover.image ? Discover.image: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"} alt="Background Image" width="150" height="100" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <a href={Discover.Link} target='_blank'><span className="fw-medium" target="_blank">
                                                    <i className="icon-base icon-lg bx bx-link text-info me-2 "></i>
                                                    </span></a>
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <a 
                                                          href="" 
                                                          className="btn btn-icon delete-record"
                                                          onClick={(e) => handleDeleteClick(e, Discover)}
                                                        >
                                                            <i className="icon-base bx bx-trash icon-md icon-lg"></i>
                                                        </a>
                                                        <a href="app-user-view-account.html" className="btn btn-icon">
                                                            <i className="icon-base bx bx-show icon-md icon-lg"></i>
                                                        </a>
                                                        <a href="#" className="btn btn-icon" onClick={(e) => handleEditClick(e, Discover)}>
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
                                Showing {startIndex + 1} to {Math.min(endIndex, discover.length)} of {discover.length} entries
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
            </div>
        </>
    )
}