import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from "./components/Home.jsx";
import Signup from "./components/Signup.jsx"
import Login from "./components/Login.jsx"

const App = () => {
  return <BrowserRouter >
          <Routes>
            <Route path="/welcome" element={ <Home/> }/>
            <Route path="/signup" element={ <Signup /> }/>
            <Route path="/login" element={ <Login /> }/>
          </Routes>
    </BrowserRouter >
  
}

export default App
