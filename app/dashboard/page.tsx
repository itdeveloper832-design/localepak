'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { auth, db, storage } from '@/lib/firebase'
import { onAuthStateChanged, signOut, User } from 'firebase/auth'
import { collection, query, where, getDocs, doc, getDoc, addDoc, serverTimestamp } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { User as UserIcon, Mail, ShieldCheck, LogOut, LayoutGrid, MapPin, HelpCircle, Building2, Factory, Briefcase, PlusCircle, ClipboardList, Crown, BadgeCheck, X, Upload, ShieldAlert } from 'lucide-react'
import { toast } from 'sonner'
import { isReleased, releaseDateLabel } from '@/lib/release'

type ListingItem = {
  id: string
  type: 'Business' | 'Company' | 'Job'
  name: string
  status: string
  approvedAt?: any
  rejectionReasons?: string[]
  rejectionNote?: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState<ListingItem[]>([])
  const [listingsLoading, setListingsLoading] = useState(false)
  const [role, setRole] = useState<string>('member')
  const [proofs, setProofs] = useState<Record<string, { status: string; plan: string }>>({})
  const [upgradeFor, setUpgradeFor] = useState<string | null>(null)
  const [upgradePlan, setUpgradePlan] = useState<'featured' | 'verified'>('featured')
  const [upgradeFile, setUpgradeFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
    return () => unsub()
  }, [])

  useEffect(() => {
    if (!user) return
    let cancelled = false
    const loadListings = async () => {
      setListingsLoading(true)
      const sources: Array<{ col: string; type: ListingItem['type'] }> = [
        { col: 'businesses', type: 'Business' },
        { col: 'companies', type: 'Company' },
        { col: 'jobs', type: 'Job' },
      ]
      const results: ListingItem[] = []
      for (const source of sources) {
        try {
          const snap = await getDocs(query(collection(db, source.col), where('ownerId', '==', user.uid)))
          snap.forEach((d) => {
            const data = d.data() as any
            results.push({
              id: d.id,
              type: source.type,
              name: data.name || data.title || data.companyName || 'Untitled listing',
              status: data.status || 'pending',
              approvedAt: data.approvedAt ?? null,
              rejectionReasons: Array.isArray(data.rejectionReasons) ? data.rejectionReasons : [],
              rejectionNote: data.rejectionNote || '',
            })
          })
        } catch {
          // Collection may not exist yet or Firebase may not be configured — treat as empty.
        }
      }
      if (!cancelled) {
        setListings(results)
        setListingsLoading(false)
      }
    }
    loadListings()
    return () => {
      cancelled = true
    }
  }, [user])

  // Role (for the Admin Panel link) + this owner's payment-proof statuses.
  useEffect(() => {
    if (!user) return
    let cancelled = false
    const load = async () => {
      try {
        const snap = await getDoc(doc(db, 'users', user.uid))
        if (!cancelled && snap.exists()) setRole((snap.data() as any).role || 'member')
      } catch {
        // Role stays 'member' — the admin link simply stays hidden.
      }
      try {
        const snap = await getDocs(query(collection(db, 'payment_proofs'), where('ownerId', '==', user.uid)))
        const map: Record<string, { status: string; plan: string; ts: number }> = {}
        snap.forEach((d) => {
          const data = d.data() as any
          if (!data.listingId) return
          const ts = data.createdAt?.toMillis?.() || 0
          if (!map[data.listingId] || ts > map[data.listingId].ts) {
            map[data.listingId] = { status: data.status || 'pending', plan: data.plan || 'featured', ts }
          }
        })
        if (!cancelled) setProofs(map)
      } catch {
        // No proofs yet, or Firebase not configured — badges stay hidden.
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [user])

  const handleUpgradeSubmit = async (item: ListingItem) => {
    if (!user) return
    if (!upgradeFile) {
      toast.error('Please choose your payment screenshot first.')
      return
    }
    if (!upgradeFile.type.startsWith('image/')) {
      toast.error('The proof must be an image file.')
      return
    }
    if (upgradeFile.size > 5 * 1024 * 1024) {
      toast.error('The image must be under 5MB.')
      return
    }
    setUploading(true)
    try {
      const path = `payment-proofs/${user.uid}/${item.id}-${Date.now()}`
      const storageRef = ref(storage, path)
      await uploadBytes(storageRef, upgradeFile)
      const proofUrl = await getDownloadURL(storageRef)
      await addDoc(collection(db, 'payment_proofs'), {
        listingId: item.id,
        listingType: item.type === 'Company' ? 'company' : 'business',
        listingName: item.name,
        ownerId: user.uid,
        ownerEmail: user.email || '',
        plan: upgradePlan,
        proofUrl,
        status: 'pending',
        createdAt: serverTimestamp(),
      })
      setProofs((prev) => ({ ...prev, [item.id]: { status: 'pending', plan: upgradePlan } }))
      setUpgradeFor(null)
      setUpgradeFile(null)
      toast.success('Payment proof submitted — our admin will verify it shortly.')
    } catch (err: any) {
      toast.error(`Upload failed: ${err?.message || 'Unknown error'}`)
    } finally {
      setUploading(false)
    }
  }

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
                    <dd className="font-semibold text-slate-800 mt-1 capitalize">{role === 'admin' ? 'Admin' : 'Member'}</dd>
                  </div>
                </dl>
                <div className="flex flex-wrap gap-3">
                  {role === 'admin' && (
                    <Link
                      href="/admin"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors"
                    >
                      <ShieldAlert className="w-4 h-4" />
                      Admin Panel
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
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

              <section className="grid grid-cols-1 sm:grid-cols-3 gap-4" aria-label="Add a listing">
                <Link href="/add-business" className="bg-white rounded-3xl border-2 border-blue-100 p-6 hover:border-blue-500 hover:shadow-lg transition-all space-y-3 group">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-slate-900">Add Business</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">Free listing — appear in search and get customer calls directly.</p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600">
                    <PlusCircle className="w-4 h-4" /> Add now
                  </span>
                </Link>
                <Link href="/add-company" className="bg-white rounded-3xl border-2 border-emerald-100 p-6 hover:border-emerald-500 hover:shadow-lg transition-all space-y-3 group">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Factory className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-slate-900">Add Company</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">Free company profile — appear in search and build trust with buyers.</p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                    <PlusCircle className="w-4 h-4" /> Add now
                  </span>
                </Link>
                <Link href="/add-job" className="bg-white rounded-3xl border-2 border-amber-100 p-6 hover:border-amber-500 hover:shadow-lg transition-all space-y-3 group">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-slate-900">Post a Job</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">Free job post — reach candidates and get applications on your phone.</p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600">
                    <PlusCircle className="w-4 h-4" /> Post now
                  </span>
                </Link>
              </section>

              <section className="bg-white rounded-3xl border border-slate-200 p-8 space-y-5" aria-label="My listings">
                <h2 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
                  <ClipboardList className="w-5 h-5 text-blue-600" />
                  My Listings
                </h2>
                {listingsLoading ? (
                  <p className="text-sm text-slate-500">Loading your listings...</p>
                ) : listings.length === 0 ? (
                  <div className="text-center py-6 space-y-3">
                    <p className="text-sm text-slate-500">No listings yet — add your first business</p>
                    <Link href="/add-business" className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors">
                      <PlusCircle className="w-4 h-4" /> Add Business
                    </Link>
                  </div>
                ) : (
                  <ul className="divide-y divide-slate-100">
                    {listings.map((item) => {
                      const proof = proofs[item.id]
                      const upgradeable = item.type === 'Business' || item.type === 'Company'
                      const panelOpen = upgradeFor === item.id
                      // Businesses publish in a weekly batch (lib/release.ts):
                      // an approved business whose release is still pending
                      // gets a "goes live on" note instead of looking live.
                      const awaitingRelease =
                        item.type === 'Business' && item.status === 'approved' && !isReleased(item.approvedAt, Date.now())
                      return (
                        <li key={`${item.type}-${item.id}`} className="py-3.5 space-y-3">
                          <div className="flex items-center justify-between gap-3">
                            <div className="min-w-0">
                              <p className="font-bold text-slate-900 text-sm truncate">{item.name}</p>
                              <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">{item.type}</p>
                            </div>
                            <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
                              {proof && (
                                <span
                                  className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                                    proof.status === 'approved'
                                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                                      : proof.status === 'rejected'
                                        ? 'bg-red-50 text-red-700 border-red-200'
                                        : 'bg-slate-100 text-slate-600 border-slate-200'
                                  }`}
                                >
                                  {proof.plan === 'verified' ? 'Verified' : 'Featured'} proof:{' '}
                                  {proof.status === 'approved' ? 'Approved' : proof.status === 'rejected' ? 'Rejected' : 'Pending review'}
                                </span>
                              )}
                              <span
                                className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                                  item.status === 'approved'
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                    : item.status === 'rejected'
                                      ? 'bg-red-50 text-red-700 border-red-200'
                                      : 'bg-amber-50 text-amber-700 border-amber-200'
                                }`}
                              >
                                {item.status === 'approved' ? 'Approved' : item.status === 'rejected' ? 'Rejected' : 'Pending review'}
                              </span>
                              {upgradeable && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setUpgradeFor(panelOpen ? null : item.id)
                                    setUpgradeFile(null)
                                  }}
                                  aria-expanded={panelOpen}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-[11px] rounded-full transition-colors cursor-pointer"
                                >
                                  <Crown className="w-3.5 h-3.5" /> Upgrade
                                </button>
                              )}
                            </div>
                          </div>

                          {awaitingRelease && (
                            <p className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2">
                              Approved — goes live on LocalePak on {releaseDateLabel(Date.now())}
                            </p>
                          )}

                          {item.status === 'rejected' && (
                            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 space-y-2" role="alert">
                              <p className="text-xs font-extrabold text-red-700 flex items-center gap-1.5">
                                <ShieldAlert className="w-4 h-4" /> This listing was not approved
                              </p>
                              {item.rejectionReasons && item.rejectionReasons.length > 0 && (
                                <ul className="list-disc pl-5 text-xs text-red-700 space-y-0.5">
                                  {item.rejectionReasons.map((r) => (
                                    <li key={r}>{r}</li>
                                  ))}
                                </ul>
                              )}
                              {item.rejectionNote && (
                                <p className="text-xs text-red-700">Reviewer note: {item.rejectionNote}</p>
                              )}
                              <p className="text-xs text-red-700">
                                Fix these issues and create a new listing — this one cannot be re-approved as it stands.
                              </p>
                              <Link
                                href={item.type === 'Company' ? '/add-company' : item.type === 'Job' ? '/add-job' : '/add-business'}
                                className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-[11px] rounded-lg transition-colors"
                              >
                                <PlusCircle className="w-3.5 h-3.5" /> Create a New Listing
                              </Link>
                            </div>
                          )}

                          {upgradeable && panelOpen && (
                            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                              <div className="flex items-start justify-between gap-3">
                                <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                                  <BadgeCheck className="w-4 h-4 text-blue-600" />
                                  Upgrade “{item.name}”
                                </h3>
                                <button
                                  type="button"
                                  onClick={() => setUpgradeFor(null)}
                                  className="text-slate-400 hover:text-slate-600 cursor-pointer"
                                  aria-label="Close upgrade panel"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                              <div>
                                <label htmlFor={`plan-${item.id}`} className="block text-xs font-bold text-slate-700 mb-1">
                                  Choose your upgrade
                                </label>
                                <select
                                  id={`plan-${item.id}`}
                                  value={upgradePlan}
                                  onChange={(e) => setUpgradePlan(e.target.value as 'featured' | 'verified')}
                                  className="w-full sm:w-64 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600"
                                >
                                  <option value="featured">Featured Listing</option>
                                  <option value="verified">Verified Badge</option>
                                </select>
                              </div>
                              <p className="text-xs text-slate-500 leading-relaxed">
                                Pay via the details shared by our team on the{' '}
                                <Link href="/advertise-with-us" className="text-blue-600 font-semibold hover:underline">Advertise page</Link>{' '}
                                or by contacting us, then upload your payment screenshot here — our admin will verify it.
                                Featured placement and the Verified Badge are rolling out, so an approved upgrade is
                                recorded on your listing now and displayed as each feature goes live.
                              </p>
                              <div>
                                <label htmlFor={`proof-${item.id}`} className="block text-xs font-bold text-slate-700 mb-1">
                                  Payment screenshot (image, max 5MB)
                                </label>
                                <input
                                  id={`proof-${item.id}`}
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => setUpgradeFile(e.target.files?.[0] || null)}
                                  className="block w-full text-sm text-slate-600 file:mr-3 file:px-4 file:py-2 file:bg-white file:border file:border-slate-200 file:rounded-xl file:font-bold file:text-xs file:cursor-pointer"
                                />
                                {upgradeFile && <p className="text-[11px] text-slate-400 mt-1">{upgradeFile.name}</p>}
                              </div>
                              <button
                                type="button"
                                disabled={uploading || !upgradeFile}
                                onClick={() => handleUpgradeSubmit(item)}
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer disabled:opacity-50"
                              >
                                <Upload className="w-4 h-4" />
                                {uploading ? 'Uploading...' : 'Submit Payment Proof'}
                              </button>
                            </div>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                )}
              </section>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
