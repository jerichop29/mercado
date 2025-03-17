import React, { useEffect } from 'react';
import useQuillEditor from '../../../hooks/useQuillEditor';
import { useLocation } from 'react-router-dom';
import useManageCategory from '../../../../backend/src/forms/templates/Category/addcategory';
export default function AddCategory() {
    const location = useLocation();
    const { isEditing, editData } = location.state || { isEditing: false, editData: null };
    const {quillRef , editorRef} = useQuillEditor();
    const {
        formData,
        message,
        handleChange,
        handleSubmit,
        resetForm
    } = useManageCategory(editData);

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
                <div className="app-ecommerce">
                    {/* Add Category */}
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-6 row-gap-4">
                        <div className="d-flex flex-column justify-content-center">
                            <h4 className="mb-1">{isEditing?"Edit ":"Add a New "} Category</h4>
                            <p className="mb-0">Organize complaints efficiently with categorized submissions.</p>
                        </div>
                    </div>
                    <div className="row">
                        {/* First column */}
                        <div className="col-12">
                            {/* Category Information */}
                            <div className="card mb-6">
                                <div className="card-header">
                                    <h5 className="card-tile mb-0">Category information</h5>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleFormSubmit}>
                                        <div className="mb-6">
                                            <label className="form-label" htmlFor="ecommerce-category-name">
                                                Title
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="category"
                                                placeholder="Category title"
                                                value={formData.Title}
                                                name="Title"
                                                aria-label="Category title"
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        {/* Description */}
                                        <div className="mb-4">
                                            <label className="mb-1">Description (Optional)</label>
                                            <div className="form-control p-0">
                                                {/* Quill Editor Container */}
                                                <div ref={quillRef} name="Description" />
                                            </div>
                                        </div>

                                        {/* Add Category Button Inside the Form */}
                                        <div className="d-flex align-content-center flex-wrap gap-4">
                                            <button type="submit" className="btn add-new tbl-btn-primary">
                                            {isEditing?"Edit ":"Add "} Category
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
