const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // 1) Create a transporter

  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: "lucasnothing70@outlook.com",
      pass: "!A123bbC234",
    },

    // Activate in gmail "less secure app" option
  });

  // 2) Define the email options

  /* const mailOptions = {
    from: "admin <admin@gmail.co>",
    to: options.email,
    subject: options.subject,
    text: options.message,
    //html:
  }; */
  const mailOptions = {
    from: "lucasnothing70@outlook.com",
    to: "lucasnothing67@gmail.com",
    subject: "Invoice",
    text: "AYO",
    //html:
  };

  //3) Actually send the email
  let info = await transporter.sendMail(mailOptions);

  return info.response;
};


module.exports = sendEmail;
