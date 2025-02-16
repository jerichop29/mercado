// components/UserCard.js
import clsx from "clsx";
export default function Card({ title, count, percentage, description, icon }) {
    return (
        <div className="col-sm-6 col-xl-3">
            <div className="card">
                <div className="card-body">
                    <div className="d-flex align-items-start justify-content-between">
                        <div className="content-left">
                            <span className="text-heading">{title}</span>
                            <div className="d-flex align-items-center my-1">
                                <h4 className="mb-0 me-2">{count}</h4>
                                <p className="text-success mb-0">{percentage}</p>
                            </div>
                            <small className="mb-0">{description}</small>
                        </div>
                        <div className="avatar">
                            <span className="avatar-initial rounded bg-label-primary">
                                <i className={clsx("icon-base", icon)}></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}