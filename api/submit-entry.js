const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, location, address, vehicle, entryId } = req.body;

  if (!name || !email || !address || !vehicle) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM || 'Hannah Barron Outdoors <onboarding@resend.dev>',
      to: 'Officialmanagement@hannahbarronoutdoors.org',
      replyTo: email,
      subject: `New Giveaway Entry — ${name}`,
      html: `
        <h2 style="font-family:sans-serif;color:#1a3810">New Giveaway Entry</h2>
        <table style="font-family:sans-serif;font-size:15px;border-collapse:collapse" cellpadding="8">
          <tr><td style="color:#666;padding-right:24px"><strong>Entry ID</strong></td><td>${entryId}</td></tr>
          <tr><td style="color:#666"><strong>Name</strong></td><td>${name}</td></tr>
          <tr><td style="color:#666"><strong>Email</strong></td><td><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="color:#666"><strong>Phone</strong></td><td>${phone || '—'}</td></tr>
          <tr><td style="color:#666"><strong>City / State</strong></td><td>${location}</td></tr>
          <tr><td style="color:#666"><strong>Mailing Address</strong></td><td>${address}</td></tr>
          <tr><td style="color:#666"><strong>Dream Vehicle</strong></td><td><strong style="color:#e8640a">${vehicle}</strong></td></tr>
          <tr><td style="color:#666"><strong>Submitted</strong></td><td>${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })} CT</td></tr>
        </table>
        <p style="font-family:sans-serif;font-size:13px;color:#999;margin-top:24px">
          Reply to this email to contact the entrant directly.
        </p>
      `,
    });
    res.json({ ok: true });
  } catch (err) {
    console.error('Resend error:', err.message);
    res.status(500).json({ error: 'Email delivery failed' });
  }
};
