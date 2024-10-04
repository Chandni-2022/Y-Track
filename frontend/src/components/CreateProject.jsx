


import React, { useState } from 'react';
import { Button, Form, Alert, Container, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const CreateProject = () => {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [status, setStatus] = useState('Not Started');
  const [priority, setPriority] = useState('Low');
  const [step, setStep] = useState(1); // Step control for switching between forms
  const [teamMembers, setTeamMembers] = useState(['']); // Array to hold team member emails
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Form submission for Project Details
  const handleCreateProjectSubmit = (event) => {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    
    if (!projectName || !projectDescription) {
      setErrorMessage('Project name and description are required.');
      return;
    }
    
    // Move to Step 2: Invite team members
    setStep(2);
  };

  // Add Team Member Input dynamically
  const addTeamMember = () => {
    setTeamMembers([...teamMembers, '']);
  };

  // Handle email input changes
  const handleTeamMemberChange = (index, value) => {
    const updatedTeamMembers = [...teamMembers];
    updatedTeamMembers[index] = value;
    setTeamMembers(updatedTeamMembers);
  };

  // Validate email addresses
  const validateEmails = () => {
    for (let email of teamMembers) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return false;
      }
    }
    return true;
  };

  // Submit team invitations
  const handleTeamSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!validateEmails()) {
      setErrorMessage('Invalid email addresses.');
      return;
    }

    setLoading(true);
    try {
      // Post the project data including status and priority
      const response = await axios.post('http://localhost:5500/api/projects', {
        name: projectName,
        description: projectDescription,
        startDate,
        endDate,
        status,
        priority,
        
      });

      if (response.status === 201) {
        const projectId = response.data._id; // Assuming project ID is returned
        // Send team member invitations
        await axios.post(`http://localhost:5500/api/projects/${projectId}/invite`, { teamMembers });

        setSuccessMessage('Project created and team members invited successfully!');
        // Reset forms after success
        setProjectName('');
        setProjectDescription('');
        setStartDate(new Date());
        setEndDate(new Date());
        setStatus('Not Started');
        setPriority('Low');
        setTeamMembers(['']);
        setStep(1); // Reset to Step 1
      }
    } catch (error) {
      setErrorMessage('Error creating project or inviting team members. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4 p-5 border rounded shadow bg-light" style={{ maxWidth: '600px' }}>
      <h2 className="text-center mb-4">
        {step === 1 ? 'Create New Project' : 'Invite Team Members'}
      </h2>

      {errorMessage && (
        <Alert variant="danger" className="d-flex align-items-center">
          <FaExclamationCircle className="me-2" />
          {errorMessage}
        </Alert>
      )}
      {successMessage && (
        <Alert variant="success" className="d-flex align-items-center">
          <FaCheckCircle className="me-2" />
          {successMessage}
        </Alert>
      )}

      {step === 1 ? (
        <Form onSubmit={handleCreateProjectSubmit}>
          <Row>
            <Col md={12} className="mb-3">
              <Form.Group controlId="projectName">
                <Form.Label>Project Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter project name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  required
                  style={{ borderRadius: '0.5rem', borderColor: '#28a745' }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="mb-3">
              <Form.Group controlId="projectDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter project description"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  required
                  style={{ borderRadius: '0.5rem', borderColor: '#28a745' }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group controlId="projectStartDate">
                <Form.Label>Start Date</Form.Label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  minDate={new Date()}
                  className="form-control"
                  style={{ borderRadius: '0.5rem' }}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group controlId="projectEndDate">
                <Form.Label>End Date</Form.Label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  minDate={startDate}
                  className="form-control"
                  style={{ borderRadius: '0.5rem' }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group controlId="projectStatus">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  style={{ borderRadius: '0.5rem', borderColor: '#28a745' }}
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group controlId="projectPriority">
                <Form.Label>Priority</Form.Label>
                <Form.Control
                  as="select"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  style={{ borderRadius: '0.5rem', borderColor: '#28a745' }}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Button
            variant="success"
            type="submit"
            className="w-100"
            style={{ borderRadius: '0.5rem', padding: '0.75rem', fontWeight: 'bold' }}
          >
           Invite Team Members
          </Button>
        </Form>
      ) : (
        <Form onSubmit={handleTeamSubmit}>
          <Row>
            {teamMembers.map((email, index) => (
              <Col md={12} className="mb-3" key={index}>
                <Form.Group controlId={`teamMember-${index}`}>
                  <Form.Label>{index + 1} Team Member Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter team member email"
                    value={email}
                    onChange={(e) => handleTeamMemberChange(index, e.target.value)}
                    required
                    style={{ borderRadius: '0.5rem', borderColor: '#28a745' }}
                  />
                </Form.Group>
              </Col>
            ))}
          </Row>
          <Button
            variant="primary"
            onClick={addTeamMember}
            className="mb-3"
            style={{ borderRadius: '0.5rem' }}
          >
            Add Another Member
          </Button>
          <Button
            variant="success"
            type="submit"
            disabled={loading}
            className="w-100"
            style={{ borderRadius: '0.5rem', padding: '0.75rem', fontWeight: 'bold' }}
          >
            {loading ? 'Inviting...' : 'Send Invitations & Create Project'}
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default CreateProject;












// import React, { useState } from 'react';
// import { Button, Form, Alert, Container, Row, Col } from 'react-bootstrap';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import axios from 'axios';
// import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

// const CreateProject = () => {
//   const [projectName, setProjectName] = useState('');
//   const [projectDescription, setProjectDescription] = useState('');
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date());
//   const [status, setStatus] = useState('Not Started');
//   const [priority, setPriority] = useState('Low');
//   const [emails, setEmails] = useState(''); // New state for emails
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleCreateProjectSubmit = async (event) => {
//       event.preventDefault();
//       setErrorMessage('');
//       setSuccessMessage('');
//       setLoading(true);

//       // Validate form fields
//       if (!projectName || !projectDescription) {
//           setErrorMessage('Project name and description are required.');
//           setLoading(false);
//           return;
//       }

//       try {
//           const response = await axios.post('http://localhost:5500/api/projects', {
//               name: projectName,
//               description: projectDescription,
//               startDate,
//               endDate,
//               status,
//               priority,
//               emails: emails.split(',').map(email => email.trim()) // Split email addresses by commas
//           });

//           if (response.status === 201) {
//               setSuccessMessage('Project created successfully! Invitations sent to team members.');
//               // Reset form fields
//               setProjectName('');
//               setProjectDescription('');
//               setStartDate(new Date());
//               setEndDate(new Date());
//               setStatus('Not Started');
//               setPriority('Low');
//               setEmails(''); // Reset emails
//           }
//       } catch (error) {
//           setErrorMessage('Error creating project. Please try again.');
//           console.error(error);
//       } finally {
//           setLoading(false);
//       }
//   };

//   return (
//       <Container className="mt-4 p-5 border rounded shadow bg-light" style={{ maxWidth: '600px' }}>
//           <h2 className="text-center mb-4">Create New Project</h2>
//           {errorMessage && (
//               <Alert variant="danger" className="d-flex align-items-center">
//                   <FaExclamationCircle className="me-2" />
//                   {errorMessage}
//               </Alert>
//           )}
//           {successMessage && (
//               <Alert variant="success" className="d-flex align-items-center">
//                   <FaCheckCircle className="me-2" />
//                   {successMessage}
//               </Alert>
//           )}

//           <Form onSubmit={handleCreateProjectSubmit}>
//               <Row>
//                   <Col md={12} className="mb-3">
//                       <Form.Group controlId="projectName">
//                           <Form.Label>Project Name</Form.Label>
//                           <Form.Control
//                               type="text"
//                               value={projectName}
//                               onChange={(e) => setProjectName(e.target.value)}
//                               required
//                           />
//                       </Form.Group>
//                   </Col>
//                   <Col md={12} className="mb-3">
//                       <Form.Group controlId="projectDescription">
//                           <Form.Label>Project Description</Form.Label>
//                           <Form.Control
//                               as="textarea"
//                               rows={3}
//                               value={projectDescription}
//                               onChange={(e) => setProjectDescription(e.target.value)}
//                               required
//                           />
//                       </Form.Group>
//                   </Col>
//                   <Col md={6} className="mb-3">
//                       <Form.Group controlId="startDate">
//                           <Form.Label>Start Date</Form.Label>
//                           <DatePicker
//                               selected={startDate}
//                               onChange={(date) => setStartDate(date)}
//                               className="form-control"
//                           />
//                       </Form.Group>
//                   </Col>
//                   <Col md={6} className="mb-3">
//                       <Form.Group controlId="endDate">
//                           <Form.Label>End Date</Form.Label>
//                           <DatePicker
//                               selected={endDate}
//                               onChange={(date) => setEndDate(date)}
//                               className="form-control"
//                           />
//                       </Form.Group>
//                   </Col>
//                   <Col md={6} className="mb-3">
//                       <Form.Group controlId="status">
//                           <Form.Label>Status</Form.Label>
//                           <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
//                               <option>Not Started</option>
//                               <option>In Progress</option>
//                               <option>Completed</option>
//                           </Form.Select>
//                       </Form.Group>
//                   </Col>
//                   <Col md={6} className="mb-3">
//                       <Form.Group controlId="priority">
//                           <Form.Label>Priority</Form.Label>
//                           <Form.Select value={priority} onChange={(e) => setPriority(e.target.value)}>
//                               <option>Low</option>
//                               <option>Medium</option>
//                               <option>High</option>
//                           </Form.Select>
//                       </Form.Group>
//                   </Col>
//                   <Col md={12} className="mb-3">
//                       <Form.Group controlId="emails">
//                           <Form.Label>Team Member Emails (comma-separated)</Form.Label>
//                           <Form.Control
//                               type="text"
//                               value={emails}
//                               onChange={(e) => setEmails(e.target.value)}
//                               placeholder="Enter emails separated by commas"
//                           />
//                       </Form.Group>
//                   </Col>
//               </Row>
//               <Button type="submit" variant="primary" disabled={loading}>
//                   {loading ? 'Creating...' : 'Create Project'}
//               </Button>
//           </Form>
//       </Container>
//   );
// };

// export default CreateProject;
