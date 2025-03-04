const Footer = () => {
    return (
        <footer className="content-footer footer bg-footer-theme">
            <div className="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
              <div className="mb-2 mb-md-0">
                ©
                  {(new Date().getFullYear())}
                , made by&nbsp;
                <a aria-label="Link to About the Department" href="https://www.calambacity.gov.ph/Users/DepartmentHome/City_planning_and_development_office" target="_blank" rel='noreferrer' className="footer-link fw-medium">City Planning and Development Office <span style={{color: 'rgb(105, 108, 255)'}}>Information and Communication Technology</span></a>
              </div>
            </div>
          </footer>
      );
}
export default Footer;