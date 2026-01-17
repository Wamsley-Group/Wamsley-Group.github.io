const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  // Parse the form data
  let formData;
  try {
    formData = JSON.parse(event.body);
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid JSON' })
    };
  }

  // Get environment variables for email configuration
  const EMAIL_USER = process.env.EMAIL_USER || 'pipoat@mail.uc.edu';
  const EMAIL_PASS = process.env.EMAIL_PASS;
  const EMAIL_TO = process.env.EMAIL_TO || 'pipoat@mail.uc.edu';
  const SMTP_HOST = process.env.SMTP_HOST || 'smtp.office365.com';
  const SMTP_PORT = process.env.SMTP_PORT || 587;

  // Validate required environment variables
  if (!EMAIL_PASS) {
    console.error('EMAIL_PASS environment variable is not set');
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server configuration error' })
    };
  }

  // Create email transporter
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: false, // Use STARTTLS
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    },
    tls: {
      ciphers: 'SSLv3'
    }
  });

  // Format email based on form type
  let emailSubject = '';
  let emailBody = '';

  switch (formData.formType) {
    case 'contact':
      emailSubject = 'New Contact Form Submission - Wamsley Group';
      emailBody = `New Contact Form Submission

Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}
Service Inquiry: ${formData.service}
Timestamp: ${formData.timestamp}

Please follow up with this potential client as soon as possible.`;
      break;

    case 'referral':
      emailSubject = 'New Referral Submission - Wamsley Group';
      emailBody = `New Referral Submission

REFERRER INFORMATION:
Name: ${formData.referrer.firstName} ${formData.referrer.lastName}
Email: ${formData.referrer.email}
Phone: ${formData.referrer.phone}

REFERRED PERSON INFORMATION:
Name: ${formData.referred.firstName} ${formData.referred.lastName}
Email: ${formData.referred.email}
Phone: ${formData.referred.phone}
Service Interest: ${formData.referred.service}

Additional Notes: ${formData.referred.notes || 'None provided'}

Timestamp: ${formData.timestamp}

Please reach out to both the referrer and the referred person to follow up on this referral.`;
      break;

    case 'lead':
      emailSubject = 'New Lead Capture - GlassHouse Link Click';
      emailBody = `New Lead Capture Submission

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Source: ${formData.source}
Timestamp: ${formData.timestamp}
Target URL: ${formData.targetUrl}

This lead was captured when the user attempted to view GlassHouse listings.`;
      break;

    default:
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid form type' })
      };
  }

  // Send email
  try {
    await transporter.sendMail({
      from: `"Wamsley Group Website" <${EMAIL_USER}>`,
      to: EMAIL_TO,
      subject: emailSubject,
      text: emailBody,
      replyTo: formData.email || formData.referrer?.email
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true,
        message: 'Email sent successfully' 
      })
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to send email',
        details: error.message 
      })
    };
  }
};
