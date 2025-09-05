import nodemailer from 'nodemailer'
import { NextRequest, NextResponse } from 'next/server'

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "apptreo.com",
  port: parseInt(process.env.EMAIL_PORT || "465"),
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER || "no-reply@apptreo.com",
    pass: process.env.EMAIL_PASS || "j%BUx%p]_smK",
  },
})

// Test the connection
transporter.verify((error, success) => {
  if (error) {
    console.error('Email transporter verification failed:', error)
  } else {
    console.log('Email transporter is ready to send emails')
  }
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, service, project, date, time, phone, chatHistory } = body

    // Format chat history for email
    const chatHistoryHtml = chatHistory && chatHistory.length > 0
      ? `
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Chat Conversation History:</h3>
          ${chatHistory.map((msg: any) => `
            <div style="margin: 10px 0; padding: 8px; background: ${msg.sender === 'user' ? '#e0e7ff' : '#ffffff'}; border-radius: 4px;">
              <strong>${msg.sender === 'user' ? 'Client' : 'AI Assistant'}:</strong> ${msg.text}
              <br><small style="color: #666;">${new Date(msg.timestamp).toLocaleString()}</small>
            </div>
          `).join('')}
        </div>
      `
      : ''

    // Email to business
    const businessEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #7c3aed;">New Appointment Scheduled</h2>
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Client Details:</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Project:</strong> ${project}</p>
          <p><strong>Scheduled Date:</strong> ${date}</p>
          <p><strong>Scheduled Time:</strong> ${time}</p>
        </div>
        ${chatHistoryHtml}
      </div>
    `

    // Email to client
    const clientEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #7c3aed;">Appointment Confirmed - Lumora Labs</h2>
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Hi ${name},</h3>
          <p>Thank you for scheduling a consultation with Lumora Labs!</p>
          <p><strong>Your appointment details:</strong></p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Time:</strong> ${time}</p>
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Project:</strong> ${project}</p>
          <br>
          <p>We'll send you a calendar invite and contact you at ${email} to confirm the details.</p>
          <p>If you need to reschedule, please reply to this email.</p>
          <br>
          <p>Best regards,<br>Lumora Labs Team</p>
        </div>
      </div>
    `

    // Send emails (with error handling)
    console.log('Attempting to send business email to:', process.env.BUSINESS_EMAIL)
    let businessEmailSent = false
    let clientEmailSent = false

    try {
      const businessResult = await transporter.sendMail({
        from: process.env.EMAIL_FROM || "no-reply@apptreo.com",
        to: process.env.BUSINESS_EMAIL || "support@apptreo.com",
        subject: `New Appointment: ${name} - ${service}`,
        html: businessEmailHtml,
      })
      console.log('Business email sent successfully:', businessResult.messageId)
      businessEmailSent = true
    } catch (businessEmailError) {
      console.error('Business email failed:', businessEmailError)
      // Continue with client email even if business email fails
    }

    console.log('Attempting to send client email to:', email)
    try {
      const clientResult = await transporter.sendMail({
        from: process.env.EMAIL_FROM || "no-reply@apptreo.com",
        to: email,
        subject: "Appointment Confirmed - Lumora Labs",
        html: clientEmailHtml,
      })
      console.log('Client email sent successfully:', clientResult.messageId)
      clientEmailSent = true
    } catch (clientEmailError) {
      console.error('Client email failed:', clientEmailError)
      // Continue even if client email fails
    }

    // Return success status
    if (businessEmailSent && clientEmailSent) {
      return NextResponse.json({ success: true, message: 'Appointment booked successfully - emails sent to both business and client' })
    } else if (businessEmailSent) {
      return NextResponse.json({ success: true, message: 'Appointment booked successfully - business email sent, client email failed' })
    } else if (clientEmailSent) {
      return NextResponse.json({ success: true, message: 'Appointment booked successfully - client email sent, business email failed' })
    } else {
      return NextResponse.json({ success: false, message: 'Appointment booked but failed to send emails' }, { status: 500 })
    }
  } catch (error) {
    console.error('Email sending error:', error)
    return NextResponse.json({ success: false, error: 'Failed to send emails' }, { status: 500 })
  }
}
