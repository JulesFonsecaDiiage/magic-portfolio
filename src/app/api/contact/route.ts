import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);
const contactEmail = process.env.CONTACT_EMAIL;

export async function POST(req: Request) {
  const { name, email, message } = await req.json();
  await resend.emails.send({
    from: 'Portfolio <onboarding@resend.dev>',
    to: contactEmail!,
    subject: `Contact portfolio - ${name}`,
    text: `Nom: ${name}\nEmail: ${email}\n\n${message}`,
  });
  return NextResponse.json({ ok: true });
}