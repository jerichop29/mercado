
import useQuillEditor from '../../../hooks/useQuillEditor';
import useManageCategory from '../../../../backend/src/forms/templates/Category/addcategory';
export default function AddCategory( edit) {

    const {quillRef , editorRef} = useQuillEditor();
    const {
        formData,
        message,
        handleChange,
        handleSubmit,
        resetForm
    } = useManageCategory();

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
