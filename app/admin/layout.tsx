'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { auth, db } from '@/lib/firebase'
import { onAuthStateChanged, signOut, User } from 'firebase/auth'
import { doc, getDoc, collection, query, where, getCountFromServer } from 'firebase/firestore'
import {
  LayoutDashboard, Building2, Factory, Briefcase, Star, CreditCard,
  Mail, FileText, Users, Home, LayoutGrid, LogOut, ShieldAlert,
} from 'lucide-react'
import { toast } from 'sonner'

const NAV = [
  { href: '/admin', label: 'Overview', Icon: LayoutDashboard, exact: true },
  { href: '/admin/businesses', label: 'Businesses', Icon: Building2 },
  { href: '/admin/companies', label: 'Companies', Icon: Factory },
  { href: '/admin/jobs', label: 'Jobs', Icon: Briefcase },
  { href: '/admin/reviews', label: 'Reviews', Icon: Star },
  { href: '/admin/payments', label: 'Payment Proofs', Icon: CreditCard },
  { href: '/admin/messages', label: 'Messages', Icon: Mail },
  { href: '/admin/applications', label: 'Applications', Icon: FileText },
  { href: '/admin/users', label: 'Users', Icon: Users },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [state, setState] = useState<'loading' | 'denied' | 'ok'>('loading')
  const [user, setUser] = useState<User | null>(null)
  const [pendingTotal, setPendingTotal] = useState(0)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u)
      if (!u) {
        setState('denied')
        return
      }
      try {
        const snap = await getDoc(doc(db, 'users', u.uid))
        const role = snap.exists() ? (snap.data() as any).role : null
        setState(role === 'admin' ? 'ok' : 'denied')
      } catch {
        setState('denied')
      }
    })
    return () => unsub()
  }, [])

  // Total pending badge: businesses + companies + jobs + reviews + payment
  // proofs waiting for review. Aggregation counts only (getCountFromServer)
  // — no documents are read. Refreshed whenever the admin moves between
  // pages, so working through a queue drops the number.
  useEffect(() => {
    if (state !== 'ok') return
    let cancelled = false
    const load = async () => {
      const cols = ['businesses', 'companies', 'jobs', 'reviews', 'payment_proofs']
      const snaps = await Promise.all(
        cols.map((c) =>
          getCountFromServer(query(collection(db, c), where('status', '==', 'pending'))).catch(() => null)
        )
      )
      if (cancelled) return
      setPendingTotal(snaps.reduce((sum, s) => sum + (s ? s.data().count : 0), 0))
    }
    load()
    return () => {
      cancelled = true
    }
  }, [state, pathname])

  const handleSignOut = async () => {
    try {
      await signOut(auth)
    } catch {
      // ignore — redirect regardless
    }
    toast.success('You have been signed out.')
    router.push('/')
  }

  if (state === 'loading') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center font-sans">
        <p className="text-sm text-slate-500">Checking admin access...</p>
      </div>
    )
  }

  if (state === 'denied') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center font-sans px-4">
        <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center space-y-4 max-w-md w-full">
          <ShieldAlert className="w-12 h-12 text-red-400 mx-auto" />
          <h1 className="font-extrabold text-slate-900 text-xl">Access denied</h1>
          <p className="text-sm text-slate-500">
            This area is for LocalePak administrators only.
            {user ? ' Your account does not have the admin role.' : ' Please sign in with an admin account.'}
          </p>
          <div className="flex gap-3 justify-center pt-2">
            <Link href="/" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-colors">
              Back to Home
            </Link>
            {!user && (
              <Link href="/login" className="px-6 py-3 bg-white border border-slate-200 hover:border-blue-500 font-bold text-sm rounded-xl transition-colors">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="lg:w-64 shrink-0 bg-slate-900 text-white lg:min-h-screen">
        <div className="p-5 space-y-1 border-b border-white/10">
          <p className="font-extrabold text-lg tracking-tight">LocalePak Admin</p>
          <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
        </div>
        <nav className="p-3 flex lg:flex-col gap-1 overflow-x-auto" aria-label="Admin">
          {NAV.map(({ href, label, Icon, exact }) => {
            const active = exact ? pathname === href : pathname?.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${
                  active ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {label}
                {href === '/admin' && pendingTotal > 0 && (
                  <span
                    className="ml-auto inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-red-500 text-white text-[11px] font-extrabold"
                    aria-label={`${pendingTotal} items pending review`}
                  >
                    {pendingTotal}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>
        <div className="p-3 lg:border-t border-white/10 flex lg:flex-col gap-1">
          <Link href="/dashboard" className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:bg-white/10 hover:text-white whitespace-nowrap">
            <LayoutGrid className="w-4 h-4 shrink-0" /> My Dashboard
          </Link>
          <Link href="/" className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:bg-white/10 hover:text-white whitespace-nowrap">
            <Home className="w-4 h-4 shrink-0" /> Site Home
          </Link>
          <button
            type="button"
            onClick={handleSignOut}
            className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:bg-white/10 hover:text-white whitespace-nowrap cursor-pointer text-left"
          >
            <LogOut className="w-4 h-4 shrink-0" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Content */}
      <main id="main-content" className="flex-1 min-w-0 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  )
}
