
import useQuillEditor from '../../../hooks/useQuillEditor';
export default function AddCategory() {

    const quill = useQuillEditor();

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
                                                <div ref={quill} />
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
