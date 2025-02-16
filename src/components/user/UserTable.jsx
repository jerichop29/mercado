import React from 'react';
import AddUser from './AddUser';

const UserTable = ({ users }) => {
  return (
    <div className="card">
      <div className="card-header border-bottom">
        <h5 className="card-title mb-0">Search Filters</h5>
        <div className="d-flex justify-content-between align-items-center row pt-4 gap-md-0 g-6">
          <div className="col-md-4 user_role">
            <select id="UserRole" className="form-select text-capitalize">
              <option value>Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Owner">Owner</option>
              <option value="SuperAdmin">Super Admin</option>
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
                <input type="search" className="form-control" id="dt-search-0" placeholder="Search User" aria-controls="DataTables_Table_0"/>
                <label htmlFor="dt-search-0"></label>
              </div>
              <div className="dt-buttons btn-group flex-wrap d-flex gap-4 mb-md-0 mb-6">
                <button className="btn add-new tbl-btn-primary" tabIndex="0" aria-controls="DataTables_Table_0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasAddUser">
                  <span className="d-flex justify-content-between align-item-center">
                    <i className="icon-base bx bx-plus icon-lg me-0 me-sm-2"></i>
                    <span className="d-none d-sm-inline-block">Add New User</span>
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="justify-content-between dt-layout-table">
            <div className="d-md-flex justify-content-between align-items-center dt-layout-full table-responsive">
              <table className="datatables-users table border-top dataTable dtr-column collapsed" id="DataTables_Table_0" aria-describedby="DataTables_Table_0_info" style={{ width: '100%' }}>
                <colgroup>
                  <col data-dt-column="1" style={{ width: '162.465px' }} />
                  <col data-dt-column="2" style={{ width: '297.448px' }} />
                  <col data-dt-column="3" style={{ width: '152.656px' }} />
                  <col data-dt-column="4" style={{ width: '119.983px' }} />
                  <col data-dt-column="5" style={{ width: '193.368px' }} />
                  <col data-dt-column="6" style={{ width: '115.278px' }} />
                  <col data-dt-column="7" style={{ width: '164.983px' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th data-dt-column="0" className="control dt-orderable-none dtr-hidden" style={{ display: 'none' }}></th>
                    <th data-dt-column="1" className="dt-select dt-orderable-none">
                      <input className="form-check-input" type="checkbox" aria-label="Select all rows" />
                    </th>
                    <th data-dt-column="2" className="dt-orderable-asc dt-orderable-desc dt-ordering-desc">
                      <span className="dt-column-title" role="button">User</span>
                    </th>
                    <th data-dt-column="3" className="dt-orderable-asc dt-orderable-desc">
                      <span className="dt-column-title" role="button">Contact</span>
                    </th>
                    <th data-dt-column="4" className="dt-orderable-asc dt-orderable-desc">
                      <span className="dt-column-title" role="button">Sex</span>
                    </th>
                    <th data-dt-column="5" className="dt-orderable-asc dt-orderable-desc">
                      <span className="dt-column-title" role="button">Address</span>
                    </th>
                    <th data-dt-column="6" className="dt-orderable-asc dt-orderable-desc">
                      <span className="dt-column-title" role="button">Role</span>
                    </th>
                    <th data-dt-column="7" className="dt-orderable-none">
                      <span className="dt-column-title">Actions</span>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {users && users.map((user, index) => (
                    <tr key={index}>
                      <td className="control dtr-hidden" tabIndex="0" style={{ display: 'none' }}></td>
                      <td className="dt-select">
                        <input aria-label="Select row" className="form-check-input" type="checkbox" />
                      </td>
                      <td className="sorting_1">
                        <div className="d-flex justify-content-start align-items-center user-name">
                          <div className="avatar-wrapper">
                            <div className="avatar avatar-sm me-4">
                              <img src={user.avatar || "https://cdn-icons-png.flaticon.com/512/9203/9203764.png"} alt="Avatar" className="rounded-circle" />
                            </div>
                          </div>
                          <div className="d-flex flex-column">
                            <a href="app-user-view-account.html" className="text-heading text-truncate">
                              <span className="fw-medium">{user.fullName}</span>
                            </a>
                            <small>{user.email}</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="text-truncate d-flex align-items-center text-heading">
                          <i className="icon-base bx bx-phone-call text-success me-2"></i>{user.contact}
                        </span>
                      </td>
                      <td>{user.sex}</td>
                      <td>{user.address}</td>
                      <td>
                        <span className={`badge ${user.role === 'Admin' ? 'bg-label-success' : 'bg-label-primary'}`} text-capitalized="">
                          {user.role}
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
                            <a href="" className="dropdown-item">Suspend</a>
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
                Showing 1 to 10 of {users.length} entries
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
      <AddUser />
    </div>
  );
};

export default UserTable;
