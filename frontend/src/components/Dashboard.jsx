import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Dashbord = () => {
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

      <div style={{ display: 'flex', flex: '1', marginTop: '56px' }}>
        <nav
          className="col-md-3 col-lg-2 d-md-block bg-light sidebar p-3"
          style={{ height: '100%', overflowY: 'auto' }}
        >
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link text-dark fw-bold" href="#">
                <i className="bi bi-house-door me-3"></i> Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="#">
                <i className="bi bi-person-fill me-3"></i> Users
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="#">
                <i className="bi bi-file-earmark-text me-3"></i> Projects
              </a>
            </li>
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
                <i className="bi bi-camera-video me-3"></i> Zoom Meeting
              </a>
            </li>
            {/* Repeat as necessary for additional items */}
          </ul>
        </nav>

        {/* Main Content */}
        
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

      <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>

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
        `}
      </style>
    </div>
  );
};

export default Dashbord;
