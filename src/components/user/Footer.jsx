export default function Footer(){
    return(
        <>
            <footer className="content-footer footer bg-footer-theme">
              <div className="container-xxl">
                <div
                  className="footer-container d-flex align-items-center justify-content-between py-4 flex-md-row flex-column">
                  <div className="text-body">
                    © 2025 Mecardo De Calamba. Created by 
                    <a target="_blank" className="footer-link">&nbsp;ICT Department</a>
                  </div> 
                  <div className="d-none d-lg-inline-block">
                    <a  className="footer-link me-4" target="_blank">ds</a>
                    <a target="_blank" className="footer-link me-4">ds</a>
                    <a
                      href="https://github.com/themeselection/sneat-html-admin-template-free/issues"
                      target="_blank"
                      className="footer-link"
                      >Support</a>
                
                  </div>
                </div>
              </div>
            </footer>
        </>
    )
}