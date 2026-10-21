'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { auth } from '@/lib/firebase'
import { onAuthStateChanged, signOut, User } from 'firebase/auth'
import { User as UserIcon, Mail, ShieldCheck, LogOut, LayoutGrid, MapPin, BookOpen, HelpCircle } from 'lucide-react'
import { toast } from 'sonner'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
    return () => unsub()
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut(auth)
    } catch {
      // session cleanup below also applies when Firebase is not yet configured
    }
    sessionStorage.removeItem('localepak_user_session')
    localStorage.removeItem('localepak_user_session')
    toast.success('You have been signed out.')
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />

      <main id="main-content" className="flex-1 py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">My Dashboard</h1>
            <p className="text-sm text-slate-500">Your LocalePak account at a glance.</p>
          </div>

          {loading ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center text-sm text-slate-500">
              Loading your account...
            </div>
          ) : !user ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center space-y-4">
              <UserIcon className="w-10 h-10 text-slate-300 mx-auto" />
              <h2 className="font-extrabold text-slate-900 text-lg">You are not signed in</h2>
              <p className="text-sm text-slate-500 max-w-sm mx-auto">
                Sign in to view your account details. Browsing the directory is always free and does not need an account.
              </p>
              <div className="flex gap-3 justify-center pt-2">
                <Link href="/login" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-colors">
                  Sign In
                </Link>
                <Link href="/register" className="px-6 py-3 bg-white border border-slate-200 hover:border-blue-500 font-bold text-sm rounded-xl transition-colors">
                  Create Account
                </Link>
              </div>
            </div>
          ) : (
            <>
              <section className="bg-white rounded-3xl border border-slate-200 p-8 space-y-5" aria-label="Account details">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-extrabold text-xl">
                    {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="font-extrabold text-slate-900 text-lg">{user.displayName || 'LocalePak Member'}</h2>
                    <p className="text-xs text-slate-500 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5" />
                      {user.email}
                    </p>
                  </div>
                </div>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="bg-slate-50 rounded-2xl border border-slate-100 p-4">
                    <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Email status</dt>
                    <dd className="font-semibold text-slate-800 mt-1 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      {user.emailVerified ? 'Verified' : 'Not verified yet'}
                    </dd>
                  </div>
                  <div className="bg-slate-50 rounded-2xl border border-slate-100 p-4">
                    <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Account type</dt>
                    <dd className="font-semibold text-slate-800 mt-1">Member</dd>
                  </div>
                </dl>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </section>

              <section className="grid grid-cols-1 sm:grid-cols-3 gap-4" aria-label="Quick links">
                <Link href="/categories" className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-blue-500 transition-colors space-y-2">
                  <LayoutGrid className="w-6 h-6 text-blue-600" />
                  <h3 className="font-bold text-slate-900 text-sm">Browse Categories</h3>
                  <p className="text-xs text-slate-500">Explore all 24 business categories.</p>
                </Link>
                <Link href="/cities" className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-blue-500 transition-colors space-y-2">
                  <MapPin className="w-6 h-6 text-emerald-600" />
                  <h3 className="font-bold text-slate-900 text-sm">Explore Cities</h3>
                  <p className="text-xs text-slate-500">City guides from across Pakistan.</p>
                </Link>
                <Link href="/help-center" className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-blue-500 transition-colors space-y-2">
                  <HelpCircle className="w-6 h-6 text-amber-600" />
                  <h3 className="font-bold text-slate-900 text-sm">Help Center</h3>
                  <p className="text-xs text-slate-500">Answers and support options.</p>
                </Link>
              </section>

              <section className="bg-blue-50 border border-blue-100 rounded-3xl p-6 flex gap-4">
                <BookOpen className="w-6 h-6 text-blue-600 shrink-0" />
                <p className="text-sm text-slate-600 leading-relaxed">
                  <strong className="text-slate-900">Coming soon:</strong> free business listings. When listings open,
                  this dashboard is where you will manage your business profile. Read our{' '}
                  <Link href="/blog" className="text-blue-700 font-semibold hover:underline">listing guides on the blog</Link>{' '}
                  to prepare.
                </p>
              </section>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
