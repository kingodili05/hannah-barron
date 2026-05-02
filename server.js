require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const nodemailer = require('nodemailer');
const { Resend } = require('resend');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const resend = new Resend(process.env.RESEND_API_KEY);

const mailer = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/* ── Giveaway entry — notify management via Resend ─────────── */
app.post('/submit-entry', async (req, res) => {
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
});

app.post('/create-checkout-session', async (req, res) => {
  const { items } = req.body;

  if (!items || !items.length) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const itemLines = items
    .map(i => `  • ${i.name} x${i.qty}  —  $${(i.price * i.qty).toFixed(2)}`)
    .join('\n');

  // Email notification
  try {
    await mailer.sendMail({
      from: process.env.SMTP_USER,
      to: 'support@swiftandontime.cc',
      subject: `New checkout started — $${total.toFixed(2)}`,
      text: `Someone just clicked Proceed to Checkout on Hannah Barron Outdoors.\n\nCart:\n${itemLines}\n\nTotal: $${total.toFixed(2)}\n\nTime: ${new Date().toLocaleString()}`,
    });
  } catch (err) {
    console.error('Email failed:', err.message);
  }

  // Stripe Checkout Session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    billing_address_collection: 'required',
    line_items: items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.qty,
    })),
    mode: 'payment',
    success_url: `${process.env.DOMAIN}/success.html?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.DOMAIN}/store.html`,
  });

  res.json({ url: session.url });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
