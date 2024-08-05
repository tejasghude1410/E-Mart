import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./Footer.css";

function Footer() {
  return (
    <footer className="bg-black text-light mt-5 align-center">
        <Container fluid='xl'>
          <Row className="py-2">
            <Col  xs={12} md={4} className="mb-4 " >
              <h5>About Us</h5>
              <p>Welcome to Electro Mart!<br/>

             At Electro Mart, we're dedicated to providing a diverse selection of products tailored to meet all your 
             shopping needs. From everyday essentials to unique finds, we strive to offer high-quality items and 
             exceptional service.</p>
            </Col>
            <Col xs={12} md={4} className="mb-4">
              <h5></h5>
              <ul className="list-unstyled">
               
              </ul>
            </Col>
            <Col xs={8} md={4} className="mb-4">
              <h5>Contact Us</h5>
              <p>Email: electromart@gmail.com</p>
              <p>Phone: +1 000 000 000</p>
            </Col>
            <Col xs={8} md={4} className="mb-4">
              <h5>Address</h5>
              <p>Vita</p>
              
            </Col>
          </Row>
          <hr />
          <div className="text-center py-3">
            &copy; {new Date().getFullYear()} Electro Mart. All rights reserved.
          </div>
        </Container>
      </footer>
  );
}

export default Footer;