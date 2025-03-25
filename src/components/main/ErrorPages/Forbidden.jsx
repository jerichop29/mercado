import React from "react";
import { Link } from "react-router-dom";
import "../../../../public/assets/css/main/Style.css"; // Ensure your CSS is updated

const Forbidden = () => {
  return (
    <div className="not-found-container">
      
      <div className="not-found-background"></div>
      <div className="not-found-card">
        <div className="not-found-content">
          <h1 className="not-found-title">403</h1>
          <p className="not-found-subtitle">Forbidden</p>
          <p className="not-found-message mb-2" > 
          You do not have permission to access this page.</p>
          <Link 
            to="/" 
            className="not-found-button"
            onClick={() => {
              setTimeout(() => {
                window.location.reload();
              }, 100);
            }}
          >
            Go to Homepage
          </Link>
        </div>
      </div>
      
      <div className="not-found-design">
        <div className="not-found-square"></div>
        <div className="not-found-square"></div>
        <div className="not-found-square"></div>
        <div className="not-found-square"></div>
        <div className="not-found-square"></div>
        <div className="not-found-square"></div>
        <div className="not-found-square"></div>
      </div>
    </div>
  );
};

export default Forbidden;
