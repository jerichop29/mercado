import React, { useState } from 'react';
import { useData } from '../../../../backend/src/views/useData';
import { useDeleteCategory } from '../../../../backend/src/forms/templates/Category/deletecategory';
import { Alert, Confirm } from '../../main/DialogueBox/DialogueBox';
import { useNavigate } from 'react-router-dom';
export default function CategoryTable() {
    // State management
    const navigate = useNavigate();
    const [displayData, setDisplayData] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [editData, setEditData] = useState(null);
    const {categories} = useData(searchTerm);
    // Pagination logic
    const totalPages = Math.ceil(categories.length / displayData);
    const startIndex = (currentPage - 1) * displayData;
    const endIndex = startIndex + displayData;
    const displayedCategories = categories.slice(startIndex, endIndex);

    const [selectAll, setSelectAll] = useState(false);
  
  

    const { handleDelete, message } = useDeleteCategory(() => {
        setSearchTerm((prev) => prev + ' ');
        setTimeout(() => {
          setSearchTerm((prev) => (prev ? prev.trim() : '')); 
      }, 100);
      });
    
    const handleDeleteClick = async (e, categories) => {

        console.log("Selected Category for Deletion:",  categories);
        e.preventDefault();    
        const result = await Confirm("Are you sure you want to proceed?", "Confirmation");
        if (result) {
            await handleDelete(categories);
            Alert("Category Deleted")
        } else {
        }
      };


    // Handle page change
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleSelectCategory = (categoryId) => {
        setSelectedCategories((prevSelected) => {
            if (prevSelected.some(selectedCategories => selectedCategories.Categories_Id === categoryId.Categories_Id)) {
                return prevSelected.filter(selectedCategories => selectedCategories.Categories_Id !== categoryId.Categories_Id); // Deselect user
            } else {
                return [
                    ...prevSelected,
                    categoryId
                ]; 
            }
        });
    };


    const handleDeleteSelected = async () => {
        const result = await Confirm("Are you sure you want to proceed?", "Confirmation");
        if (result) {
            for (const category of selectedCategories) {
              await handleDelete(category); // Assuming handleDelete can take the entire user object
            }
            setSelectedCategories([]); // Clear selection after deletion
        } else {
        }
      };
      
      const handleSelectAllChange = (event) => {
        const isChecked = event.target.checked;
        setSelectAll(isChecked);
        if (isChecked) {
          setSelectedCategories(displayedCategories);
        } else {
         setSelectedCategories([]);
        }
      };
      const handleEditClick = (e, category) => {
        e.preventDefault();
        
        // Prepare the data for editing
        const editData = {
            Title: category.Title,
            Description: category.Description,
            Categories_Id: category.Categories_Id // Assuming this exists in your data
        };
        
        // Navigate to the AddSubCategory component with the edit data
        navigate('/user/add-category', { 
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
                                                        checked={selectedCategories.some(selectedCategories => selectedCategories.Categories_Id === category.Categories_Id)}
                                                        onChange={() => handleSelectCategory(category)}/>
                                                </td>
                                                <td>
                                                    <span className="fw-medium">
                                                        {category.Categories_Id}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="fw-medium">
                                                        <i className="icon-base fa-solid fa-triangle-exclamation text-warning me-2"></i>{category.Title}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="fw-medium">
                                                        <i className="icon-base bi bi-chat-left-text-fill text-secondary me-2"></i>
                                                        <div dangerouslySetInnerHTML={{ __html: category.Description }} />
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <a href="#" className="btn btn-icon delete-record" onClick={(e) => {
                                                            handleDeleteClick(e,category);
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
                                    Showing {startIndex + 1} to {Math.min(endIndex, categories.length)} of {categories.length} entries
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