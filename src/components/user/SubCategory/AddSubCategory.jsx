import React, { useEffect } from 'react';
import useQuillEditor from '../../../hooks/useQuillEditor';
import { useLocation } from 'react-router-dom';
import useManageSubCategory from '../../../../backend/src/forms/templates/SubCategory/addSubCategory';
import { useData } from '../../../../backend/src/views/useData';
export default function AddSubCategory() {
    const location = useLocation();
    const { isEditing, editData } = location.state || { isEditing: false, editData: null };
    console.log(editData)
    const { quillRef ,editorRef } = useQuillEditor();
    const {
        formData,
        message,
        handleChange,
        handleSubmit,
        resetForm
    } = useManageSubCategory(editData);
    const {categories} = useData();
 // Handle edit data when component mounts
        useEffect(() => {
            if (isEditing && editData) {
                // Set form data from editData
                // Set the Quill editor content
                if (editorRef.current && editData.Description) {
                    editorRef.current.root.innerHTML = editData.Description;
                }
            }
        }, [isEditing, editData, editorRef]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // Get the content from the Quill editor
        const descriptionContent = editorRef.current.root.innerHTML;
        formData.Description = descriptionContent; // Add it to formData
        await handleSubmit(e);
        resetForm();
    };

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-6 row-gap-4">
                        <div className="d-flex flex-column justify-content-center">
                            <h4 className="mb-1">{isEditing?"Edit ":"Add a New "}Sub-Category</h4>
                            <p className="mb-0">Concise details defining a specific category.</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="card mb-6">
                                <div className="card-header">
                                    <h5 className="card-title mb-0">Sub-Category Information</h5>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleFormSubmit}>
                                        {/* Category Dropdown */}
                                        <div className="mb-4">
                                            <label className="form-label" htmlFor="category">Category</label>
                                            <select 
                                                className="form-control" 
                                                id="category" 
                                                name='Category_Id'
                                                value={formData.Category_Id} 
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Select a category</option>
                                                {categories.map((category, index) => (
                                                    <option key={index} value={category.Categories_Id}>{category.Title}</option>
                                                ))}
                                            </select>
                                        </div>
                                        
                                        {/* Sub-Category Title */}
                                        <div className="mb-6">
                                            <label className="form-label" htmlFor="sub-category">Title</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="sub-category"
                                                value={formData.Title}
                                                onChange={handleChange}
                                                placeholder="Sub-Category title"
                                                name="Title"
                                                aria-label="Sub-Category title"
                                                required
                                            />
                                        </div>

                                        {/* Description */}
                                        <div className="mb-4">
                                            <label className="mb-1">Description (Optional)</label>
                                            <div className="form-control p-0">
                                                <div ref={quillRef} name="Description"/>
                                            </div>
                                        </div>

                                        {/* Add Sub-Category Button */}
                                        <div className="d-flex align-content-center flex-wrap gap-4">
                                            <button type="submit" className="btn add-new tbl-btn-primary">
                                            {isEditing?"Edit ":"Add "} Sub-Category
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