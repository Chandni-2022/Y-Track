import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const PlusButton = () => {
  const navigate = useNavigate();

  // Route to your form page for creating a project
  const redirectToForm = () => {
    navigate('/create-project');
  };

  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center">
      <Row>
        <Col className="text-center">
          <Button
            variant="light"
            onClick={redirectToForm}
            className="square-btn"
            style={{
              width: '120px',  
              height: '120px',
              fontSize: '52px',
              color: 'green', 
              fontWeight: 'bold',
              textShadow: '0px 0px 10px rgba(255, 255, 255, 0.8)', 
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center', // Center-align '+' symbol
              border: '4px solid white', // White border around the square
              // backgroundColor: '#66BB6A', // Light green button background
              // backgroundImage: `
              //   radial-gradient(circle, rgba(255, 255, 255, 0.1) 20%, transparent 20%, transparent 80%, rgba(255, 255, 255, 0.1) 80%),
              //   radial-gradient(circle, rgba(255, 255, 255, 0.1) 20%, transparent 20%, transparent 80%, rgba(255, 255, 255, 0.1) 80%)
              // `,
              backgroundSize: '20px 20px', // Adjust pattern size to be more interesting
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)', 
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'; 
            }}
          >
            +
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default PlusButton;
