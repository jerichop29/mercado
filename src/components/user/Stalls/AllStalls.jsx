import './AllStalls.scss';

export default function AllStalls() {
    return (
    <>
        {/* Section Title */}
        <div className="container section-title" data-aos="fade-up">
            <h2>All Stalls</h2>
            <p>A bustling public market located in Calamba, Laguna, Philippines. </p>
        </div>
        {/* End Section Title */}
      <div className="canvas-wrapper">
        {[{
          iconClass: "fa-solid fa-1", // FontAwesome class for the first icon
          extraClass: "canvas_copy--left",
          subtitle: "Mercado",
          title: "First",
          details: "Building",
          description: "First Building - Mercado is a vibrant marketplace offering a variety of goods and services."
        }, {
          iconClass: "fa-solid fa-2", // FontAwesome class for the second icon
          extraClass: "canvas_copy--left",
          subtitle: "Heading",
          title: "Hello",
          details: "World",
          description: "Second Building - Mercado is a vibrant marketplace offering a variety of goods and services. "
        }].map((item, index) => (
          <a href="#" className="canvas" key={index}>
            <div className="canvas_border">
              <svg>
                <defs>
                  <linearGradient id={`grad-orange-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: "rgb(253,137,68)", stopOpacity: 1 }}></stop>
                    <stop offset="100%" style={{ stopColor: "rgb(153,75,23)", stopOpacity: 1 }}></stop>
                  </linearGradient>
                  <linearGradient id={`grad-red-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#D34F48"></stop>
                    <stop offset="100%" stopColor="#772522"></stop>
                  </linearGradient>
                </defs>
                <rect
                  className="rect-gradient"
                  fill="none"
                  stroke={`url(#grad-orange-${index})`}
                  strokeLinecap="square"
                  strokeWidth="4"
                  strokeMiterlimit="30"
                  width="100%"
                  height="100%"
                ></rect>
              </svg>
            </div>
            <div className="canvas_img-wrapper">
              {/* Font Awesome Icon */}
              <div className="canvas_icon">
                <i className={item.iconClass} style={{ fontSize: '50px' }}></i> {/* Using FontAwesome class */}
              </div>
            </div>
            <div className={`canvas_copy ${item.extraClass}`}>
              <span className="canvas_copy_subtitle">{item.subtitle}</span>
              <strong className="canvas_copy_title">{item.title}</strong>
              <strong className="canvas_copy_title">{item.details}</strong>
              <span className="canvas_copy_details">{item.description}</span>
            </div>
          </a>
        ))}
      </div>
    </>
    );
}
