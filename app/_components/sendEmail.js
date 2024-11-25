// app/_components/sendEmail.js
'use server'

import nodemailer from 'nodemailer';

export async function sendEmail(formData) {
  const agentEmail = formData.get('agentEmail')
  const agentName = formData.get('agentName')
  const listingId = formData.get('listingId')
  const name = formData.get('name')
  const email = formData.get('email')
  const phone = formData.get('phone')
  const message = formData.get('message')

  // Create a transporter using SMTP
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Compose email
  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: agentEmail, // Send to the specific agent's email
    subject: `New inquiry for your listing #${listingId}`,
    text: `
      Dear ${agentName},

      You have received a new inquiry for your listing #${listingId}.

      Inquirer Details:
      Name: ${name}
      Email: ${email}
      Phone: ${phone}

      Message:
      ${message}

      Please respond to this inquiry as soon as possible.

      Best regards,
      Your Real Estate Platform
    `,
    html: `
      <h2>New inquiry for your listing #${listingId}</h2>
      <p>Dear ${agentName},</p>
      <p>You have received a new inquiry for your listing #${listingId}.</p>
      <h3>Inquirer Details:</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <h3>Message:</h3>
      <p>${message}</p>
      <p>Please respond to this inquiry as soon as possible.</p>
      <p>Best regards,<br>Your Real Estate Platform</p>
    `,
  };

  try {
    // Send email
    let info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
}