const nodemailer = require('nodemailer');
var sendEmail = function(req, res) {
    'use strict';
    var info = req.body;

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    nodemailer.createTestAccount((err, account) => {

        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // use SSL
            auth: {
                user: process.env.smtpEmail,
                pass: process.env.smtpPassword
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: `alexandruamugea@gmail.com`, // sender address
            to: 'alexandruamugea@gmail.com', // list of receivers
            subject: 'New booking', // Subject line
            text: `Date: ${info.date} Time: ${info.time} Services: ${info.services} Name: ${info.name} Phone: ${info.phone}`, // plain text body
            html: `Date: ${info.date} Time: ${info.time} Services: ${info.services} Name: ${info.name} Phone: ${info.phone}`
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, information) => {
            if (error) {
                res.redirect('/thank-you');
            }

            res.redirect('/thank-you');
        });
    });
};

module.exports = sendEmail;