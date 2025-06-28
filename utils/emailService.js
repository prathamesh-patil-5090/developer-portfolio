import emailjs from '@emailjs/browser';

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID_OWNER = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_OWNER;
const TEMPLATE_ID_USER = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_USER;
const USER_ID = process.env.NEXT_PUBLIC_EMAILJS_USER_ID;

export const sendContactFormEmail = async (formData) => {
  if (!SERVICE_ID || !TEMPLATE_ID_OWNER || !TEMPLATE_ID_USER || !USER_ID) {
    throw new Error('EmailJS configuration error. Credentials missing.');
  }

  // 1. Send email to yourself (owner)
  const ownerParams = {
    ...formData,
    to_email: "prathampatil7798@gmail.com", // Hardcoded owner email
  };

  // 2. Send auto-reply to user
  const userParams = {
    ...formData,
    to_email: formData.email, // User's email from the form
  };

  try {
    // Send email to owner
    await emailjs.send(SERVICE_ID, TEMPLATE_ID_OWNER, ownerParams, USER_ID);
    
    // Send auto-reply to user
    await emailjs.send(SERVICE_ID, TEMPLATE_ID_USER, userParams, USER_ID);
    
    return { success: true, message: 'Message sent successfully!' };
  } catch (error) {
    console.error('EmailJS Error:', error.text || error);
    throw new Error(`Failed to send message: ${error.text || error}. Please try again.`);
  }
};

// Fallback function using the original API route
export const sendContactFormViaAPI = async (formData) => {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Failed to send message via API');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error(`API Error: ${error.message}`);
  }
};
