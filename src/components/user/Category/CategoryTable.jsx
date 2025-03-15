import React, { useState } from 'react';

export default function CategoryTable({ Category: initialCategory }) {
    // State management
    const [displayData, setDisplayData] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [editData, setEditData] = useState(null);
    const [categories, setCategories] = useState(initialCategory || []);

    // Filter categories based on search term
    const filteredCategories = categories.filter(category => 
        category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const totalPages = Math.ceil(filteredCategories.length / displayData);
    const startIndex = (currentPage - 1) * displayData;
    const endIndex = startIndex + displayData;
    const displayedCategories = filteredCategories.slice(startIndex, endIndex);

    // Handle page change
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    // Handle category selection
    const handleSelectCategory = (categoryId) => {
        setSelectedCategories((prevSelected) => {
            if (prevSelected.includes(categoryId)) {
                return prevSelected.filter(id => id !== categoryId); // Deselect
            } else {
                return [...prevSelected, categoryId]; // Select
            }
        });
    };

    // Handle delete operation
    const handleDeleteClick = (category) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            setCategories(prevCategories => 
                prevCategories.filter(item => item.id !== category.id)
            );
            // Also remove from selected if it was selected
            setSelectedCategories(prev => prev.filter(id => id !== category.id));
        }
    };

    // Handle delete selected
    const handleDeleteSelected = () => {
        if (selectedCategories.length === 0) {
            alert('No categories selected for deletion.');
            return;
        }
        if (window.confirm('Are you sure you want to delete the selected categories?')) {
            setCategories(prevCategories => 
                prevCategories.filter(item => !selectedCategories.includes(item.id))
            );
            setSelectedCategories([]); // Clear selection after deletion
        }
    };

    // Handle edit click
    const handleEditClick = (e, category) => {
        e.preventDefault();
        setEditData({
            id: category.id,
            title: category.title,
            description: category.description
        });
        // In a real implementation, you would show an edit modal or navigate to edit page
        alert(`Edit category: ${category.title}`);
        // Placeholder for actual edit functionality
    };

    return (
        <>
            <div className="card">
                <div className="card-header border-bottom">
                    <h5 className="card-title mb-0">Categories</h5>
                </div>

                <div className="card-datatable">
                    <div id="DataTables_Table_0_wrapper" className="dt-container dt-bootstrap5 dt-empty-footer">
                        <div className="row mx-3 my-0 justify-content-between">
                            <div className="d-md-flex justify-content-between align-items-center dt-layout-start col-md-auto me-auto mt-0">
                                <div className="dt-length mb-md-6 mb-0">
                                    <select 
                                        name="DataTables_Table_0_length" 
                                        aria-controls="DataTables_Table_0" 
                                        className="form-select ms-0" 
                                        id="dt-length-0"
                                        value={displayData}
                                        onChange={(e) => {
                                            setDisplayData(parseInt(e.target.value));
                                            setCurrentPage(1); // Reset to first page when changing display count
                                        }}
                                    >
                                        <option value="10">10</option>
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                    </select>
                                    <label htmlFor="dt-length-0"></label>
                                </div>
                            </div>

                            <div className="d-md-flex align-items-center dt-layout-end col-md-auto ms-auto d-flex gap-md-4 justify-content-md-between justify-content-center gap-4 flex-wrap mt-0">
                                <div className="dt-buttons btn-group flex-wrap d-flex gap-4 mb-md-0 mb-6">
                                    {selectedCategories.length > 0 && (
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
                                        data-bs-target="#offcanvasAddCategory"
                                    >
                                        <span className="d-flex justify-content-between align-item-center">
                                            <i className="icon-base bx bx-plus icon-lg me-0 me-sm-2"></i>
                                            <span className="d-none d-sm-inline-block">Add New Category</span>
                                        </span>
                                    </button>
                                </div>
                                <div className="dt-search mb-md-6 mb-2">
                                    <input 
                                        type="search" 
                                        className="form-control" 
                                        id="dt-search-0" 
                                        placeholder="Search Category" 
                                        aria-controls="DataTables_Table_0" 
                                        value={searchTerm}
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value);
                                            setCurrentPage(1); // Reset to first page when searching
                                        }}
                                    />
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
                                        <col data-dt-column="5" style={{ width: '150px' }} />
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th data-dt-column="0" className="control dt-orderable-none dtr-hidden" style={{ display: 'none' }}></th>
                                            <th data-dt-column="1" className="dt-select dt-orderable-none">
                                                <input 
                                                    className="form-check-input" 
                                                    type="checkbox" 
                                                    aria-label="Select all rows" 
                                                    checked={selectedCategories.length === displayedCategories.length && displayedCategories.length > 0}
                                                    onChange={() => {
                                                        if (selectedCategories.length === displayedCategories.length) {
                                                            setSelectedCategories([]);
                                                        } else {
                                                            setSelectedCategories(displayedCategories.map(category => category.id));
                                                        }
                                                    }}
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
                                            <th data-dt-column="5" className="dt-orderable-none">
                                                <span className="dt-column-title">Actions</span>
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {displayedCategories.map((category, index) => (
                                            <tr key={index}>
                                                <td className="control dtr-hidden" tabIndex="0" style={{ display: 'none' }}></td>
                                                <td className="dt-select">
                                                    <input 
                                                        aria-label="Select row" 
                                                        className="form-check-input" 
                                                        type="checkbox" 
                                                        checked={selectedCategories.includes(category.id)}
                                                        onChange={() => handleSelectCategory(category.id)}
                                                    />
                                                </td>
                                                <td>
                                                    <span className="fw-medium">
                                                        {category.id}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="fw-medium">
                                                        <i className="icon-base fa-solid fa-triangle-exclamation text-warning me-2"></i>{category.title}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="fw-medium">
                                                        <i className="icon-base bi bi-chat-left-text-fill text-secondary me-2"></i>{category.description}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <a href="#" className="btn btn-icon delete-record" onClick={(e) => {
                                                            e.preventDefault();
                                                            handleDeleteClick(category);
                                                        }}>
                                                            <i className="icon-base bx bx-trash icon-md icon-lg"></i>
                                                        </a>
                                                        <a href="#" className="btn btn-icon" onClick={(e) => {
                                                            e.preventDefault();
                                                            // View logic would go here
                                                        }}>
                                                            <i className="icon-base bx bx-show icon-md icon-lg"></i>
                                                        </a>
                                                        <a href="#" className="btn btn-icon" onClick={(e) => handleEditClick(e, category)}>
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
                                    Showing {startIndex + 1} to {Math.min(endIndex, filteredCategories.length)} of {filteredCategories.length} entries
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
                                                const pageNumber = currentPage + index - 2; // Center the current page
                                                if (pageNumber < 1 || pageNumber > totalPages) return null;
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
    );
}