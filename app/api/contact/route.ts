import { NextRequest, NextResponse } from 'next/server'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const name = String(body?.name || '').trim()
    const email = String(body?.email || '').trim()
    const phone = String(body?.phone || '').trim()
    const subject = String(body?.subject || 'General Inquiry').trim()
    const message = String(body?.message || '').trim()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email and message are required.' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 })
    }

    await addDoc(collection(db, 'contactMessages'), {
      name,
      email,
      phone,
      subject,
      message,
      status: 'new',
      createdAt: serverTimestamp(),
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact form submission failed:', err)
    return NextResponse.json({ error: 'Could not send your message. Please try again.' }, { status: 500 })
  }
}
