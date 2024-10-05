// const Project = require('../models/Project'); // Adjust if your path is different
// const nodemailer = require('nodemailer'); // For sending emails

// // Controller for creating a project
// const createProject = async (req, res) => {
//     try {
//         const { name, description, startDate, endDate, status, priority } = req.body;

//         const project = new Project({
//             name,
//             description,
//             startDate,
//             endDate,
//             status,
//             priority,
//             members: [] // Initialize members as an empty array
//         });

//         const createdProject = await project.save();
//         res.status(201).json(createdProject);
//     } catch (error) {
//         console.error('Failed to create project:', error); // Log the error for debugging
//         res.status(500).json({ message: 'Failed to create project', error: error.message });
//     }
// };

// // Controller for inviting members to a project
// const inviteMembers = async (req, res) => {
//     const { projectId } = req.params; // Get projectId from request parameters
//     const { emails } = req.body; // Get emails from request body

//     try {
//         // Find the project
//         const project = await Project.findById(projectId);
//         if (!project) {
//             return res.status(404).json({ message: 'Project not found' });
//         }

//         // Validate email addresses
//         const validEmails = emails.filter(email => {
//             const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email validation regex
//             return regex.test(email);
//         });

//         if (validEmails.length === 0) {
//             return res.status(400).json({ message: 'No valid email addresses provided' });
//         }

//         // Create transporter for sending emails
//         const transporter = nodemailer.createTransport({
//             service: 'gmail', // Change as per your email service
//             auth: {
//                 user: process.env.EMAIL_USER, // Your email
//                 pass: process.env.EMAIL_PASS, // Your email password or app-specific password
//             },
//             tls: {
//                 rejectUnauthorized: false // This can help in some environments
//             }
//         });

//         // Send invitations via email
//         const invitationPromises = validEmails.map(email => {
//             console.log(`Sending invitation to: ${email}`); // Log the email being sent
//             return transporter.sendMail({
//                 from: process.env.EMAIL_USER,
//                 to: email,
//                 subject: 'Project Invitation',
//                 text: `You have been invited to join the project: ${project.name}`,
//             }).catch(error => {
//                 console.error(`Failed to send email to ${email}:`, error); // Log any errors
//                 return { email, success: false, error: error.message }; // Return error information
//             });
//         });

//         // Await all email sending promises
//         const results = await Promise.all(invitationPromises);
//         console.log('Invitation results:', results); // Log the results of the invitations

//         // Add valid emails to the project's members array
//         project.members.push(...validEmails); // Ensure this matches your model's property
//         await project.save();

//         res.status(200).json({ message: 'Invitations sent successfully', validEmails });
//     } catch (error) {
//         console.error('Error inviting members:', error);
//         res.status(500).json({ message: 'Error inviting members', error: error.message });
//     }
// };

// module.exports = {
//     createProject,
//     inviteMembers,
// };


/*

const Project = require('../models/Project'); // Adjust if your path is different
const nodemailer = require('nodemailer'); // For sending emails

// Controller for creating a project
const createProject = async (req, res) => {
    try {
        const { name, description, startDate, endDate, status, priority, emails } = req.body; // Added emails to request body

        const project = new Project({
            name,
            description,
            startDate,
            endDate,
            status,
            priority,
            members: [] // Initialize members as an empty array
        });

        const createdProject = await project.save();
        
        // Send invitations to team members (newly added)
        if (emails && emails.length > 0) { // Check if emails are provided
            const invitationResults = await sendInvitations(emails, createdProject.name); // Call the sendInvitations function
            console.log('Invitation results:', invitationResults);
        }

        res.status(201).json(createdProject);
    } catch (error) {
        console.error('Failed to create project:', error); // Log the error for debugging
        res.status(500).json({ message: 'Failed to create project', error: error.message });
    }
};

// New function to send email invitations
const sendInvitations = async (emails, projectName) => {
    // Validate email addresses
    const validEmails = emails.filter(email => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email validation regex
        return regex.test(email);
    });

    if (validEmails.length === 0) {
        throw new Error('No valid email addresses provided'); // Throw error if no valid emails
    }

    // Create transporter for sending emails
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Change as per your email service
        auth: {
            user: process.env.EMAIL_USER, // Your email
            pass: process.env.EMAIL_PASS, // Your email password or app-specific password
        },
        tls: {
            rejectUnauthorized: false // This can help in some environments
        }
    });

    // Send invitations via email
    const invitationPromises = validEmails.map(email => {
        console.log(`Sending invitation to: ${email}`); // Log the email being sent
        return transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Project Invitation',
            text: `You have been invited to join the project: ${projectName}`, // Use the project name in the invitation
        }).catch(error => {
            console.error(`Failed to send email to ${email}:`, error); // Log any errors
            return { email, success: false, error: error.message }; // Return error information
        });
    });

    // Await all email sending promises
    return Promise.all(invitationPromises); // Return the results of the email sending
};

// Controller for inviting members to a project (this can be removed if invitations are sent during project creation)
const inviteMembers = async (req, res) => {
    const { projectId } = req.params; // Get projectId from request parameters
    const { emails } = req.body; // Get emails from request body

    try {
        // Find the project
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Validate email addresses
        const validEmails = emails.filter(email => {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email validation regex
            return regex.test(email);
        });

        if (validEmails.length === 0) {
            return res.status(400).json({ message: 'No valid email addresses provided' });
        }

        // Create transporter for sending emails
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Change as per your email service
            auth: {
                user: process.env.EMAIL_USER, // Your email
                pass: process.env.EMAIL_PASS, // Your email password or app-specific password
            },
            tls: {
                rejectUnauthorized: false // This can help in some environments
            }
        });

        // Send invitations via email
        const invitationPromises = validEmails.map(email => {
            console.log(`Sending invitation to: ${email}`); // Log the email being sent
            return transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Project Invitation',
                text: `You have been invited to join the project: ${project.name}`,
            }).catch(error => {
                console.error(`Failed to send email to ${email}:`, error); // Log any errors
                return { email, success: false, error: error.message }; // Return error information
            });
        });

        // Await all email sending promises
        const results = await Promise.all(invitationPromises);
        console.log('Invitation results:', results); // Log the results of the invitations

        // Add valid emails to the project's members array
        project.members.push(...validEmails); // Ensure this matches your model's property
        await project.save();

        res.status(200).json({ message: 'Invitations sent successfully', validEmails });
    } catch (error) {
        console.error('Error inviting members:', error);
        res.status(500).json({ message: 'Error inviting members', error: error.message });
    }
};

module.exports = {
    createProject,
    inviteMembers,
};


*/