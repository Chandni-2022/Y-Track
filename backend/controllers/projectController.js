const Project = require('../models/projectModel.js'); 
const nodemailer = require('nodemailer'); 
const asyncHandler = require('express-async-handler')

const createProject = async (req, res) => {
    try {
        const { name, description, startDate, endDate, status, priority, teamMembers } = req.body; // Added emails to request body

        const project = 
        await Project.create({ name, description, startDate, endDate, status, priority, members: [] })
        .then( () => {
            console.log("Project created")
            //Add mail code
            sendEmails(
              name,
              description,
              startDate,
              endDate,
              status,
              priority,
              teamMembers
            )
            res.status(201).json("Hola!");
        })
        .catch(err => console.log(`Got an error : ${err.message}`))

        
    } catch (error) {
        console.error('Failed to create project:', error); // Log the error for debugging
        res.status(500).json({ message: 'Failed to create project', error: error.message });
    }
};


const sendEmails = asyncHandler(async (
  name,
  description,
  startDate,
  endDate,
  status,
  priority,
  teamMembers
) => {

    //first check the list of users exist in the DB

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const emailBody = `
    Project Details:

    - Name: ${name}
    - Description: ${description}
    - Start Date: ${new Date(
      startDate
    ).toLocaleDateString()}  // Format the date nicely
    - End Date: ${new Date(endDate).toLocaleDateString()}
    - Status: ${status}
    - Priority: ${priority}
    )}
`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: teamMembers,
    subject: `Project Details for ${name}`,
    text: emailBody,
  };
  await transporter.sendMail(mailOptions, (err => console.log(`Error in sending emails`)))
});

module.exports = {createProject}

