import { Component } from "react";
import "./assets/css/main/Style.css"; // Import CSS file

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <div className="error-box">
            <h1 className="error-title">Oops!</h1>
            <p className="error-message">
              Something went wrong. Please try refreshing the page.
            </p>
            <p className="error-details">
              <strong>Error:</strong> {this.state.errorMessage}
            </p>
            <button className="error-button" onClick={() => window.location.reload()}>
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
