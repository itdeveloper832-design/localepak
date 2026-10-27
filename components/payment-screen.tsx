'use client'

import { useState } from 'react'
import { db, storage } from '@/lib/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { Copy, Check, Upload, ShieldCheck, Wallet } from 'lucide-react'
import { toast } from 'sonner'
import { TIERS, formatPKR, type ListingTier, type ListingType } from '@/lib/tiers'
import { PAYMENT_METHODS, type PaymentMethodId } from '@/lib/payment-methods'
import { notifyAdminNewPaymentProof } from '@/lib/mail'

/**
 * Shared listing payment screen.
 *
 * The parent form has ALREADY saved the listing (status 'pending',
 * paymentStatus 'awaiting_payment') before rendering this screen —
 * so a buyer who stops here loses nothing: the listing waits in
 * their dashboard until the proof is uploaded. After the proof is
 * submitted, the parent sends the submission-confirmation email
 * (via onSubmitted) and routes the buyer to their dashboard.
 */
export default function PaymentScreen({
  tier,
  listingType,
  listingId,
  listingName,
  ownerId,
  ownerEmail,
  onSubmitted,
}: {
  tier: ListingTier
  listingType: ListingType
  listingId: string
  listingName: string
  ownerId: string
  ownerEmail: string
  onSubmitted: () => Promise<void> | void
}) {
  const [method, setMethod] = useState<PaymentMethodId>('easypaisa')
  const [file, setFile] = useState<File | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  const def = TIERS[tier]
  const selected = PAYMENT_METHODS.find((m) => m.id === method) || PAYMENT_METHODS[0]

  const copyNumber = async (num: string) => {
    try {
      await navigator.clipboard.writeText(num)
    } catch {
      // Clipboard API unavailable (older browsers) — select-and-copy fallback.
      const ta = document.createElement('textarea')
      ta.value = num
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(num)
    window.setTimeout(() => setCopied((c) => (c === num ? null : c)), 2000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) {
      toast.error('Please choose your payment screenshot first.')
      return
    }
    if (!file.type.startsWith('image/')) {
      toast.error('The proof must be an image file.')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('The image must be under 5MB.')
      return
    }
    setUploading(true)
    try {
      const path = `payment-proofs/${ownerId}/${listingId}-${Date.now()}`
      const storageRef = ref(storage, path)
      await uploadBytes(storageRef, file)
      const proofUrl = await getDownloadURL(storageRef)
      await addDoc(collection(db, 'payment_proofs'), {
        listingId,
        listingType,
        listingName,
        ownerId,
        ownerEmail,
        tier,
        method,
        amount: def.price,
        proofUrl,
        status: 'pending',
        createdAt: serverTimestamp(),
      })
      // Admin notification — queued into `mail`, never throws.
      void notifyAdminNewPaymentProof({
        listingName,
        plan: 'featured',
        tier,
        method,
        amount: def.price,
      })
      toast.success('Payment proof submitted — we will email you once it is verified.')
      await onSubmitted()
    } catch (err: any) {
      toast.error(`Upload failed: ${err?.message || 'Unknown error'}`)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <div className="inline-flex p-3 rounded-2xl bg-emerald-50 text-emerald-600">
          <Wallet className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-extrabold text-slate-900">Complete Your Payment</h2>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Your {def.label} listing for “{listingName}” is saved. Pay {formatPKR(def.price)} with any method below,
          then upload your payment screenshot — our team verifies it before approval.
        </p>
      </div>

      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">{def.label} listing</p>
          <p className="text-xs text-slate-600 mt-0.5">{def.tagline}</p>
        </div>
        <p className="font-extrabold text-emerald-700 text-lg whitespace-nowrap">{formatPKR(def.price)}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-3">
          <p className="block text-xs font-bold text-slate-700">Pay with *</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" role="radiogroup" aria-label="Payment method">
            {PAYMENT_METHODS.map((m) => {
              const active = method === m.id
              return (
                <button
                  key={m.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setMethod(m.id)}
                  className={`text-left rounded-2xl border-2 p-4 transition-all cursor-pointer ${
                    active ? 'border-emerald-600 bg-emerald-50' : 'border-slate-200 bg-white hover:border-emerald-300'
                  }`}
                >
                  <span className="font-extrabold text-slate-900 text-sm">{m.label}</span>
                  <span className="block text-[11px] text-slate-500 mt-1">Account title: {m.accountTitle}</span>
                  <span className="flex items-center gap-1.5 mt-1">
                    <span className="text-xs font-mono font-bold text-slate-800">{m.accountNumber}</span>
                    <span
                      role="button"
                      tabIndex={0}
                      aria-label={`Copy ${m.label} account number`}
                      onClick={(ev) => {
                        ev.stopPropagation()
                        void copyNumber(m.accountNumber)
                      }}
                      onKeyDown={(ev) => {
                        if (ev.key === 'Enter' || ev.key === ' ') {
                          ev.preventDefault()
                          ev.stopPropagation()
                          void copyNumber(m.accountNumber)
                        }
                      }}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-bold text-emerald-700 hover:border-emerald-400 cursor-pointer"
                    >
                      {copied === m.accountNumber ? (
                        <>
                          <Check className="w-3 h-3" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" /> Copy
                        </>
                      )}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">{selected.hint}</p>
        </div>

        <div>
          <label htmlFor="tier-payment-proof" className="block text-xs font-bold text-slate-700 mb-1">
            Upload payment proof screenshot (image, max 5MB) *
          </label>
          <input
            id="tier-payment-proof"
            type="file"
            accept="image/*"
            required
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="block w-full text-sm text-slate-600 file:mr-3 file:px-4 file:py-2 file:bg-white file:border file:border-slate-200 file:rounded-xl file:font-bold file:text-xs file:cursor-pointer"
          />
          {file && <p className="text-[11px] text-slate-400 mt-1">{file.name}</p>}
        </div>

        <div className="flex gap-2.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <span>
            Send exactly {formatPKR(def.price)} via {selected.label}, then upload the screenshot. Our team verifies
            every payment by hand — once approved, your listing goes live (businesses join the weekly release batch).
            If a payment cannot be verified, the listing is rejected and the reason is shown in your dashboard.
          </span>
        </div>

        <button
          type="submit"
          disabled={uploading || !file}
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <Upload className="w-4 h-4" />
          <span>{uploading ? 'Uploading...' : 'Submit Payment Proof'}</span>
        </button>
      </form>
    </div>
  )
}
