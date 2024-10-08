import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const PlusButton = () => {
  const navigate = useNavigate();

  // Route to your form page for creating a project
  const redirectToForm = () => {
 dev-chand
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

    navigate('/create-project'); 
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundColor: '#4CAF50', 
        backgroundImage: `
          radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.1) 10%, transparent 10%),
          radial-gradient(circle at 80% 30%, rgba(255, 255, 255, 0.1) 15%, transparent 15%),
          radial-gradient(circle at 50% 70%, rgba(255, 255, 255, 0.15) 25%, transparent 25%),
          radial-gradient(circle at 40% 50%, rgba(255, 255, 255, 0.2) 10%, transparent 10%),
          radial-gradient(circle at 60% 80%, rgba(255, 255, 255, 0.25) 10%, transparent 10%),
          repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.2) 25%, transparent 25%),
          repeating-linear-gradient(-45deg, rgba(255, 255, 255, 0.2) 25%, transparent 25%),
          radial-gradient(circle at 70% 10%, rgba(255, 255, 255, 0.2) 5%, transparent 10%)
        `,
        backgroundSize: '200px 200px, 200px 200px, 200px 200px, 150px 150px, 150px 150px, 100px 100px, 100px 100px, 300px 300px',
        overflow: 'hidden', 
      }}
    >
      <Button
        variant="light"
        onClick={redirectToForm}
        style={{
          width: '120px',  
          height: '120px', 
          fontSize: '48px', 
          lineHeight: '120px', 
          border: '4px solid white', 
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          transition: 'transform 0.2s',
          borderRadius: '10px', 
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

     
      <div style={{
        position: 'absolute',
        top: '5%',
        left: '10%',
        width: '200px',
        height: '200px',
        background: 'rgba(255, 255, 255, 0.15)',
        borderRadius: '50%',
        filter: 'blur(20px)',
        zIndex: -1,
      }} />

      <div style={{
        position: 'absolute',
        top: '60%',
        right: '15%',
        width: '180px',
        height: '180px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
        filter: 'blur(15px)',
        zIndex: -1,
      }} />

      <div style={{
        position: 'absolute',
        bottom: '15%',
        left: '40%',
        width: '150px',
        height: '150px',
        background: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '50%',
        filter: 'blur(10px)',
        zIndex: -1,
      }} />

      <div style={{
        position: 'absolute',
        top: '70%',
        left: '30%',
        width: '100px',
        height: '100px',
        background: 'rgba(255, 255, 255, 0.25)',
        borderRadius: '50%',
        filter: 'blur(5px)',
        zIndex: -1,
      }} />
 main
    </Container>
  );
};

export default PlusButton;
