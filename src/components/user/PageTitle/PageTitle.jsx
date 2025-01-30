import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './PageTitle.css';

const PageTitle = () => {
  const location = useLocation();

  // Split the path into segments and decode any encoded characters (like %20 -> space)
  const pathSegments = location.pathname
    .split('/')
    .filter(Boolean)
    .map(segment => decodeURIComponent(segment)); // Decoding each segment

  // Create breadcrumbs
  const breadcrumbs = pathSegments.map((segment, index) => {
    const linkPath = '/' + pathSegments.slice(0, index + 1).join('/');

    return {
      label: segment.charAt(0).toUpperCase() + segment.slice(1), // Capitalize first letter
      link: linkPath,
    };
  });

  // Add "Page" at the beginning of the breadcrumbs
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
              <li key={index} className={index === breadcrumbs.length - 1 ? 'current' : ''}>
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
