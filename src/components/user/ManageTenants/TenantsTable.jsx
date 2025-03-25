import React, {useState} from 'react';
import AddTenant from './AddTenant';
import {useData} from '../../../../backend/src/views/useData';
import useDeleteTenantModel from '../../../../backend/src/forms/templates/Tenants/deleteTenantModel';
import { Confirm } from '../../main/DialogueBox/DialogueBox';
const TenantsTable = ({search}) => {
    const [filter,
        setFilter] = useState('');
    const [building,
        setBuilding] = useState('');
    const {tenant} = useData(filter, building);
    const [displayData,
        setdisplayData] = useState(10);
    const [currentPage,
        setCurrentPage] = useState(1);
    const totalPages = Math.ceil(tenant.length / displayData);
    const startIndex = (currentPage - 1) * displayData;
    const endIndex = startIndex + displayData;
    const displayedUsers = tenant.slice(startIndex, endIndex);
    const [editData,
        setEditData] = useState(null);
    const [selectedTenants,
        setSelectedTenants] = useState([]);

    const {handleDelete, message} = useDeleteTenantModel(() => {
        console.log("Tenant deleted successfully");
    });

    const handleEditClick = (e, tenant) => {
        e.preventDefault();
        setEditData({
            FName: tenant.FName || "",
            MName: tenant.MName || "",
            LName: tenant.LName || "",
            Gender: tenant.Gender || "",
            Address: tenant.Address || "",
            Contact: tenant.Contact || "",
            Email: tenant.Email || "",
            Birthdate: tenant.Birthdate || "",
            Stall_Id: tenant.Stall_Id || "",
            Date_Start: tenant.Date_Start || "",
            Market_Fee: tenant.Market_Fee || "",
            Person_Id:tenant.Person_Id||"",
            id: tenant.TenantId
        });
        const offcanvasElement = document.getElementById('offcanvasAddUser');
        const offcanvas = new bootstrap.Offcanvas(offcanvasElement);
        offcanvas.show();
    };

    const handleDeleteClick = async (tenant) => {
        const result = await Confirm("Are you sure you want to proceed?", "Confirmation");
        if (result) {
            console.log("User confirmed!");
            await handleDelete({TenantId: tenant.TenantId});
        } else {
            console.log("User canceled.");
        }
    };

    const handleSelectTenant = (tenantId) => {
        setSelectedTenants((prevSelected) => {
            if (prevSelected.includes(tenantId)) {
                return prevSelected.filter(id => id !== tenantId); // Deselect
            } else {
                return [
                    ...prevSelected,
                    tenantId
                ]; // Select
            }
        });
    };

    const handleDeleteSelected = async() => {
        if (selectedTenants.length === 0) {
            alert('No tenants selected for deletion.');
            return;
        }
        const result = await Confirm("Are you sure you want to proceed?", "Confirmation");
            if (result) {
                console.log("User confirmed!");
                await Promise.all(selectedTenants.map(tenantId => handleDelete({TenantId: tenantId})));
            setSelectedTenants([]); // Clear selection after deletion
            } else {
                console.log("User canceled.");
            }
    };

    const handleBuildingChange = (e) => {
        setBuilding(e.target.value);

        setFilter((prev) => (prev
            ? prev + ' '
            : ' ')); // Add a space if there's a value, otherwise set to space

        setTimeout(() => {
            setFilter((prev) => (prev
                ? prev.trim()
                : '')); // Remove the extra space after delay
        }, 100);
    };
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="card">
            <div className="card-header border-bottom">
                <h5 className="card-title mb-0">Search Filters</h5>
                <div
                    className="d-flex justify-content-between align-items-center row pt-4 gap-md-0 g-6">
                    <div className="col-md-4 user_role">
                        <select
                            id="UserRole"
                            className="form-select text-capitalize"
                            value={building}
                            onChange={handleBuildingChange}>
                            <option value="">{search[0].title}</option>
                            {search[0]
                                .options
                                .map((role, index) => (
                                    <option key={index} value={role.value}>{role.label}</option>
                                ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="card-datatable">
                <div
                    id="DataTables_Table_0_wrapper"
                    className="dt-container dt-bootstrap5 dt-empty-footer">
                    <div className="row mx-3 my-0 justify-content-between">
                        <div
                            className="d-md-flex justify-content-between align-items-center dt-layout-start col-md-auto me-auto mt-0">
                            <div className="dt-length mb-md-6 mb-0">
                                <select
                                    name="DataTables_Table_0_length"
                                    aria-controls="DataTables_Table_0"
                                    className="form-select ms-0"
                                    id="dt-length-0"
                                    value={displayData}
                                    onChange={(e) => {
                                    setdisplayData(e.target.value)
                                }}>
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select>
                                <label htmlFor="dt-length-0"></label>
                            </div>
                        </div>

                        <div
                            className="d-md-flex align-items-center dt-layout-end col-md-auto ms-auto d-flex gap-md-4 justify-content-md-between justify-content-center gap-4 flex-wrap mt-0">
                            <div className="dt-buttons btn-group flex-wrap d-flex gap-4 mb-md-0 mb-6">
                                {selectedTenants.length > 0 && (
                                    <button className="btn btn-danger" onClick={handleDeleteSelected}>
                                        Delete Selected
                                    </button>
                                )}
                                <button
                                    className="btn add-new tbl-btn-primary"
                                    tabIndex="0"
                                    aria-controls="DataTables_Table_0"
                                    type="button"
                                    data-bs-toggle="offcanvas"
                                    data-bs-target="#offcanvasAddUser">
                                    <span className="d-flex justify-content-between align-item-center">
                                        <i className="icon-base bx bx-plus icon-lg me-0 me-sm-2"></i>
                                        <span className="d-none d-sm-inline-block">Add New Tenant</span>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="justify-content-between dt-layout-table">
                        <div
                            className="d-md-flex justify-content-between align-items-center dt-layout-full table-responsive">
                            <table
                                className="datatables-users table border-top dataTable dtr-column collapsed"
                                id="DataTables_Table_0"
                                aria-describedby="DataTables_Table_0_info"
                                style={{
                                width: '100%'
                            }}>
                                <colgroup>
                                    <col
                                        data-dt-column="1"
                                        style={{
                                        width: '10px'
                                    }}/>
                                    <col
                                        data-dt-column="2"
                                        style={{
                                        width: '300px'
                                    }}/>
                                    <col
                                        data-dt-column="3"
                                        style={{
                                        width: '130px'
                                    }}/>
                                    <col
                                        data-dt-column="4"
                                        style={{
                                        width: '80px'
                                    }}/>
                                    <col
                                        data-dt-column="5"
                                        style={{
                                        width: '400px'
                                    }}/>
                                    <col
                                        data-dt-column="6"
                                        style={{
                                        width: '20px'
                                    }}/>
                                    <col
                                        data-dt-column="7"
                                        style={{
                                        width: '100px'
                                    }}/>
                                    <col
                                        data-dt-column="8"
                                        style={{
                                        width: '150px'
                                    }}/>
                                    <col
                                        data-dt-column="9"
                                        style={{
                                        width: '150px'
                                    }}/>
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th
                                            data-dt-column="0"
                                            className="control dt-orderable-none dtr-hidden"
                                            style={{
                                            display: 'none'
                                        }}></th>
                                        <th data-dt-column="1" className="dt-select dt-orderable-none">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                aria-label="Select all rows"
                                                checked={selectedTenants.length === displayedUsers.length && displayedUsers.length > 0}
                                                onChange={() => {
                                                if (selectedTenants.length === displayedUsers.length) {
                                                    setSelectedTenants([]);
                                                } else {
                                                    setSelectedTenants(displayedUsers.map(user => user.TenantId));
                                                }
                                            }}/>
                                        </th>
                                        <th
                                            data-dt-column="2"
                                            className="dt-orderable-asc dt-orderable-desc dt-ordering-desc">
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
                                            <span className="dt-column-title" role="button">Building</span>
                                        </th>
                                        <th data-dt-column="7" className="dt-orderable-asc dt-orderable-desc">
                                            <span className="dt-column-title" role="button">Stall</span>
                                        </th>
                                        <th data-dt-column="8" className="dt-orderable-asc dt-orderable-desc">
                                            <span className="dt-column-title" role="button">Stall Owner</span>
                                        </th>
                                        <th data-dt-column="9" className="dt-orderable-none">
                                            <span className="dt-column-title">Actions</span>
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {displayedUsers.map((tenant, index) => (
                                        
                                        <tr key={index}>
                                            <td
                                                className="control dtr-hidden"
                                                tabIndex="0"
                                                style={{
                                                display: 'none'
                                            }}></td>
                                            <td className="dt-select">
                                                <input
                                                    aria-label="Select row"
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    checked={selectedTenants.includes(tenant.TenantId)}
                                                    onChange={() => handleSelectTenant(tenant.TenantId)}/>
                                            </td>
                                            <td className="sorting_1">
                                                <div className="d-flex justify-content-start align-items-center user-name">
                                                    <div className="avatar-wrapper">
                                                        <div className="avatar avatar-sm me-4">
                                                            <img
                                                                src={tenant.avatar || "https://cdn-icons-png.flaticon.com/512/9203/9203764.png"}
                                                                alt="Avatar"
                                                                className="rounded-circle"/>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex flex-column">
                                                        <span className="fw-medium">{tenant.FName} {tenant.MName}
                                                            {tenant.LName}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="text-truncate d-flex align-items-center text-heading">
                                                    <i className="icon-base bx bx-phone-call text-success me-2"></i>{tenant.Contact}
                                                </span>
                                            </td>
                                            <td>{tenant.Gender}</td>
                                            <td>{tenant.Address}</td>
                                            <td>
                                                <span className="text-truncate d-flex align-items-center text-heading">
                                                    <i className="icon-base bx bx-building text-primary me-2"></i>{tenant.BuildingName}
                                                </span>
                                            </td>
                                            <td>
                                                <span className="text-truncate d-flex align-items-center text-heading">
                                                    <i className="icon-base bx bx-store text-primary me-2"></i>{tenant.StallCode}
                                                </span>
                                            </td>
                                            <td>
                                                <span className="text-truncate d-flex align-items-center text-heading">
                                                    <i className="icon-base bx bx-store text-primary me-2"></i>{tenant.Owner_FName} {tenant.Owner_MName}
                                                    {tenant.Owner_LName}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <a
                                                        href=""
                                                        className="btn btn-icon delete-record"
                                                        onClick={async () => await handleDeleteClick(tenant)}>
                                                        <i className="icon-base bx bx-trash icon-md icon-lg"></i>
                                                    </a>
                                                    <a href="app-user-view-account.html" className="btn btn-icon">
                                                        <i className="icon-base bx bx-show icon-md icon-lg"></i>
                                                    </a>
                                                    <a href="" className="btn btn-icon" onClick={(e) => handleEditClick(e, tenant)}>
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
                        <div
                            className="d-md-flex justify-content-between align-items-center dt-layout-start col-md-auto me-auto mt-0">
                            <div
                                className="dt-info"
                                aria-live="polite"
                                id="DataTables_Table_0_info"
                                role="status">
                                Showing {startIndex + 1}&nbsp; to {Math.min(endIndex, tenant.length)}&nbsp; of {tenant.length}
                                &nbsp; entries
                            </div>
                        </div>
                        <div
                            className="d-md-flex align-items-center dt-layout-end col-md-auto ms-auto d-flex gap-md-4 justify-content-md-between justify-content-center gap-4 flex-wrap mt-0">
                            <div className="dt-paging">
                                <nav aria-label="pagination">
                                    <ul className="pagination">
                                        <li
                                            className={`dt-paging-button page-item ${currentPage === 1
                                            ? "disabled"
                                            : ""}`}>
                                            <button
                                                className="page-link previous"
                                                onClick={() => handlePageChange(currentPage - 1)}>
                                                <i className="icon-base bx bx-chevron-left icon-18px"></i>
                                            </button>
                                        </li>
                                        {[...Array(Math.min(5, totalPages))].map((_, index) => {
                                            const pageNumber = currentPage + index - 2; // Center the current page in the range
                                            if (pageNumber < 1 || pageNumber > totalPages) 
                                                return null; // Skip out-of-bounds pages
                                            return (
                                                <li
                                                    key={pageNumber}
                                                    className={`dt-paging-button page-item ${currentPage === pageNumber
                                                    ? "active"
                                                    : ""}`}>
                                                    <button className="page-link" onClick={() => handlePageChange(pageNumber)}>
                                                        {pageNumber}
                                                    </button>
                                                </li>
                                            );
                                        })}

                                        <li
                                            className={`dt-paging-button page-item ${currentPage === totalPages
                                            ? "disabled"
                                            : ""}`}>
                                            <button
                                                className="page-link next"
                                                onClick={() => handlePageChange(currentPage + 1)}>
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
            <AddTenant
                onClose={() => {
                setEditData(null);
            }}
                onSubmitSuccess={() => {
                setEditData(null);
                setFilter((prev) => (prev
                    ? prev + ' '
                    : ' ')); // Add a space if there's a value, otherwise set to space
            
                setTimeout(() => {
                    setFilter((prev) => (prev
                        ? prev.trim()
                        : '')); // Remove the extra space after delay
                }, 100);
            }}
                edit={editData}/>
        </div>

    );
};

export default TenantsTable;
