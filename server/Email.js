const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

class Email{
    static async sendEmail(recipient, subject, content){
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: recipient,
            subject: subject,
            text: content
        })
    }
}

module.exports = Email;