import emailjs from '../Pages/';

const sendEmail = (formData) => {
    return emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        formData,
        'YOUR_USER_ID'
    );
};

export default sendEmail;
