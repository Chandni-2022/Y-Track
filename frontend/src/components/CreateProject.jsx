import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { Form } from 'react-router-dom';
import DatePicker from 'react-datepicker';

const CreateProject = () => {

    const [deadline, setDeadline] = useState(Date.now())
    
    const handleCreateProjectSubmit = () => {

    }
  return (
    <div>
        <div>
            <Form onSubmit={handleCreateProjectSubmit}>
                <Form.Group
                 controlId="projectName">
                    <Form.Label>Project Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter project name"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="projectDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        placeholder="Enter project description"
                    />
                </Form.Group>

                <Form.Group controlId="projectDeadline">
                    <Form.Label>Deadline</Form.Label>
                    <DatePicker
                        selected={deadline}
                        onChange={(date) => setDeadline(date)}
                        minDate={new Date()}
                        className="form-control"
                    />
                </Form.Group>

                <Form.Group controlId="projectStatus">
                    <Form.Label>Status</Form.Label>
                    <Form.Control as="select">
                        <option>Not Started</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="projectPriority">
                    <Form.Label>Priority</Form.Label>
                    <Form.Control as="select">
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </Form.Control>
                </Form.Group>


                <Button variant="primary" type="submit">
                Create Project
                </Button>
            </Form>
        </div>
    </div>
  );
  
}

export default CreateProject

{/* Add the code that is pasted below */}

{/* <Form.Group controlId="projectTeamMembers">
                    <Form.Label>Assign Team Members</Form.Label>
                    <Form.Control as="select" multiple>
                        // {/* Dynamically populate this with team members 
                        {allUsers && allUsers.map((user) => (
                        <option key={user._id} value={user._id}>
                            {user.name}
                        </option>
                        ))}
                    </Form.Control> 
                </Form.Group> */}