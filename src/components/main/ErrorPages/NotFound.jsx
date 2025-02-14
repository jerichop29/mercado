import React from "react";
import { Link } from "react-router-dom";
import "../../../assets/css/main/Style.css"; // Ensure your CSS is updated

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-background"></div>
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-subtitle">Oops! Page Not Found</p>
        <p className="not-found-message">
          The page you're looking for doesn't exist. It might have been removed or moved to another location.
        </p>
        <Link to="/" className="not-found-button">
          Go to Homepage
        </Link>
      </div>
      <div className="not-found-design">
        <div className="not-found-circle"></div>
        <div className="not-found-line"></div>
        <div className="not-found-x">X</div>
        <img src="/path/to/your/image.png" alt="Not Found" className="not-found-image" />
      </div>
    </div>
  );
};

export default NotFound;
