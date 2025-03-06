
import useQuillEditor from '../../../hooks/useQuillEditor';
export default function AddDiscover() {

    const quill = useQuillEditor();

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="app-ecommerce">
                    {/* Add Discover */}
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-6 row-gap-4">
                        <div className="d-flex flex-column justify-content-center">
                            <h4 className="mb-1">Add a new Discover</h4>
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
                                    <form>
                                        <div className="mb-6">
                                            <label className="form-label" htmlFor="Discover-title">
                                                Title
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="Discover"
                                                placeholder="Discover title"
                                                name="DiscoverTitle"
                                                aria-label="Discover title"
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
                                        

                                        <div className="mb-6">
                                            <label className="mb-1" htmlFor="Discover-publish">
                                                Publish Date and Time
                                            </label>
                                            <input className="form-control" type="datetime-local" id="html5-datetime-local-input"/>
                                        </div>

                                        <div className="mb-6">
                                            <label className="mb-1" htmlFor="Discover-end">
                                                End Date and Time
                                            </label>
                                            <input className="form-control" type="datetime-local" id="html5-datetime-local-input"/>
                                        </div>

                                        <div className="mb-6">
                                            <label className="mb-1" htmlFor="Discover-background">
                                                Background Image
                                            </label>
                                            <input className="form-control" type="file" id="formValidationFile" name="formValidationFile"></input>
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
                                                name="DiscoverLink"
                                                aria-label="Discover link"
                                            />
                                        </div>

                                        {/* Add Discover Button Inside the Form */}
                                        <div className="d-flex align-content-center flex-wrap gap-4">
                                            <button type="submit" className="btn add-new tbl-btn-primary">
                                                Add Discover
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
