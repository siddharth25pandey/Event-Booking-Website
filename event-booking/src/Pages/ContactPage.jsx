import React from 'react';
import '../Components/Styling/LoginPag.css'
import '../Components/Styling/Contact.css'
export default function ContactPage({ action, handleCloseLogin }) {
    return (
        <div>
            <div className="contact-section">
                <div className="contact-info">
                    <div><i className="fas fa-map-marker-alt"></i>IIITS, Sri City, India</div>
                    <div><i className="fas fa-envelope"></i>contactus@gmail.com</div>
                    <div><i className="fas fa-phone"></i>+91 5456 898 786</div>
                    <div><i className="fas fa-clock"></i>Mon - Fri 10:00 AM to 6:00 PM</div>
                </div>
                <div className="contact-form">
                    <h2>Contact Us</h2>
                    <form className="contact" action="https://formspree.io/xdowgdwe" method="post">
                        <input type="text" name="name" class="text-box" placeholder="Your Name" required />
                        <input type="email" name="email" class="text-box" placeholder="Your Email" required />
                        <textarea name="message" rows="5" placeholder="Your Message" required></textarea>
                        <input type="submit" name="submit" class="send-btn" value="Send" />
                    </form>
                </div>
            </div>
        </div>
    );
}

