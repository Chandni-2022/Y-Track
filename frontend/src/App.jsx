import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from "./components/Home.jsx";
import Signup from "./components/Signup.jsx"
import Login from "./components/Login.jsx"
import ForgotPassword from "./components/ForgotPassword.jsx";
import Dashboard from "./components/Dashboard.jsx";
import CreateProject from "./components/CreateProject.jsx";
import PlusButton from './components/PlusButton';




const App = () => {
  return <BrowserRouter >
          <Routes>
            <Route path="/" element={ <Home/> }/>
            <Route path="/signup" element={ <Signup /> }/>
            <Route path="/login" element={ <Login /> }/>
            <Route path="/forgot-password" element={ <ForgotPassword /> }/>
            <Route path="/dashboard" element={ <Dashboard /> }/>
            <Route path="/create-project" element={ <CreateProject /> }/>
            <Route path="/plus-btn" element={<PlusButton />} /> 

          </Routes>
    </BrowserRouter >
  
}

export default App
