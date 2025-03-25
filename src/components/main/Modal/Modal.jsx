import "./Modal.css";
import { useModal } from "../../../../backend/src/views/useModal";

function Modal({ isOpen, stallName, onClose }) {
  const { stall } = useModal(isOpen,stallName);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &#10006;
        </button>
        <div className="modal-content">
          {stall.length > 0 ? (
            stall.map((data, index) => (
              <div key={index} className="stall-card">
                <div className="stall-image">
                  <img 
                    src={data.image==''?"/assets/img/buildings/building1.png":data.image} 
                    alt="Stall preview" 
                    className="stall-preview-image"
                  />
                </div>
                <h3 className="stall-title">{data.StallCode}</h3>
                <div className="stall-info">
                  <div className="stall-grid">
                    <div className="stall-row">
                      <span className="label">Stall ID:</span>
                      <span className="value">{data.Stall_Id}</span>
                    </div>
                    <div className="stall-row">
                      <span className="label">Building Name:</span>
                      <span className="value">{data.BuildingName}</span>
                    </div>
                    <div className="stall-row">
                      <span className="label">Type ID:</span>
                      <span className="value">{data.TypeName ?? 'N/A'}</span>
                    </div>
                    <div className="stall-row">
                      <span className="label">Owner ID:</span>
                      <span className="value">{data.OwnerName ?? 'None'}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No stall data found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
