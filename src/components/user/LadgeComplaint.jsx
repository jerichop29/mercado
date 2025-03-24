import React, { useEffect, useRef, useState } from 'react';
import useQuillEditor from '../../hooks/useQuillEditor';
import { useData } from '../../../backend/src/views/useData';
export default function LadgeComplaint() {
    
    const {quillRef , editorRef} = useQuillEditor();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const { categories }= useData();
    const { subCategoriesWid }= useData(selectedCategory);



    // const handleFormSubmit = async (e) => {
    //     e.preventDefault();
    //     // Get the content from the Quill editor
    //     const descriptionContent = editorRef.current.root.innerHTML;
    //     formData.Description = descriptionContent; // Add it to formData
    //     await handleSubmit(e);
    //     resetForm();
    // };

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-6 row-gap-4">
                        <div className="d-flex flex-column justify-content-center">
                            <h4 className="mb-1">Report a Complaint</h4>
                            <p className="mb-0">Concise details defining a specific category.</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="card mb-6">
                                <div className="card-header">
                                    <h5 className="card-title mb-0">Complaint Information</h5>
                                </div>
                                <div className="card-body">
                                    <form >
                                        {/* Category Dropdown */}
                                        <div className="mb-4">
                                            <label className="form-label" htmlFor="category">Category</label>
                                            <select
                                                className="form-control"
                                                id="category"
                                                value={selectedCategory}
                                                onChange={(e) => setSelectedCategory(e.target.value)}
                                            >
                                                <option value="">Select a category</option>
                                                {categories.map((category, index) => (
                                                    <option key={index} value={category.Categories_Id}>{category.Title}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Sub-Category Dropdown */}
                                        <div className="mb-4">
                                            <label className="form-label" htmlFor="subCategory">Sub-Category</label>
                                            <select
                                                className="form-control"
                                                id="subCategory"
                                                value={selectedSubCategory}
                                                onChange={(e) => setSelectedSubCategory(e.target.value)}
                                                disabled={!selectedCategory} // Disable if no category is selected
                                            >
                                                <option value="">Select a sub-category</option>
                                                {subCategoriesWid.map((subCategory, index) => (
                                                    <option key={index} value={subCategory.SubCategories_Id}>{subCategory.Title}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Message */}
                                        <div className="mb-4">
                                            <label className="mb-1">Message</label>
                                            <div className="form-control p-0">
                                                <div ref={quillRef} />
                                            </div>
                                        </div>

                                        {/* Image */}
                                        <div className="mb-6">
                                            <label className="mb-1">
                                                Image (Optional)
                                            </label>
                                            <input className="form-control" type="file" id="formValidationFile" name="formValidationFile"></input>
                                        </div>

                                        {/* Submit Button */}
                                        <div className="d-flex align-content-center flex-wrap gap-4">
                                            <button type="submit" className="btn add-new tbl-btn-primary">
                                                Add Sub-Category
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}