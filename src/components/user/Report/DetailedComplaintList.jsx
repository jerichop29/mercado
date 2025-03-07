export default function DetailedComplaintList() {
    return (
        <>
            <div class="col-12">
                <div class="card">
                    <h5 class="card-header">Generate Between Dates Detailed Complaint List Report</h5>
                    <div class="card-body">
                        <form class="form-repeater">
                            <div data-repeater-list="group-a">
                                <div data-repeater-item="">
                                    <div class="row">
                                        <div class="mb-6 col-lg-6 col-xl-3 col-12 mb-0">
                                            <label class="form-label" for="form-repeater-1-1">From Date</label>
                                            <input type="datetime-local" id="form-repeater-1-1" class="form-control"/>
                                        </div>
                                        <div class="mb-6 col-lg-6 col-xl-3 col-12 mb-0">
                                            <label class="form-label" for="form-repeater-1-2">To Date</label>
                                            <input type="datetime-local" id="form-repeater-1-2" class="form-control" />
                                        </div>
                                    </div>
                                    <hr/>
                                </div>
                            </div>
                            <div class="mb-0">
                                <button class="btn tbl-btn-primary" data-repeater-create="">
                                    <i class="icon-base bx bxs-file-plus me-1"></i>
                                    <span class="align-middle">Generate List Report</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}