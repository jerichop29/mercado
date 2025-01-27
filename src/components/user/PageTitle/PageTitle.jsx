import React from 'react';
import { useLocation, Link } from 'react-router-dom'; // Import necessary hooks
import './PageTitle.css';

const PageTitle = () => {
  const location = useLocation(); // Get the current route from react-router

  // Split the path into segments (ignoring leading/trailing slashes)
  const pathSegments = location.pathname.split('/').filter(Boolean);

  // If path is empty (root route), we treat it as 'Home'
  const breadcrumbs = pathSegments.map((segment, index) => {
    // Build the full path for each breadcrumb item
    const linkPath = '/' + pathSegments.slice(  0, index + 1).join('/');

    return {
      label: segment.charAt(0).toUpperCase() + segment.slice(1), // Capitalize the first letter
      link: linkPath,
    };
  });

  // Add "Home" at the beginning of the breadcrumbs
  breadcrumbs.unshift({
    label: 'Page',
    link: '/',
  });

  return (
    <div className="page-title">
      <nav className="breadcrumbs">
        <div className="container">
          <ol>
            {breadcrumbs.map((breadcrumb, index) => (
              <li
                key={index}
                className={index === breadcrumbs.length - 1 ? 'current' : ''}
              >
                {/* If it's the last breadcrumb (current page), don't make it a link */}
                {index === breadcrumbs.length - 1 ? (
                  <span>{breadcrumb.label}</span>
                ) : (
                  <Link to={breadcrumb.link}>{breadcrumb.label}</Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </div>
  );
};

export default PageTitle;
