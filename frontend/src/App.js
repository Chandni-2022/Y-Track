import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Signup from './components/Signup'
import { Button, Col, Container, Row } from 'react-bootstrap';
import Login from './components/Login';

/*const App = () => {
  const [showSignup, setShowSignup] = useState(false)
  const [showSignin, setShowSignin] = useState(false)

  const handleSignUpClick = () => { 
          setShowSignup(true)
          setShowSignin(false)
  }
  const handleSigninClick = () => { 
          setShowSignin(true)
          setShowSignup(false)
  }

  return (
    <div>
      {
        (!showSignin && !showSignup)? 
        (
          <div>
            <Button variant="primary" size='lg' onClick={ handleSignUpClick } >Sign up</Button>
            <Button variant="secondary" size='lg' onClick={ handleSigninClick }>Sign in</Button>
          </div>
        )
        :
        showSignup? <Signup /> : <Login /> 
      }

   </div>
  );
}
*/


const App = () => {
  
  const [view, setView] = useState('')

  const handleRegisterClick = () => setView('register')
  const handleLoginClick = () => setView('login')

  return (
    <div>
      { view === '' && (
        <>
          <Container fluid className="d-flex vh-100" >
            <Row className="m-auto">
              <Col className="text-center">

                <Button variant="primary" size="lg" className="mx-2" 
                  onClick={ handleRegisterClick } > Register </Button>

                <Button variant="success" size="lg" className="mx-2"
                  onClick={ handleLoginClick } > Login </Button>

              </Col>
            </Row>
          </Container>
        </>
      )}
      {view === 'register' && <Signup />}
      {view === 'login' && <Login />}
    </div>
  );
}
export default App
