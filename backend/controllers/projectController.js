const Project = require('../models/projectModel.js'); 
const nodemailer = require('nodemailer'); 
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel.js');

const createProject = async (req, res) => {

    try {
        const { name, description, startDate, endDate, status, priority, teamMembers } = req.body; // Added emails to request body

        const project = 
        await Project.create({ name, description, startDate, endDate, status, priority, members: [] })
        console.log("Project created")
            //Add mail code
          const invalidUsers = await sendEmails(
            name,
            description,
            startDate,
            endDate,
            status,
            priority,
            teamMembers
          )
          if(invalidUsers.length > 0) { 
            console.log("Invalid users exist");
            console.log("Invalid users", invalidUsers);


            return res.json({invalidUsersExist: true,message: invalidUsers})
          }
          console.log("Project created successfully!");
          res.status(201).json("Project created successfully, emails sent to team members!");

    } catch (error) {
        console.error('Failed to create project:', error.message);
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
    const { validUsers, invalidUsers } = await getUsers(teamMembers);
    console.log(validUsers);
    console.log(invalidUsers);

    if(invalidUsers.length === 0) {      
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
      await transporter.sendMail(mailOptions, (err => console.log(`Error in sending emails : ${err.message}`)))
      
    }
    return invalidUsers;
});

const getUsers = async (emails) => {
  const existingUsers = await User.find({ email: { $in: emails } });

  const validUsers = existingUsers.map(user => user.email)
  const invalidUsers = emails.filter(email => !validUsers.includes(email));

  return {validUsers, invalidUsers}

}
module.exports = {createProject}

