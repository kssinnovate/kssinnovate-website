const nodemailer = require("nodemailer");

exports.handler = async function (event) {
  const { payload } = JSON.parse(event.body);
  const { name, email, number, message } = payload.data;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"KSS Innovate Request Notifications" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    replyTo: email,
    subject: `New Quote Request from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #0056b3, #003d82); padding: 24px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 22px;">KSS Innovate</h1>
          <p style="color: #cce0ff; margin: 4px 0 0; font-size: 14px;">New Customer Quote Request</p>
        </div>
        <div style="padding: 24px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #333; width: 120px;">Name:</td>
              <td style="padding: 12px; border-bottom: 1px solid #f0f0f0; color: #555;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #333;">Email:</td>
              <td style="padding: 12px; border-bottom: 1px solid #f0f0f0; color: #555;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #333;">Phone:</td>
              <td style="padding: 12px; border-bottom: 1px solid #f0f0f0; color: #555;"><a href="tel:${number}">${number}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: bold; color: #333; vertical-align: top;">Message:</td>
              <td style="padding: 12px; color: #555;">${message}</td>
            </tr>
          </table>
        </div>
        <div style="background: #f8f9fa; padding: 16px; text-align: center; font-size: 12px; color: #888;">
          <p style="margin: 0;">This notification was sent from the KSS Innovate website contact form.</p>
          <p style="margin: 4px 0 0;">Reply directly to this email to respond to ${name}.</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { statusCode: 200, body: "Email sent successfully" };
  } catch (error) {
    console.error("Email error:", error);
    return { statusCode: 500, body: "Failed to send email" };
  }
};

