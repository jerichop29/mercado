const Footer = () => {
    return (
        <footer className="content-footer footer bg-footer-theme">
            <div className="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
              <div className="mb-2 mb-md-0">
                ©
                  {(new Date().getFullYear())}
                , made by&nbsp;
                <a aria-label="Link to About the Department" href="https://www.calambacity.gov.ph/Users/DepartmentHome/City_planning_and_development_office" target="_blank" rel='noreferrer' className="footer-link fw-medium">City Planning and Development Office <span style={{color: 'rgb(105, 108, 255)'}}>ICT Department</span></a>
              </div>
              <div className="d-none d-lg-inline-block">
                <a aria-label="go to themeselection license" href="" className="footer-link me-4" target="_blank" rel='noreferrer' >License</a>
                <a aria-label="go to themeselection Documentation" href=""
                  target="_blank" rel='noreferrer' className="footer-link me-4">Documentation</a>
                <a aria-label="go to themeselection Support" href="" target="_blank" rel='noreferrer'
                  className="footer-link">Support</a>
              </div>
            </div>
          </footer>
      );
}
export default Footer;