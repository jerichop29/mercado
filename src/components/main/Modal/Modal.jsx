import { useState, useEffect } from "react";
import stallHandler from "../../../../backend/handler_js/stallHandler";
import "./Modal.css";

function Modal({ isOpen, stallName, onClose }) {
  const [stall, setData] = useState([]);

  const handleFilterData = async () => {
    try {
      const stallData = await stallHandler.getStalls();
      setData(stallData.data.filter((data) => data.StallName === stallName.replace(/^Stall_/,'')));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (isOpen) {
      handleFilterData();
    }
  }, [isOpen]);

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
                    src={data.image??"/api/placeholder/400/200"} 
                    alt="Stall preview" 
                    className="stall-preview-image"
                  />
                </div>
                <h3 className="stall-title">{data.StallName}</h3>
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
                      <span className="value">{data.Type_Id ?? 'N/A'}</span>
                    </div>
                    <div className="stall-row">
                      <span className="label">Owner ID:</span>
                      <span className="value">{data.Owner_Id ?? 'None'}</span>
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
