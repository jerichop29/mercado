import React, {  useState } from 'react';
import useQuillEditor from '../../../hooks/useQuillEditor';
import 'quill/dist/quill.snow.css'; // Import Quill's styles
import useManageCategory from '../../../../backend/src/forms/templates/Category/addcategory';
export default function AddSubCategory() {
    const {quillRef} = useQuillEditor();
    const [selectedCategory, setSelectedCategory] = useState('');
    const categories = ['Maintenance Issues', 'Plumbing Issues', 'Structural Problems', 'Hygiene and Cleanliness', 'Security Concerns'];

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-6 row-gap-4">
                        <div className="d-flex flex-column justify-content-center">
                            <h4 className="mb-1">Add a new Sub-Category</h4>
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
                                    <form>
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
                                                    <option key={index} value={category}>{category}</option>
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
                                                placeholder="Sub-Category title"
                                                name="sub-categoryTitle"
                                                aria-label="Sub-Category title"
                                            />
                                        </div>

                                        {/* Description */}
                                        <div className="mb-4">
                                            <label className="mb-1">Description (Optional)</label>
                                            <div className="form-control p-0">
                                                <div ref={quillRef} />
                                            </div>
                                        </div>

                                        {/* Add Sub-Category Button */}
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