import React, { useState } from 'react';
import './ProjectCreationForm.css';

const ProjectCreationForm = () => {
  const [project, setProject] = useState({
    name: '',
    description: '',
    deadline: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!project.name) formErrors.name = 'Project name is required';
    if (!project.description) formErrors.description = 'Description is required';
    if (!project.deadline) formErrors.deadline = 'Deadline is required';
    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await fetch('/api/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(project),
        });

        if (response.ok) {
          alert('Project created successfully');
          setProject({ name: '', description: '', deadline: '' });
        } else {
          alert('Error creating project');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <form className="project-form" onSubmit={handleSubmit}>
      <div>
        <label>Project Name</label>
        <input
          type="text"
          name="name"
          value={project.name}
          onChange={handleChange}
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>
      <div>
        <label>Description</label>
        <textarea
          name="description"
          value={project.description}
          onChange={handleChange}
        ></textarea>
        {errors.description && <span className="error">{errors.description}</span>}
      </div>
      <div>
        <label>Deadline</label>
        <input
          type="date"
          name="deadline"
          value={project.deadline}
          onChange={handleChange}
        />
        {errors.deadline && <span className="error">{errors.deadline}</span>}
      </div>
      <button type="submit">Create Project</button>
    </form>
  );
};

export default ProjectCreationForm;
