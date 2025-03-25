import React from 'react';
import '../../../../public/assets/css/main/Style.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
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
            {process.env.NODE_ENV === 'development' && (
                <p className="error-details">
                    <strong>Error:</strong> {this.state.errorMessage}
                </p>
            )}
            <button className="error-button" onClick={() => window.location.reload()}>
              Reload Page
            </button>
            <button className="error-button mx-3 " 
            onClick={() =>{ 
              window.history.back();setTimeout(() => {
                window.location.reload(); // Remove the extra space after delay
                }, 100);  }} >
              Go Back
            </button>
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
