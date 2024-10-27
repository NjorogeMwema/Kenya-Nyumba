// app/_components/sendEmail.js
'use server'

export async function sendEmail(formData) {
  const agentEmail = formData.get('agentEmail')
  const message = formData.get('message')

  // In a real implementation, this would send an email
  console.log(`Sending email to ${agentEmail} with message: ${message}`)
  return { success: true }
}