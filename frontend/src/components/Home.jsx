
import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";



const Home = () => {
  

  return (
    <div>
      
        <Container fluid className="d-flex vh-100">
        <Row className="m-auto">
            <Col className="text-center">
                <Button variant="primary" size="lg" className="mx-2" > Register </Button>           

                <Button variant="success" size="lg" className="mx-2" > Login </Button>
            </Col>
        </Row>
        </Container>
    </div>
  );
};

export default Home;