const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, message } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Steel & Zane Website" <${process.env.SMTP_USER}>`,
      to: process.env.TO_EMAIL || 'book@steelandzane.com',
      replyTo: email,
      subject: `New inquiry from ${name || email}`,
      text: [
        `Name:    ${name || '—'}`,
        `Email:   ${email}`,
        `Phone:   ${phone || '—'}`,
        `Message:\n${message || '—'}`,
      ].join('\n'),
      html: `
        <p><strong>Name:</strong> ${name || '—'}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || '—'}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space:pre-wrap">${message || '—'}</p>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Email send error:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
