import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './ContactUs.css';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs.send(
            'service_qehprci', // Replace with your EmailJS service ID
            'template_8bg93zd', // Replace with your EmailJS template ID
            formData,
            'YOUR_USER_ID' // Replace with your EmailJS user ID
        )
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            alert('Your message has been sent successfully!');
        })
        .catch((err) => {
            console.error('FAILED...', err);
            alert('Failed to send your message. Please try again later.');
        });

        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="contact-us-container">
            <div className="contact-header">
                <h2>Contact Us</h2>
                <p>We are here to assist you. Feel free to reach out to us with any inquiries or feedback.</p>
            </div>
            <div className="contact-section">
                <div className="contact-info">
                    <h3>Reach us at</h3>
                    <p>Address: 5th Floor, Vidyanidhi Education Complex, Vidyanidhi Road, Juhu Scheme, Andheri (W), Mumbai 400 049 India
</p>
                    <p>Mobile: 9029435311 / 9324095272
                    9987062416</p>
                    <p>Email: electromart@gmail.com</p>
                </div>
                <div className="contact-form">
                    <h3>Get In Touch With Us!</h3>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <textarea
                            name="message"
                            placeholder="Message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                        <button type="submit">Send Message</button>
                    </form>
                </div>
            </div>
            <div className="map">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.908352363286!2d72.8303160741322!3d19.111676082100185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9c3a5e26d7b%3A0x89a89f343cff9c29!2sSM%20VITA!5e0!3m2!1sen!2sin!4v1722927194890!5m2!1sen!2sin"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
        </div>
    );
};

export default ContactUs;


