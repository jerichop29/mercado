import { useState } from 'react';
import "./Faq.css"

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "What is the Stall Management System?",
            answer: "The Stall Management System is a platform that publicly displays available stalls for rent, allowing users to check availability, book stalls, and manage complaints."
        },
        {
            question: "Who can use the system?",
            answer: "The system is designed for public users, stall owners, admins, and super admins (developers) to manage stall rentals and operations."
        },
        {
            question: "Is the system available on mobile devices?",
            answer: "Yes, the system is accessible through a web browser and may also have a mobile app."
        },
        {
            question: "Can I view available stalls without registering?",
            answer: "Yes, the system provides a public display of all available stalls, including location, size, and rental price."
        },
        {
            question: "How do I reset my password?",
            answer: "Click on 'Forgot Password' on the login page and follow the instructions to reset your password via email."
        },
        {
            question: "How do I contact customer support?",
            answer: "You can reach support through email, or phone support for any inquiries or technical issues."
        }
    ];
    

    return (
        <div className="container">
            	<div className="row">
				<div className="col-md-12">
					<div className="section-title text-center wow zoomIn">
						<h1>Frequently Asked Questions</h1>
						<span></span>
						<p>Our Frequently Asked Questions here.</p>
					</div>
				</div>
			</div>

            <div className="row">
                <div className="col-md-12">
                    <div className="panel-group" id="accordion">
                        {faqs.map((faq, index) => (
                            <div className="panel panel-default" key={index}>
                                <div className="panel-heading">
                                    <h4 className="panel-title">
                                        <a
                                            role="button"
                                            onClick={() => toggleAccordion(index)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {faq.question}
                                        </a>
                                    </h4>
                                </div>
                                <div
                                    className={`panel-collapse collapse${activeIndex === index ? ' show' : ''
                                        }`}
                                >
                                    <div className="panel-body">
                                        <p>{faq.answer}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}