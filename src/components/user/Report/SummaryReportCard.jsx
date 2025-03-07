export default function SummaryReportCard() {
    return (
        <>
            <div className="col-12">
                <div className="card">
                    <div className="card-widget-separator-wrapper">
                        <div className="card-body card-widget-separator">
                            <div className="row gy-4 gy-sm-1">
                                <div className="col-sm-6 col-lg-3">
                                    <div className="d-flex justify-content-between align-items-center card-widget-1 border-end pb-4 pb-sm-0">
                                        <div>
                                            <h4 className="mb-0">24</h4>
                                            <p className="mb-0">Clients</p>
                                        </div>
                                        <div className="avatar me-sm-4">
                                            <span className="avatar-initial rounded bg-label-secondary text-heading">
                                                <i className="icon-base bx bx-user icon-26px"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <hr className="d-none d-sm-block d-lg-none me-4"/>
                                </div>
                                <div className="col-sm-6 col-lg-3">
                                    <div className="d-flex justify-content-between align-items-center card-widget-2 border-end pb-4 pb-sm-0">
                                        <div>
                                            <h4 className="mb-0">165</h4>
                                            <p className="mb-0">Invoices</p>
                                        </div>
                                        <div className="avatar me-lg-4">
                                            <span className="avatar-initial rounded bg-label-secondary text-heading">
                                                <i className="icon-base bx bx-file icon-26px"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <hr className="d-none d-sm-block d-lg-none"/>
                                </div>
                                <div className="col-sm-6 col-lg-3">
                                    <div className="d-flex justify-content-between align-items-center border-end pb-4 pb-sm-0 card-widget-3">
                                        <div>
                                            <h4 className="mb-0">$2.46k</h4>
                                            <p className="mb-0">Paid</p>
                                        </div>
                                        <div className="avatar me-sm-4">
                                            <span className="avatar-initial rounded bg-label-secondary text-heading">
                                                <i className="icon-base bx bx-check-double icon-26px"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-lg-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h4 className="mb-0">$876</h4>
                                            <p className="mb-0">Unpaid</p>
                                        </div>
                                        <div className="avatar">
                                            <span className="avatar-initial rounded bg-label-secondary text-heading">
                                                <i className="icon-base bx bx-error-circle icon-26px"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}