'use client'

import { useState, useEffect } from 'react'
import { auth, db } from '@/lib/firebase'
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore'
import { toast } from 'sonner'
import { AdminLoading, AdminEmpty, formatDate, neutralBtn } from '@/components/admin-shared'

type Item = { id: string; data: any }

export default function AdminUsersPage() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState<string | null>(null)
  const myUid = auth.currentUser?.uid

  useEffect(() => {
    const load = async () => {
      try {
        const snap = await getDocs(collection(db, 'users'))
        const rows: Item[] = []
        snap.forEach((d) => rows.push({ id: d.id, data: d.data() }))
        rows.sort((a, b) => (b.data.createdAt?.toMillis?.() || 0) - (a.data.createdAt?.toMillis?.() || 0))
        setItems(rows)
      } catch {
        toast.error('Could not load users.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const toggleRole = async (item: Item) => {
    const { id, data } = item
    const isAdmin = data.role === 'admin'
    if (id === myUid && isAdmin) {
      toast.error('You cannot demote your own account.')
      return
    }
    const next = isAdmin ? 'member' : 'admin'
    const label = data.ownerName || data.email || 'this user'
    if (!window.confirm(`${isAdmin ? 'Demote' : 'Promote'} ${label} ${isAdmin ? 'to member' : 'to admin'}?`)) return
    setBusy(id)
    try {
      await updateDoc(doc(db, 'users', id), { role: next })
      setItems((prev) => prev.map((it) => (it.id === id ? { ...it, data: { ...it.data, role: next } } : it)))
      toast.success(`${label} is now ${next === 'admin' ? 'an admin' : 'a member'}.`)
    } catch {
      toast.error('Role change failed — check permissions and try again.')
    } finally {
      setBusy(null)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Users</h1>
        <p className="text-sm text-slate-500">{items.length} registered · promote or demote roles. You can never demote yourself.</p>
      </div>

      {loading ? (
        <AdminLoading />
      ) : items.length === 0 ? (
        <AdminEmpty text="No registered users yet." />
      ) : (
        <div className="space-y-3">
          {items.map((item) => {
            const { id, data } = item
            const isAdmin = data.role === 'admin'
            const isSelf = id === myUid
            return (
              <article key={id} className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-extrabold text-slate-900 text-sm">{data.ownerName || data.name || 'Unnamed user'}</h2>
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${isAdmin ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>
                      {isAdmin ? 'Admin' : 'Member'}
                    </span>
                    {isSelf && <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">(you)</span>}
                  </div>
                  <p className="text-xs text-slate-500">
                    {data.email || '—'} · {data.phone || 'no phone'} · Joined {formatDate(data.createdAt)}
                  </p>
                </div>
                <div className="shrink-0">
                  <button
                    type="button"
                    disabled={busy === id || (isSelf && isAdmin)}
                    onClick={() => toggleRole(item)}
                    className={neutralBtn}
                    title={isSelf && isAdmin ? 'You cannot demote yourself' : undefined}
                  >
                    {isAdmin ? 'Demote to Member' : 'Promote to Admin'}
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}
