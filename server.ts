import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(express.json());

  // SMTP Transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Test SMTP connection on startup
  try {
    await transporter.verify();
    console.log('SMTP connection verified successfully.');
  } catch (err) {
    console.error('SMTP connection verification failed:', err);
  }

  // API endpoint for contact mail
  app.post('/api/sendmail', async (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: process.env.CONTACT_RECEIVER_EMAIL,
      subject: `Portfolio Contact: Message from ${name}`,
      text: `You received a message from: ${name} (${email})\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h2 style="color: #4f46e5; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px; margin-top: 0;">New Portfolio Message</h2>
          <p><strong>From:</strong> ${name} (&lt;${email}&gt;)</p>
          <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px; margin-top: 15px; white-space: pre-wrap; font-size: 14px; line-height: 1.5;">
            ${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
          </div>
        </div>
      `,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Message sent: %s', info.messageId);
      return res.status(200).json({ success: true, messageId: info.messageId });
    } catch (error: any) {
      console.error('Error sending mail:', error);
      return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
  });

  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.use('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist/index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`Server running in ${isProd ? 'production' : 'development'} mode at http://localhost:${port}`);
  });
}

startServer();
