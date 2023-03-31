const nodemailer = require("nodemailer");

exports.SendEmail = async (MembershipDetails) => {
    try{
        let transporter = nodemailer.createTransport({
            host: "smtp-mail.outlook.com",
            port: 587,
            secure: false,
            auth: {
              user: process.env.EMAIL,
              pass: process.env.PASSWORD
            },
            tls: {
                ciphers:'SSLv3'
            }
          });
          transporter.verify(function (error, success) {
            if (error) {
              console.log(error);
            } else {
              console.log("Server is ready to take our messages");
            }
          });
          let mailOptions = {
            from: process.env.EMAIL,
            to: MembershipDetails.emailAddress,
            subject: 'Welcome to Muneland',
            html: `<p>Use the following PIN for authentication</p>`
          };
          
          await transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                throw new Error ('Unexpected Error while sending Email')
            } else {
                console.log('Email sent: ' + info.response);
                
            }
          });

          return true;
    }
    catch(err){
        console.log(err);
        return false;
    }
}