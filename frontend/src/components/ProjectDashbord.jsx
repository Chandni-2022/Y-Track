import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProjectDashboard = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('/api/projects');
                setProjects(response.data.projects);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div>
            <h2>Project Dashboard</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Priority</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map(project => (
                        <tr key={project._id}>
                            <td>{project.name}</td>
                            <td>{project.description}</td>
                            <td>{project.status}</td>
                            <td>{new Date(project.startDate).toLocaleDateString()}</td>
                            <td>{new Date(project.endDate).toLocaleDateString()}</td>
                            <td>{project.priority}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProjectDashboard;
