import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Import Quill's styles

export default function AddCategory() {
    const quillRef = useRef(null);

    useEffect(() => {
        if (quillRef.current && !quillRef.current.quill) {
            // Initialize Quill only once
            const quill = new Quill(quillRef.current, {
                theme: 'snow',
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline'],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        ['link', 'image'],
                    ],
                },
                placeholder: 'Category Description',
            });

            // Store the Quill instance in the ref for future access
            quillRef.current.quill = quill;

            // Optionally, handle changes in the editor
            quill.on('text-change', () => {
                console.log(quill.root.innerHTML);
            });
        }
    }, []);

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="app-ecommerce">
                    {/* Add Category */}
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-6 row-gap-4">
                        <div className="d-flex flex-column justify-content-center">
                            <h4 className="mb-1">Add a new Category</h4>
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
                                    <form>
                                        <div className="mb-6">
                                            <label className="form-label" htmlFor="ecommerce-category-name">
                                                Title
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="category"
                                                placeholder="Category title"
                                                name="categoryTitle"
                                                aria-label="Category title"
                                            />
                                        </div>

                                        {/* Description */}
                                        <div className="mb-4">
                                            <label className="mb-1">Description (Optional)</label>
                                            <div className="form-control p-0">
                                                {/* Quill Editor Container */}
                                                <div ref={quillRef} />
                                            </div>
                                        </div>

                                        {/* Add Category Button Inside the Form */}
                                        <div className="d-flex align-content-center flex-wrap gap-4">
                                            <button type="submit" className="btn add-new tbl-btn-primary">
                                                Add Category
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
