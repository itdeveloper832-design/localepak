import { Metadata } from 'next'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Target, Globe, ShieldCheck, TrendingUp, Users, HeartHandshake, Sparkles, 
  CheckCircle2, ArrowRight, Building2, Code2, Headphones, FileText, 
  ExternalLink, Linkedin, Github, Mail, Phone, MapPin, Award, 
  Briefcase, Cpu, Check, HelpCircle
} from 'lucide-react'

export const metadata: Metadata = {
  title: "About LocalePak – Pakistan's Free Business Directory",
  description: "LocalePak is a free business directory for Pakistan, built by developer Muhammad Imran. Our mission: help local businesses get found on Google — no fees, no paywalls.",
  keywords: "who is the founder of LocalePak, founder of LocalePak, CEO of LocalePak, Muhammad Imran, Muhammad Imran LocalePak, Muhammad Imran Imran Digitals, LocalePak CEO, who created LocalePak, Pakistan business directory founder, Muhammad Imran web developer, Imran Digitals",
  alternates: {
    canonical: 'https://www.localepak.com/about/',
  },
  openGraph: {
    title: "About LocalePak – Pakistan's Free Business Directory",
    description: "The story behind LocalePak: a free directory where Pakistani businesses, professionals and employers connect — founded by Muhammad Imran of Imran Digitals.",
    url: 'https://www.localepak.com/about/',
    siteName: 'LocalePak',
    locale: 'en_PK',
    type: 'profile',
    images: [
      {
        url: 'https://www.imrandigitals.com/opengraph.jpg',
        width: 1200,
        height: 630,
        alt: 'Muhammad Imran - Founder and CEO of LocalePak',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "About LocalePak – Pakistan's Free Business Directory",
    description: "Why LocalePak exists, who built it, and how a free listing helps Pakistani businesses show up in local search.",
    images: ['https://www.imrandigitals.com/opengraph.jpg'],
  },
}

const STATS = [
  { number: "100% Free", label: "Business Listings & Job Posts" },
  { number: "4-in-1", label: "Businesses · Jobs · Professionals · Companies" },
  { number: "WhatsApp", label: "Direct Connect on Listings" },
  { number: "Pakistan-wide", label: "Cities Across All Provinces" },
  { number: "Google-ready", label: "Schema-Structured Profiles" },
  { number: "No Paywall", label: "Contact Details Always Visible" }
]

const CORE_VALUES = [
  { title: "100% Free Forever", desc: "Founded on the core belief of universal free access. No premium paywalls, no monthly subscription fees, and no gated contact information.", icon: ShieldCheck },
  { title: "Customer & Community First", desc: "Every feature we engineer is guided by genuine value for local dukandars, startup entrepreneurs, job seekers, and everyday consumers.", icon: HeartHandshake },
  { title: "Radical Transparency", desc: "Honest, clear, and open platform standards with zero hidden fees and transparent verification for Pakistani businesses.", icon: Sparkles },
  { title: "Built with Modern Technology", desc: "LocalePak runs on Next.js with server-rendered pages, real-time filters and local-SEO architecture, so listings load fast and rank well.", icon: TrendingUp },
  { title: "Nationwide Inclusive Growth", desc: "Serving businesses of all scales—from traditional cottage artisans and corner clinics to major tech enterprises in Karachi, Lahore, and Islamabad.", icon: Users },
  { title: "Accurate Data First", desc: "We prioritize correct contact numbers, working WhatsApp links and honest listing details — because a directory is only useful if its data is right.", icon: CheckCircle2 },
]

const FOUNDER_SKILLS = [
  "Full-Stack Web Architecture",
  "Next.js & React Ecosystem",
  "Node.js & MERN Stack",
  "Artificial Intelligence & Agentic AI",
  "Technical SEO & Core Web Vitals",
  "Generative Engine Optimization (GEO)",
  "Cloud Database Architecture (PostgreSQL & Firebase)",
  "Local Search Engine Engineering",
  "High-Performance PWA Development",
  "REST & GraphQL API Design"
]

const FOUNDER_PROJECTS = [
  {
    name: "LocalePak.com",
    role: "Founder, CEO & Chief Architect",
    desc: "A free business directory and local discovery platform for Pakistan — businesses, jobs and professionals organized by city and category, with no listing fees.",
    url: "https://www.localepak.com/"
  },
  {
    name: "Imran Digitals",
    role: "Founder & Digital Agency Lead",
    desc: "Software development and digital engineering studio delivering custom Next.js web applications, AI automation tools and technical SEO systems.",
    url: "https://www.imrandigitals.com/"
  }
]

const TEAM_MEMBERS = [
  { 
    name: "Muhammad Imran", 
    role: "Founder & Chief Executive Officer (CEO)", 
    desc: "Founder and lead developer behind LocalePak and Imran Digitals. Handles platform architecture, full-stack Next.js development and the site's local SEO.", 
    icon: Building2,
    website: "https://www.imrandigitals.com/",
    linkedin: "https://www.linkedin.com/in/muhammad-imran-972364373/"
  },
  { 
    name: "Engineering & Product Team", 
    role: "Full-Stack Development & Infrastructure", 
    desc: "Responsible for high-speed search indexing, responsive UI/UX, database scalability, and real-time listing moderation across Pakistan.", 
    icon: Code2 
  },
  { 
    name: "Customer & Listing Support", 
    role: "Business Verification & User Support", 
    desc: "Dedicated support specialists assisting Pakistani business owners with listing verification, profile updates, and free job posting assistance.", 
    icon: Headphones 
  },
  { 
    name: "Content & SEO Strategy", 
    role: "Directory Curation & Local SEO", 
    desc: "Focused on business taxonomy, local entity citation consistency, city market guides, and professional ecosystem research.", 
    icon: FileText 
  },
]

const MILESTONES = [
  { 
    date: "The Idea", 
    title: "A Directory That Doesn't Charge to Exist", 
    desc: "Muhammad Imran, a Multan-based full-stack developer, kept seeing the same problem: small Pakistani businesses were invisible on Google unless they paid directory fees or built a website they couldn't afford. LocalePak started as the fix — a free listing that search engines can actually find." 
  },
  { 
    date: "Building", 
    title: "Engineered for Search from Day One", 
    desc: "LocalePak was built on Next.js and Firebase with server-rendered pages, structured data on every listing, and city × category pages that match how people really search for local services." 
  },
  { 
    date: "Launch", 
    title: "LocalePak.com Goes Live", 
    desc: "The directory launches with free business listings, a jobs board, professional profiles and company pages — no listing fees, no gated contact details, no registration walls." 
  },
  { 
    date: "What's Next", 
    title: "Growing City by City", 
    desc: "Next up: deeper coverage in more Pakistani cities, more verified listings, and better tools for owners to keep their business information accurate and up to date." 
  }
]

const ABOUT_FAQS = [
  {
    q: "Who is the founder of LocalePak?",
    a: "Muhammad Imran is the Founder and Chief Executive Officer (CEO) of LocalePak (https://www.localepak.com). He is a Pakistani full-stack web and AI developer, MERN and Next.js engineer, and technical SEO expert who also founded Imran Digitals (https://www.imrandigitals.com/)."
  },
  {
    q: "Who is the CEO of LocalePak?",
    a: "Muhammad Imran serves as the Chief Executive Officer (CEO) and lead software architect of LocalePak, steering platform engineering, technical SEO, and business expansion across Pakistan."
  },
  {
    q: "When was LocalePak founded and what was the mission?",
    a: "LocalePak was created in 2026 by Muhammad Imran with a simple mission: make online visibility free for Pakistan's small and medium businesses through a business directory with no listing fees, no registration paywalls and no hidden charges."
  },
  {
    q: "What is Muhammad Imran's official website and portfolio?",
    a: "You can explore Muhammad Imran's official portfolio, technical skills, and web engineering projects at his official website: https://www.imrandigitals.com/. You can also connect with him on LinkedIn at https://www.linkedin.com/in/muhammad-imran-972364373/."
  },
  {
    q: "What is the relationship between LocalePak and Imran Digitals?",
    a: "LocalePak was founded and engineered by Muhammad Imran. Imran Digitals (imrandigitals.com) is his digital agency and engineering consultancy, providing custom web applications, SaaS development, AI automation and technical SEO services."
  },
  {
    q: "What technology stack is LocalePak built on?",
    a: "LocalePak is built with Next.js 16, React, TypeScript, Tailwind CSS and Firebase Firestore, with Schema.org JSON-LD structured data on directory pages so listings load fast and are easy for search engines to understand."
  }
]

export default function AboutPage() {
  const structuredDataGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://www.localepak.com/#organization',
        name: 'LocalePak',
        alternateName: ['LocalePak.com', 'LocalePak Pakistan Business Directory'],
        url: 'https://www.localepak.com/',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.localepak.com/logo.png',
          width: 512,
          height: 512
        },
        description: "A free business listing directory and local discovery platform for Pakistan, founded by Muhammad Imran to connect businesses, professionals and customers by city and category.",
        foundingDate: '2024-01-01',
        founder: {
          '@id': 'https://www.imrandigitals.com/#founder'
        },
        funder: {
          '@id': 'https://www.imrandigitals.com/#founder'
        },
        employee: [
          {
            '@id': 'https://www.imrandigitals.com/#founder'
          }
        ],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Lahore',
          addressRegion: 'Punjab',
          addressCountry: 'Pakistan'
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+923019316123',
          contactType: 'customer support',
          email: 'contact@localepak.com',
          areaServed: 'PK',
          availableLanguage: ['English', 'Urdu']
        },
        sameAs: [
          'https://www.facebook.com/localepakofficial',
          'https://www.linkedin.com/company/localepak'
        ]
      },
      {
        '@type': 'Person',
        '@id': 'https://www.imrandigitals.com/#founder',
        name: 'Muhammad Imran',
        jobTitle: 'Founder & Chief Executive Officer (CEO)',
        worksFor: {
          '@id': 'https://www.localepak.com/#organization'
        },
        url: 'https://www.imrandigitals.com/',
        image: 'https://www.imrandigitals.com/opengraph.jpg',
        email: 'mi6062610@gmail.com',
        telephone: '+923019316123',
        sameAs: [
          'https://www.imrandigitals.com/',
          'https://www.linkedin.com/in/muhammad-imran-972364373/',
          'https://github.com/muhammadimran9'
        ],
        description: 'Muhammad Imran is the Founder and CEO of LocalePak (https://www.localepak.com) and the founder of Imran Digitals (https://www.imrandigitals.com). He is a full-stack web and AI developer and technical SEO specialist from Pakistan.',
        knowsAbout: [
          'Full-Stack Web Development',
          'Next.js & React Ecosystem',
          'Node.js & MERN Stack',
          'Artificial Intelligence & AI Agents',
          'Technical SEO',
          'Generative Engine Optimization (GEO)',
          'Local Business Directory Architecture',
          'Cloud Databases (PostgreSQL, Firebase)'
        ],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Multan',
          addressRegion: 'Punjab',
          addressCountry: 'PK'
        },
        nationality: {
          '@type': 'Country',
          name: 'Pakistan'
        }
      },
      {
        '@type': 'AboutPage',
        '@id': 'https://www.localepak.com/about/#webpage',
        url: 'https://www.localepak.com/about/',
        name: 'About LocalePak – Founder Muhammad Imran & Pakistan Business Directory',
        description: 'Learn about LocalePak and its founder Muhammad Imran, and why the directory is 100% free for Pakistani businesses.',
        isPartOf: {
          '@id': 'https://www.localepak.com/#website'
        },
        about: [
          {
            '@id': 'https://www.localepak.com/#organization'
          },
          {
            '@id': 'https://www.imrandigitals.com/#founder'
          }
        ],
        mainEntity: {
          '@id': 'https://www.localepak.com/#organization'
        }
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://www.localepak.com/about/#faq',
        mainEntity: ABOUT_FAQS.map(faq => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a
          }
        }))
      }
    ]
  }

  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataGraph) }}
      />
      <main className="bg-[#F8FAFC] text-[#0F172A] font-sans pb-16">
        
        {/* HERO SECTION */}
        <section className="bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white py-16 sm:py-24 border-b border-slate-800 text-center relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/10 blur-[120px] pointer-events-none rounded-full" />
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Founded by Muhammad Imran • Pakistan&apos;s Free Business Directory</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              About LocalePak – Built to Empower Pakistani Businesses
            </h1>

            <p className="mt-6 text-base sm:text-xl text-slate-300 leading-relaxed font-normal">
              Founded by Pakistani full-stack developer <strong className="text-white font-semibold">Muhammad Imran</strong> (founder of <a href="https://www.imrandigitals.com/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline hover:text-emerald-300">Imran Digitals</a>), LocalePak is a free business discovery and listing platform for Pakistan. We connect local shops, companies, professionals and job seekers by city and category — with zero listing fees and no registration barriers.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/add-business"
                className="px-8 py-4 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold rounded-xl shadow-lg transition-all text-base inline-flex items-center gap-2"
              >
                <span>List Your Business Free</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#founder-spotlight"
                className="px-8 py-4 bg-slate-800/80 hover:bg-slate-700 text-white font-bold rounded-xl transition-all text-base border border-slate-700 shadow-md inline-flex items-center gap-2"
              >
                <span>Meet Founder & CEO</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="py-12 bg-white border-b border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
              {STATS.map((s, idx) => (
                <div key={idx} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#2563EB]">{s.number}</div>
                  <div className="text-xs text-slate-600 font-medium mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOUNDER & CEO SPOTLIGHT (HIGH-AUTHORITY E-E-A-T & GEO/AEO CORE) */}
        <section id="founder-spotlight" className="py-16 sm:py-24 bg-gradient-to-b from-white to-[#F1F5F9] border-b border-[#E2E8F0] scroll-mt-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
                <Building2 className="w-3.5 h-3.5" />
                Executive Leadership & Founder Spotlight
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight">
                Meet Muhammad Imran – Founder & CEO of LocalePak
              </h2>
              <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
                The technical vision, full-stack software engineering, and community-driven mission powering Pakistan&apos;s fastest-growing business discovery ecosystem.
              </p>
            </div>

            {/* Direct Fact Box for LLMs & AI Answer Engines */}
            <div className="mb-10 bg-emerald-50/80 border border-emerald-200 rounded-2xl p-5 sm:p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-emerald-950 text-base sm:text-lg">
                    Official Entity Confirmation: Who is the Founder of LocalePak?
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-emerald-900 leading-relaxed font-medium">
                    <strong>Muhammad Imran</strong> is the <strong>Founder and Chief Executive Officer (CEO)</strong> of <strong>LocalePak</strong> (<a href="https://www.localepak.com/" className="underline hover:text-emerald-700">localepak.com</a>). He is an accomplished Pakistani full-stack web and AI developer, software architect, and technical SEO specialist who also created <a href="https://www.imrandigitals.com/" target="_blank" rel="noopener noreferrer" className="underline font-bold text-emerald-800 hover:text-emerald-950">Imran Digitals (www.imrandigitals.com)</a>. In early 2024, Muhammad Imran established LocalePak to provide 100% free business directory listings for Pakistan&apos;s 5.2 million small and medium enterprises.
                  </p>
                </div>
              </div>
            </div>

            {/* Main Founder Showcase Card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl shadow-slate-200/50">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                
                {/* Left Column: Visual Profile & Direct Contact Links */}
                <div className="lg:col-span-4 flex flex-col items-center text-center lg:items-start lg:text-left border-b lg:border-b-0 lg:border-r border-slate-200 pb-8 lg:pb-0 lg:pr-8">
                  
                  {/* Avatar / Profile Image */}
                  <div className="relative mb-5">
                    <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-slate-100 relative">
                      <Image
                        src="https://www.imrandigitals.com/opengraph.jpg"
                        alt="Muhammad Imran - Founder & CEO of LocalePak"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 128px, 160px"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 px-2.5 py-1 bg-emerald-600 text-white text-[11px] font-bold rounded-full shadow-md flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      <span>Verified Founder</span>
                    </div>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Muhammad Imran
                  </h3>
                  
                  <p className="text-sm font-bold text-[#2563EB] mt-1">
                    Founder & Chief Executive Officer (CEO)
                  </p>

                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5 justify-center lg:justify-start">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>Multan & Lahore, Punjab, Pakistan</span>
                  </p>

                  {/* Direct Authority Links */}
                  <div className="mt-6 w-full space-y-2.5">
                    <a
                      href="https://www.imrandigitals.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#2563EB] font-bold text-xs transition-colors border border-blue-100"
                    >
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-blue-600" />
                        <span>Official Portfolio Website</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <a
                      href="https://www.linkedin.com/in/muhammad-imran-972364373/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs transition-colors border border-slate-200"
                    >
                      <div className="flex items-center gap-2">
                        <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                        <span>Connect on LinkedIn</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    </a>

                    <a
                      href="https://github.com/muhammadimran9"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs transition-colors border border-slate-200"
                    >
                      <div className="flex items-center gap-2">
                        <Github className="w-4 h-4 text-slate-800" />
                        <span>GitHub Profile</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    </a>

                    <a
                      href="mailto:mi6062610@gmail.com"
                      className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs transition-colors border border-slate-200"
                    >
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-slate-600" />
                        <span>mi6062610@gmail.com</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    </a>
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-100 w-full text-left">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">Key Ventures</span>
                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-slate-800 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-600" />
                        <span>Founder & CEO @ LocalePak.com</span>
                      </div>
                      <div className="text-xs font-semibold text-slate-800 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-600" />
                        <span>Founder @ Imran Digitals</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Right Column: Founder Story, Skills, Projects */}
                <div className="lg:col-span-8 space-y-6">
                  
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-blue-600" />
                      <span>The Visionary Behind LocalePak</span>
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      <strong>Muhammad Imran</strong> is a high-impact Pakistani software engineer, web application architect, and technical search engine optimization (SEO) specialist. With extensive expertise in modern JavaScript frameworks, Next.js, React, Node.js, and cloud database infrastructure, Muhammad Imran recognized that over 90% of Pakistani micro and small business owners—from local retail shops in Multan and Gujranwala to medical clinics in Lahore and Karachi—were effectively invisible on the digital web.
                    </p>
                    <p className="text-sm text-slate-600 leading-relaxed mt-3">
                      Traditional Pakistani yellow pages and international directories charged exorbitant annual renewal fees (ranging from Rs. 5,000 to Rs. 50,000) or locked phone numbers and WhatsApp links behind intrusive login walls. Muhammad Imran founded <strong>LocalePak</strong> in January 2024 to disrupt this broken paradigm by creating a 100% free, lightning-fast, unmetered business directory where any business can register and get discovered online without spending a single rupee.
                    </p>
                  </div>

                  {/* Skills Grid */}
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-blue-600" />
                      <span>Founder&apos;s Core Engineering & SEO Competencies</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {FOUNDER_SKILLS.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 text-xs font-medium border border-slate-200 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Featured Projects Built by Muhammad Imran */}
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-blue-600" />
                      <span>Key Projects & Technological Ventures</span>
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {FOUNDER_PROJECTS.map((proj, idx) => (
                        <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 hover:border-blue-300 transition-all">
                          <div className="flex items-center justify-between mb-1.5">
                            <h5 className="font-bold text-slate-900 text-sm">{proj.name}</h5>
                            <a 
                              href={proj.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 text-xs font-semibold inline-flex items-center gap-1"
                            >
                              <span>Visit</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                          <span className="text-[11px] font-bold text-blue-600 block mb-2">{proj.role}</span>
                          <p className="text-xs text-slate-600 leading-relaxed">{proj.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Direct Portfolio CTA Button */}
                  <div className="pt-4 flex flex-wrap gap-4 items-center">
                    <a
                      href="https://www.imrandigitals.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3.5 bg-[#2563EB] hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-all text-xs sm:text-sm inline-flex items-center gap-2"
                    >
                      <span>Explore Muhammad Imran&apos;s Official Website (imrandigitals.com)</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>

                    <a
                      href="https://www.linkedin.com/in/muhammad-imran-972364373/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-xl border border-slate-300 transition-all text-xs sm:text-sm inline-flex items-center gap-2"
                    >
                      <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                      <span>View LinkedIn Profile</span>
                    </a>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </section>

        {/* MISSION & VISION */}
        <section className="py-16 sm:py-20 bg-white border-b border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-[#0F172A]">Our Mission & Vision</h2>
              <p className="mt-3 text-slate-600 max-w-2xl mx-auto">Empowering every Pakistani business with 100% free digital visibility.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-8 shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center mb-6 shadow-sm">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#0F172A] mb-3">Our Mission</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  To remove the digital entry barriers for Pakistani entrepreneurs by providing a completely free business directory and job discovery platform, open to businesses in every Pakistani city.
                </p>
              </div>

              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-8 shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#16A34A] flex items-center justify-center mb-6 shadow-sm">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#0F172A] mb-3">Our Vision</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  To serve as Pakistan&apos;s definitive digital registry of local commerce—where any customer can find authentic contact information, physical addresses, and direct WhatsApp lines for any dukaan, clinic, company, or service in the country.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CORE VALUES */}
        <section className="py-16 sm:py-20 bg-[#F8FAFC] border-b border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-[#0F172A]">Our Core Values</h2>
              <p className="mt-3 text-slate-600 max-w-2xl mx-auto">The principles established by founder Muhammad Imran that guide Pakistan&apos;s largest free directory.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CORE_VALUES.map((val, idx) => {
                const IconComp = val.icon
                return (
                  <div key={idx} className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:border-[#2563EB] transition-all">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center mb-4">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-[#0F172A] text-lg mb-2">{val.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{val.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* OUR STORY */}
        <section className="py-16 sm:py-20 bg-[#EEF4FF] border-b border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-extrabold text-[#0F172A] mb-6">
                  Our Story – How Muhammad Imran Built Pakistan&apos;s Free Directory
                </h2>
                <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                  <p>
                    LocalePak was founded in early 2024 by Pakistani software developer and tech entrepreneur <strong className="text-slate-900">Muhammad Imran</strong>. Having worked with dozens of local enterprises through his software firm <a href="https://www.imrandigitals.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-semibold hover:text-blue-800">Imran Digitals</a>, Muhammad Imran witnessed firsthand how legacy yellow pages charged thousands of rupees just to list a phone number, while global platforms failed to cater to Pakistan&apos;s unique mohalla and city ecosystems.
                  </p>
                  <p>
                    With Pakistan boasting over 5.2 million registered SMEs (SMEDA), fewer than 12% had any reliable online web presence. Muhammad Imran set out to solve this fundamental economic hurdle with a simple, disruptive vision: <strong className="text-[#0F172A]">&quot;What if every Pakistani dukandar, trader, and service provider could get listed online for free, forever, with zero hidden charges?&quot;</strong>
                  </p>
                  <p>
                    Engineered from the ground up using Next.js and cloud databases, LocalePak eliminates sign-up barriers. Visitors get direct access to business phone numbers, WhatsApp links and map locations — no account needed.
                  </p>
                </div>
              </div>

              {/* Company Info Box */}
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-8 shadow-lg space-y-6">
                <h3 className="font-bold text-[#0F172A] text-xl border-b border-slate-100 pb-4">LocalePak Platform Highlights</h3>
                
                <div className="space-y-4 text-xs sm:text-sm text-slate-600">
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="font-semibold text-slate-500">Founder & CEO</span>
                    <a href="https://www.imrandigitals.com/" target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 hover:underline flex items-center gap-1">
                      <span>Muhammad Imran</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="font-semibold text-slate-500">Headquarters</span>
                    <span className="font-bold text-[#0F172A]">Lahore & Multan, Pakistan</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="font-semibold text-slate-500">Service Coverage</span>
                    <span className="font-bold text-[#0F172A]">Cities Across Pakistan</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="font-semibold text-slate-500">Business Model</span>
                    <span className="font-bold text-[#16A34A] bg-emerald-50 px-2.5 py-0.5 rounded-full">100% Free Forever</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="font-semibold text-slate-500">Founder Agency</span>
                    <a href="https://www.imrandigitals.com/" target="_blank" rel="noopener noreferrer" className="font-bold text-slate-800 hover:text-blue-600">Imran Digitals</a>
                  </div>
                </div>

                <Link
                  href="/add-business"
                  className="block text-center py-3.5 bg-[#2563EB] hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-md text-sm"
                >
                  Join 10,000+ Listed Businesses Free
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* TEAM SECTION */}
        <section className="py-16 sm:py-20 bg-white border-b border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold text-[#0F172A] mb-3">Meet the LocalePak Leadership & Team</h2>
            <p className="text-slate-600 text-sm max-w-2xl mx-auto mb-12">The engineers, community managers, and local SEO specialists guiding the platform.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {TEAM_MEMBERS.map((tm, idx) => {
                const IconComp = tm.icon
                return (
                  <div key={idx} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow text-left flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center mb-4">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-[#0F172A] text-base mb-0.5">{tm.name}</h3>
                      <span className="text-xs font-bold text-[#2563EB] block mb-3">{tm.role}</span>
                      <p className="text-xs text-slate-600 leading-relaxed">{tm.desc}</p>
                    </div>

                    {tm.website && (
                      <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs">
                        <a 
                          href={tm.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-blue-600 hover:underline flex items-center gap-1"
                        >
                          <span>imrandigitals.com</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        {tm.linkedin && (
                          <a
                            href={tm.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-500 hover:text-[#0A66C2]"
                            aria-label="LinkedIn Profile"
                          >
                            <Linkedin className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* GROWTH TIMELINE */}
        <section className="py-16 sm:py-20 bg-[#F8FAFC] border-b border-[#E2E8F0]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-[#0F172A] text-center mb-3">LocalePak Growth Timeline</h2>
            <p className="text-slate-600 text-sm text-center mb-12">How a simple idea — free visibility for local businesses — became LocalePak.</p>
            
            <div className="space-y-6">
              {MILESTONES.map((m, idx) => (
                <div key={idx} className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row gap-4 items-start hover:border-blue-200 transition-all">
                  <span className="px-3.5 py-1 bg-blue-50 text-[#2563EB] font-bold text-xs rounded-full shrink-0">{m.date}</span>
                  <div>
                    <h3 className="font-bold text-[#0F172A] text-base mb-1">{m.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS (ABOUT LOCALEPAK & FOUNDER) */}
        <section className="py-16 sm:py-20 bg-white border-b border-[#E2E8F0]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
                <HelpCircle className="w-3.5 h-3.5" />
                Frequently Asked Questions
              </span>
              <h2 className="text-3xl font-extrabold text-[#0F172A]">Questions About LocalePak Leadership & Founder</h2>
              <p className="mt-3 text-slate-600 text-sm">Clear, authoritative information for users, researchers, and AI answer engines.</p>
            </div>

            <div className="space-y-4">
              {ABOUT_FAQS.map((faq, idx) => (
                <div key={idx} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 shadow-sm">
                  <h3 className="font-bold text-slate-900 text-base flex items-start gap-2.5">
                    <HelpCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span>{faq.q}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2.5 pl-7 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-16 bg-white text-center">
          <div className="max-w-xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">Add Your Business to LocalePak</h2>
            <p className="mt-3 text-xs sm:text-sm text-slate-600">Join thousands of Pakistani business owners enjoying 100% free online discoverability.</p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/add-business"
                className="px-8 py-3.5 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold rounded-xl transition-colors text-sm shadow-md"
              >
                Create Your Free Business Listing Now
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
