import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import PlusButton from './PlusButton'; 

const Dashbord = () => {
  const [showPlusButton, setShowPlusButton] = useState(false); 

  
  const handleProjectsClick = () => {
    setShowPlusButton(true); 
  };
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <header className="navbar navbar-expand-lg navbar-dark bg-success shadow fixed-top">
        <div className="container-fluid">
          <h4 className="navbar-brand fw-bold">Y-Track LOGO</h4>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link text-white rounded-pill px-3" href="#">
                  <i className="bi bi-bell-fill me-1"></i> Notifications
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white rounded-pill px-3" href="#">
                  <i className="bi bi-person-circle me-1"></i> Profile
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white rounded-pill px-3" href="#">
                  <i className="bi bi-box-arrow-right me-1"></i> Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <div style={{ display: 'flex', flex: '1', paddingTop: '56px' }}>
        <nav
          className="col-md-3 col-lg-2 d-md-block bg-light sidebar p-3"
          style={{
            height: 'calc(100vh - 116px)',
            position: 'fixed',
            overflowY: 'auto',
          }}
        >
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link text-dark fw-bold" href="#">
                <i className="bi bi-house-door me-3"></i> Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="#" onClick={handleProjectsClick}>
                <i className="bi bi-file-earmark-text me-3"></i> Projects
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="#">
                <i className="bi bi-person-fill me-3"></i> Users
              </a>
            </li>

            {/* Other nav items */}
            <li className="nav-item">
              <a className="nav-link text-dark" href="#">
                <i className="bi bi-check-square me-3"></i> Tasks
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="#">
                <i className="bi bi-clock me-3"></i> Timesheet
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="#">
                <i className="bi bi-bar-chart me-3"></i> Tracker
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="#">
                <i className="bi bi-file-earmark-ruled me-3"></i> Invoices
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="#">
                <i className="bi bi-person-lines-fill me-3"></i> Contacts
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="#">
                <i className="bi bi-calendar-event me-3"></i> Calendar
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="#">
                <i className="bi bi-sticky me-3"></i> Notes
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="#">
                <i className="bi bi-file-earmark-text me-3"></i> Project Report
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="#">
                <i className="bi bi-bar-chart-line me-3"></i> Reports
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="#">
                <i className="bi bi-gear me-3"></i> Settings
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="#">
                <i className="bi bi-question-circle me-3"></i> Help
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="#">
                <i className="bi bi-chat-square-text me-3"></i> Feedback
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="#">
                <i className="bi bi-camera-video me-3"></i> Zoom Meeting
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="#">
                <i className="bi bi-plug me-3"></i> Integrations
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="#">
                <i className="bi bi-book me-3"></i> User Guide
              </a>
            </li>
          </ul>
        </nav>
        <main
          style={{
            flex: '1',
            marginLeft: '250px',
            overflowY: 'auto',
            height: 'calc(100vh - 116px)',
            padding: '20px',
            position: 'fixed',
            width: 'calc(100% - 250px)',
          }}
        >
      
          {showPlusButton ? (
            <div style={{ position: 'absolute', top: '-300px', left: '20px' }}>
              <PlusButton />
            </div>
          ) : (
            <div>
              <h1>Main Content</h1>
              <div style={{ height: '1500px' }}>
                <p>More content goes here...</p>
              </div>
            </div>
          )}
        </main>
      </div>
      <footer className="footer mt-auto py-3 bg-success text-white text-center fixed-bottom">
        <div className="container">
          <span>© 2024 Project Management Tool. All Rights Reserved.</span>
          <div className="mt-2">
            <a href="#" className="text-white me-2">Privacy Policy</a>
            <a href="#" className="text-white">Terms of Service</a>
          </div>
        </div>
      </footer>
      <style>
        {`
          .nav-link {
            transition: background-color 0.3s, color 0.3s, font-weight 0.3s, transform 0.3s;
            margin-right: 15px;
          }
          .nav-link:hover {
            background-color: #28a745; 
            color: white !important; 
            font-weight: bold; 
            transform: scale(1.05); 
            border-radius:10px;
          }
          .nav-link:hover i {
            color: white !important; 
          }
          .nav-link.active {
            color: white !important;
            font-weight: bold; 
          }
          .nav-link i {
            margin-right: 10px;
          }
          .sidebar {
            scrollbar-width: thin;
            scrollbar-color: #28a745 #f1f1f1;
          }
          .sidebar::-webkit-scrollbar {
            width: 6px;
          }
          .sidebar::-webkit-scrollbar-thumb {
            background-color: #28a745;
            border-radius: 10px;
          }
          .sidebar::-webkit-scrollbar-track {
            background: #f1f1f1;
          }
        `}
      </style>
    </div>
  );
};

export default Dashbord;
