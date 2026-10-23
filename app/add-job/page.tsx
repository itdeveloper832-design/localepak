'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Briefcase, ArrowRight, Info } from 'lucide-react'
import { toast } from 'sonner'
import { auth, db } from '@/lib/firebase'
import { onAuthStateChanged, User } from 'firebase/auth'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { CITIES } from '@/lib/data'
import CityCombobox from '@/components/city-combobox'

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Remote', 'Internship']

const inputClass =
  'w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-600'
const labelClass = 'block text-xs font-bold text-slate-700 mb-1'

export default function AddJobPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [title, setTitle] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [city, setCity] = useState('')
  const [jobType, setJobType] = useState('')
  const [salaryRange, setSalaryRange] = useState('')
  const [contact, setContact] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) {
        router.push('/login')
        return
      }
      setUser(u)
      setAuthLoading(false)
    })
    return () => unsub()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    setIsSubmitting(true)
    try {
      await addDoc(collection(db, 'jobs'), {
        title: title.trim(),
        slug: `${slugify(title)}-${slugify(city)}`,
        companyName: companyName.trim(),
        city,
        jobType,
        salaryRange: salaryRange.trim(),
        contact: contact.trim(),
        description: description.trim(),
        ownerId: user.uid,
        ownerEmail: user.email || '',
        ownerName: user.displayName || '',
        status: 'pending',
        createdAt: serverTimestamp(),
      })
      toast.success('Job submitted for review.')
      router.push('/dashboard')
    } catch (err: any) {
      toast.error(`Could not submit your job post: ${err?.message || 'Unknown error'}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (authLoading) {
    return (
      <>
        <Navbar />
        <main className="bg-[#F8FAFC] min-h-screen py-16 px-4 flex items-center justify-center">
          <p className="text-sm text-slate-400">Loading...</p>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="bg-[#F8FAFC] text-slate-800 font-sans min-h-screen py-16 px-4 flex items-center justify-center">
        <div className="max-w-lg w-full bg-white border border-slate-200 rounded-3xl p-8 shadow-xl">
          <div className="text-center mb-8">
            <div className="inline-flex p-3 rounded-2xl bg-amber-50 text-amber-600 mb-3">
              <Briefcase className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Post a Job</h1>
            <p className="text-xs text-slate-500 mt-1">Free job post — reach candidates across Pakistan</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={labelClass}>Job Title *</label>
              <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Sales Executive" className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>Company Name *</label>
              <input type="text" required value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Pak Tech Solutions" className={inputClass} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>City *</label>
                <CityCombobox required value={city} onChange={setCity} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Job Type *</label>
                <select required value={jobType} onChange={(e) => setJobType(e.target.value)} className={inputClass}>
                  <option value="" disabled>Select job type</option>
                  {JOB_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className={labelClass}>Salary Range</label>
              <input type="text" value={salaryRange} onChange={(e) => setSalaryRange(e.target.value)} placeholder="PKR 60,000 – 80,000 / month" className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>Apply — Phone or Email *</label>
              <input type="text" required value={contact} onChange={(e) => setContact(e.target.value)} placeholder="+92 300 1234567 or hr@company.pk" className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>Job Description *</label>
              <textarea required value={description} onChange={(e) => setDescription(e.target.value)} rows={5} placeholder="Describe the role, responsibilities, required experience, and how to apply." className={inputClass} />
            </div>

            <div className="flex gap-2.5 p-3.5 bg-blue-50 border border-blue-100 rounded-xl text-xs text-slate-600">
              <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>Your job post goes through a quick review and appears publicly on LocalePak after approval.</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Posting...' : 'Post Job'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  )
}
