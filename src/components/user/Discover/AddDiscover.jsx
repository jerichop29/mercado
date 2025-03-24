import { useState, useEffect } from 'react';
import useQuillEditor from '../../../hooks/useQuillEditor';
import useManageDiscover from '../../../../backend/src/forms/templates/Discover/addDiscover';
import { useLocation } from 'react-router-dom';

export default function AddDiscover() {
    const location = useLocation();
    const { isEditing, editData } = location.state || { isEditing: false, editData: null };
    const [errors, setErrors] = useState({});
    const {quillRef,editorRef} = useQuillEditor();
    const {
        formData,
        message,
        handleChange,
        handleSubmit,
        resetForm
    } = useManageDiscover(editData);


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
        const currentDate = new Date().toISOString().slice(0, 16); // Get current date in 'YYYY-MM-DDTHH:MM' format

        // Validate Date_Start
        if (!editData && formData.Date_Start < currentDate) {
            setErrors({ ...errors, Date_Start: "Start date must be greater than or equal to the current date." });
            return;
        }

        // Validate Date_End
        if (formData.Date_End <= formData.Date_Start) {
            setErrors({ ...errors, Date_End: "End date must be greater than Start date." });
            return;
        }

        // Get the content from the Quill editor
        const descriptionContent = editorRef.current.root.innerHTML;
        formData.Description = descriptionContent; // Add it to formData
        await handleSubmit(e);
    };
    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="app-ecommerce">
                    {/* Add Discover */}
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-6 row-gap-4">
                        <div className="d-flex flex-column justify-content-center">
                            <h4 className="mb-1">{isEditing?"Edit ":"Add a New "}Discover</h4>
                            <p className="mb-0">create and publish announcements, events, or important updates that will be displayed in the Discover section.</p>
                        </div>
                    </div>
                    <div className="row">
                        {/* First column */}
                        <div className="col-12">
                            {/* Discover Information */}
                            <div className="card mb-6">
                                <div className="card-header">
                                    <h5 className="card-tile mb-0">Discover information</h5>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleFormSubmit} noValidate>
                                        <div className="mb-6">
                                            <label className="form-label" htmlFor="Discover-title">
                                                Title
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="Discover"
                                                placeholder="Discover title"
                                                value={formData.Title}
                                                name="Title"
                                                aria-label="Discover title"
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
                                        

                                        <div className="mb-6">
                                            <label className="mb-1" htmlFor="Discover-publish">
                                                Publish Date and Time
                                            </label>
                                            <input className="form-control" name='Date_Start' type="datetime-local" id="html5-datetime-local-input" onChange={handleChange} value={formData.Date_Start} required/>
                                        </div>

                                        <div className="mb-6">
                                            <label className="mb-1" htmlFor="Discover-end">
                                                End Date and Time
                                            </label>
                                            <input className="form-control" name='Date_End' type="datetime-local" id="html5-datetime-local-input" onChange={handleChange} value={formData.Date_End} required/>
                                        </div>

                                        <div className="mb-6">
                                            <label className="mb-1" htmlFor="Discover-background">
                                                Background Image
                                            </label>
                                            <input className="form-control" type="file" id="image" name="image" accept="image/*" onChange={handleChange} />
                                        </div>

                                        <div className="mb-6">
                                            <label className="form-label" htmlFor="Discover-link">
                                                Link
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="Discover"
                                                placeholder="Discover link"
                                                name="Link"
                                                aria-label="Discover link"
                                                onChange={handleChange}
                                                value={formData.Link}
                                                required
                                            />
                                        </div>

                                        {/* Add Discover Button Inside the Form */}
                                        <div className="d-flex align-content-center flex-wrap gap-4">
                                            <button type="submit" className="btn add-new tbl-btn-primary">
                                            {isEditing?"Edit ":"Add "}Discover
                                            </button>
                                        </div>
                                        {message.text && (
                                            <div className={`alert alert-${message.type === 'error' ? 'danger' : 'success'} mt-3`}>
                                                {message.text}
                                            </div>
                                        )}
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
