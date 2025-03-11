import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Import Quill's styles

export default function LadgeComplaint() {
    const quillRef = useRef(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [subCategories, setSubCategories] = useState([]);

    // Define categories and their sub-categories
    const categories = ['Maintenance Issues', 'Plumbing Issues', 'Structural Problems', 'Hygiene and Cleanliness', 'Security Concerns'];
    const categorySubCategories = {
        'Maintenance Issues': ['Electrical', 'HVAC', 'Elevator'],
        'Plumbing Issues': ['Leakage', 'Clogging', 'Water Pressure'],
        'Structural Problems': ['Cracks', 'Foundation', 'Roof'],
        'Hygiene and Cleanliness': ['Waste Disposal', 'Pest Control', 'Sanitization'],
        'Security Concerns': ['CCTV', 'Access Control', 'Theft'],
    };

    // Update sub-categories when category changes
    useEffect(() => {
        if (selectedCategory) {
            setSubCategories(categorySubCategories[selectedCategory] || []);
        } else {
            setSubCategories([]); // Reset sub-categories if no category is selected
        }
        setSelectedSubCategory(''); // Reset selected sub-category
    }, [selectedCategory]);

    // Initialize Quill editor
    useEffect(() => {
        if (quillRef.current && !quillRef.current.quill) {
            const quill = new Quill(quillRef.current, {
                theme: 'snow',
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline'],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        ['link', 'image'],
                    ],
                },
                placeholder: 'Complaint Description',
            });

            quillRef.current.quill = quill;

            quill.on('text-change', () => {
                console.log(quill.root.innerHTML);
            });
        }
    }, []);

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
                                                {subCategories.map((subCategory, index) => (
                                                    <option key={index} value={subCategory}>{subCategory}</option>
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