
import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";



const Home = () => {
  

  return (
    <div>
      
        <Container fluid className="d-flex vh-100">
        <Row className="m-auto">
            <Col className="text-center">
                <Link to='/signup'>                 
                <Button variant="primary" size="lg" className="mx-2" > Register </Button>           
                </Link>

                <Link to='/login'>                 
                <Button variant="success" size="lg" className="mx-2" > Login </Button>
                </Link>

            </Col>
        </Row>
        </Container>
    </div>
  );
};

export default Home;