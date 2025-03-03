export default function SubCategoryTable({ SubCategory, search }) {
    return (
        <>
            <div className="card">
                <div className="card-header border-bottom">
                <h5 className="card-title mb-0">Search Filters</h5>
        <div className="d-flex justify-content-between align-items-center row pt-4 gap-md-0 g-6">
          <div className="col-md-4 user_role">
            <select id="UserRole" className="form-select text-capitalize">
              <option value="">{search[0].title}</option>
              {search[0].options.map((role, index) => (
                <option key={index} value={role.value}>{role.label}</option>
              ))}
            </select>
          </div>
        </div>
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
                                    <input type="search" className="form-control" id="dt-search-0" placeholder="Search Sub Category" aria-controls="DataTables_Table_0" />
                                    <label htmlFor="dt-search-0"></label>
                                </div>
                            </div>
                        </div>

                        <div className="justify-content-between dt-layout-table">
                            <div className="d-md-flex justify-content-between align-items-center dt-layout-full table-responsive">
                                <table className="datatables-users table border-top dataTable dtr-column collapsed" id="DataTables_Table_0" aria-describedby="DataTables_Table_0_info" style={{ width: '100%' }}>
                                    <colgroup>
                                        <col data-dt-column="1" style={{ width: '50px' }} />
                                        <col data-dt-column="2" style={{ width: '100px' }} />
                                        <col data-dt-column="3" style={{ width: '150px' }} />
                                        <col data-dt-column="4" style={{ width: '150px' }} />
                                        <col data-dt-column="5" style={{ width: '300px' }} />
                                        <col data-dt-column="6" style={{ width: '150px' }} />
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
                                                <span className="dt-column-title" role="button">Category</span>
                                            </th>
                                            <th data-dt-column="4" className="dt-orderable-asc dt-orderable-desc">
                                                <span className="dt-column-title" role="button">Title</span>
                                            </th>
                                            <th data-dt-column="5" className="dt-orderable-asc dt-orderable-desc">
                                                <span className="dt-column-title" role="button">Description</span>
                                            </th>
                                            <th data-dt-column="6" className="dt-orderable-none">
                                                <span className="dt-column-title">Actions</span>
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {SubCategory && SubCategory.map((SubCategory, index) => (
                                            <tr key={index}>
                                                <td className="control dtr-hidden" tabIndex="0" style={{ display: 'none' }}></td>
                                                <td className="dt-select">
                                                    <input aria-label="Select row" className="form-check-input" type="checkbox" />
                                                </td>
                                                <td>
                                                    <span className="fw-medium">
                                                    {SubCategory.id}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="fw-medium">
                                                    <i className="icon-base bi bi-bookmark text-primary me-2"></i>{SubCategory.category}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="fw-medium">
                                                    <i className="icon-base fa-solid fa-triangle-exclamation text-warning me-2"></i>{SubCategory.title}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="fw-medium">
                                                    <i className="icon-base bi bi-chat-left-text-fill text-secondary me-2"></i>{SubCategory.description}
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
                                                        <a href="" className="btn btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                            <i className="icon-base bx bx-dots-vertical-rounded icon-md icon-lg"></i>
                                                        </a>
                                                        <div className="dropdown-menu dropdown-menu-end m-0">
                                                            <a href="" className="dropdown-item">Edit</a>
                                                        </div>
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
                                    Showing 1 to 10 of {SubCategory.length} entries
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