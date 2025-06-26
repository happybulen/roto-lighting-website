import * as brevo from '@getbrevo/brevo';

// Initialize Brevo API
const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY || '');

export async function sendQuoteRequestEmail(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  projectType?: string | null;
  details: string;
}) {
  console.log('=== EMAIL DEBUG START ===');
  console.log('BREVO_API_KEY exists:', !!process.env.BREVO_API_KEY);
  console.log('BREVO_API_KEY length:', process.env.BREVO_API_KEY?.length || 0);
  console.log('Quote request data:', JSON.stringify(data, null, 2));
  
  const sendSmtpEmail = new brevo.SendSmtpEmail();
  
  sendSmtpEmail.subject = `New Quote Request from ${data.firstName} ${data.lastName}`;
  sendSmtpEmail.to = [{ email: 'info@rotationalmoldingpros.com', name: 'Rotational Molding Pros' }];
  // Send from verified info@rotationalmoldingpros.com address
  sendSmtpEmail.sender = { name: 'Rotational Molding Pros Website', email: 'info@rotationalmoldingpros.com' };
  sendSmtpEmail.replyTo = { email: data.email, name: `${data.firstName} ${data.lastName}` };
  
  console.log('Email configuration:');
  console.log('- To:', sendSmtpEmail.to);
  console.log('- From:', sendSmtpEmail.sender);
  console.log('- Reply-to:', sendSmtpEmail.replyTo);
  console.log('- Subject:', sendSmtpEmail.subject);
  
  sendSmtpEmail.htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
        New Quote Request - Roto Lighting
      </h2>
      
      <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #374151; margin-top: 0;">Customer Information</h3>
        <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
        <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
        ${data.phone ? `<p><strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>` : ''}
        ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
      </div>
      
      <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #374151; margin-top: 0;">Project Details</h3>
        ${data.projectType ? `<p><strong>Project Type:</strong> ${data.projectType}</p>` : ''}
        <p><strong>Details:</strong></p>
        <div style="background-color: white; padding: 15px; border-radius: 5px; border-left: 4px solid #2563eb;">
          ${data.details.replace(/\n/g, '<br>')}
        </div>
      </div>
      
      <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 14px;">
          This message was sent from the Roto Lighting website contact form.
        </p>
      </div>
    </div>
  `;

  try {
    console.log('Sending email via Brevo API...');
    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('✅ Brevo API SUCCESS');
    console.log('Message ID:', result.body?.messageId);
    console.log('Status Code:', result.response?.statusCode);
    console.log('Rate Limit Remaining:', result.response?.headers['x-sib-ratelimit-remaining']);
    console.log('=== EMAIL DEBUG END ===');
    return { success: true, result };
  } catch (error: any) {
    console.log('❌ BREVO API ERROR');
    console.error('Error message:', error.message);
    console.error('Error status:', error.status);
    console.error('Error body:', error.body);
    if (error.response) {
      console.error('Response status:', error.response.statusCode);
      console.error('Response body:', error.response.body);
    }
    console.log('=== EMAIL DEBUG END ===');
    throw new Error(`Failed to send email: ${error.message}`);
  }
}

export async function sendEmailSubscriptionNotification(email: string) {
  const sendSmtpEmail = new brevo.SendSmtpEmail();
  
  sendSmtpEmail.subject = 'New Email Subscription - Roto Lighting';
  sendSmtpEmail.to = [{ email: 'info@rotationalmoldingpros.com', name: 'Rotational Molding Pros' }];
  sendSmtpEmail.sender = { name: 'Rotational Molding Pros Website', email: 'info@rotationalmoldingpros.com' };
  
  sendSmtpEmail.htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
        New Email Subscription
      </h2>
      
      <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>New subscriber:</strong> <a href="mailto:${email}">${email}</a></p>
        <p>This person has subscribed to receive updates from Roto Lighting.</p>
      </div>
      
      <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 14px;">
          This notification was sent from the Roto Lighting website.
        </p>
      </div>
    </div>
  `;

  try {
    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
    return { success: true, result };
  } catch (error) {
    console.error('Error sending subscription notification:', error);
    throw new Error('Failed to send subscription notification');
  }
}