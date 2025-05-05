import nodemailer from 'nodemailer';
import path from 'path';
import ejs from 'ejs';

const {MAIL_USER, MAIL_PASSWORD} = process.env;
const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASSWORD,
    },
});


export default async function (to, from, subject, template, data, attachments = []) {
    const templatePath = path.join(import.meta.dirname, "../views/email/", template + ".ejs")
    const html = await ejs.renderFile(templatePath, {data});
    const info = await transporter.sendMail({
        from: `"Maddison Foo Koch " <${MAIL_USER}>`,
        to,
        subject,
        html,
        attachments,
    });

    console.log("Message sent: %s", info.messageId);
}

