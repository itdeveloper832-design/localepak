// SEO Content Template Generator
// Generates 500-800 word unique content blocks for programmatic SEO pages

export const CITY_INFO: Record<string, { province: string; description: string; industries: string[]; districts?: string[] }> = {
  Karachi: {
    province: 'Sindh',
    description: "the biggest city in Pakistan and the country's commercial and financial heart",
    industries: ['finance', 'retail', 'logistics', 'technology', 'manufacturing'],
    districts: ['Clifton', 'DHA', 'Shahrah-e-Faisal', 'Saddar', 'Gulshan-e-Iqbal', 'North Nazimabad'],
  },
  Lahore: {
    province: 'Punjab',
    description: "the country's cultural heart and its second-biggest city",
    industries: ['education', 'retail', 'real-estate', 'food', 'technology'],
    districts: ['Gulberg', 'DHA', 'Johar Town', 'Model Town', 'Mall Road', 'Bahria Town'],
  },
  Islamabad: {
    province: 'ICT',
    description: "the country's planned, modern capital city",
    industries: ['government', 'technology', 'education', 'real-estate', 'healthcare'],
    districts: ['Blue Area', 'F-7 Markaz', 'F-10 Markaz', 'DHA', 'Bahria Town', 'G-11'],
  },
  Rawalpindi: {
    province: 'Punjab',
    description: "Islamabad's twin city, with a long history as a trading and commercial centre",
    industries: ['retail', 'automotive', 'construction', 'food', 'finance'],
  },
  Faisalabad: {
    province: 'Punjab',
    description: "the centre of Pakistan's textile industry and a major manufacturing city",
    industries: ['textile', 'manufacturing', 'retail', 'logistics', 'agriculture'],
  },
  Multan: {
    province: 'Punjab',
    description: 'the historic City of Saints, where a centuries-old trading culture meets a fast-growing economy',
    industries: ['agriculture', 'education', 'retail', 'healthcare', 'food'],
  },
  Peshawar: {
    province: 'Khyber Pakhtunkhwa',
    description: "one of the region's oldest trading cities and the historic gateway toward Central Asia",
    industries: ['trade', 'retail', 'food', 'automotive', 'real-estate'],
  },
  Quetta: {
    province: 'Balochistan',
    description: "Balochistan's capital and the main commercial centre for trade across the province",
    industries: ['trade', 'agriculture', 'retail', 'construction', 'food'],
  },
  Sialkot: {
    province: 'Punjab',
    description: 'an export powerhouse world-famous for its sports goods and surgical instruments',
    industries: ['manufacturing', 'retail', 'logistics', 'finance', 'technology'],
  },
  Hyderabad: {
    province: 'Sindh',
    description: "the second-biggest city in Sindh, with busy bazaars and a lively trading scene",
    industries: ['retail', 'education', 'healthcare', 'food', 'real-estate'],
  },
  Gujranwala: {
    province: 'Punjab',
    description: "one of Pakistan's leading industrial cities, popularly known as the 'City of Wrestlers'",
    industries: ['manufacturing', 'retail', 'automotive', 'food', 'logistics'],
  },
  Bahawalpur: {
    province: 'Punjab',
    description: 'a former princely state capital whose commerce and agriculture keep expanding',
    industries: ['agriculture', 'retail', 'education', 'healthcare', 'food'],
  },
  Sargodha: {
    province: 'Punjab',
    description: "Pakistan's citrus capital, built on a thriving agricultural economy",
    industries: ['agriculture', 'retail', 'food', 'education', 'automotive'],
  },
  Sukkur: {
    province: 'Sindh',
    description: 'an important city on the Indus River where trade keeps expanding',
    industries: ['trade', 'retail', 'agriculture', 'food', 'construction'],
  },
  Larkana: {
    province: 'Sindh',
    description: 'a well-known Sindhi city with deep historical roots and an active commercial life',
    industries: ['agriculture', 'retail', 'healthcare', 'education', 'food'],
  },
  Sheikhupura: {
    province: 'Punjab',
    description: "an industrial neighbour of Lahore whose economy is expanding fast",
    industries: ['manufacturing', 'retail', 'food', 'logistics', 'construction'],
  },
  'Rahim Yar Khan': {
    province: 'Punjab',
    description: 'a south Punjab city powered by strong farming and trade',
    industries: ['agriculture', 'retail', 'food', 'healthcare', 'education'],
  },
  Mardan: {
    province: 'Khyber Pakhtunkhwa',
    description: "KPK's second-biggest city, home to a steadily expanding business scene",
    industries: ['agriculture', 'retail', 'food', 'education', 'healthcare'],
  },
  Gujrat: {
    province: 'Punjab',
    description: 'a manufacturing city celebrated for its electronics and furniture trades',
    industries: ['manufacturing', 'retail', 'electronics', 'food', 'automotive'],
  },
  Kasur: {
    province: 'Punjab',
    description: 'a historic city close to Lahore, recognised for leather production and farming',
    industries: ['manufacturing', 'agriculture', 'retail', 'food', 'education'],
  },
}

const CATEGORY_INFO: Record<string, { label: string; description: string; examples: string[] }> = {
  restaurants: {
    label: 'Restaurant & Food',
    description: 'eateries of every kind, from restaurants and cafes to fast-food outlets, bakeries and caterers',
    examples: ['fast-food outlets', 'family dining restaurants', 'cafes and coffee shops', 'bakeries', 'catering companies', 'food trucks'],
  },
  'real-estate': {
    label: 'Real Estate',
    description: 'property dealers and agents, housing societies, rental agencies and construction companies',
    examples: ['residential developments', 'commercial properties', 'rental agencies', 'housing societies', 'estate agents'],
  },
  technology: {
    label: 'Technology & IT',
    description: 'software houses, web and app development studios, IT support providers and digital marketing agencies',
    examples: ['software development', 'website design', 'mobile app development', 'digital marketing', 'IT support', 'cloud services'],
  },
  healthcare: {
    label: 'Healthcare & Medical',
    description: 'hospitals and clinics, pharmacies, diagnostic laboratories and suppliers of medical equipment',
    examples: ['hospitals', 'private clinics', 'dental practices', 'pharmacies', 'diagnostic laboratories', 'specialist doctors'],
  },
  education: {
    label: 'Education & Training',
    description: 'schools, colleges and universities, plus academies and vocational training institutes',
    examples: ['schools', 'colleges', 'universities', 'training institutes', 'online learning providers', 'tutoring centres'],
  },
  retail: {
    label: 'Retail & Shopping',
    description: 'clothing and electronics stores, grocery outlets and specialist retailers of every kind',
    examples: ['fashion and clothing stores', 'electronics shops', 'grocery outlets', 'furniture shops', 'bookstores', 'sports equipment stores'],
  },
  construction: {
    label: 'Construction',
    description: 'building contractors and construction firms, architects, interior designers and building-material suppliers',
    examples: ['building contractors', 'interior design studios', 'architectural firms', 'renovation specialists', 'building material suppliers'],
  },
  automotive: {
    label: 'Automotive',
    description: 'car dealers, repair workshops, car-wash services and spare-parts retailers',
    examples: ['car dealerships', 'auto repair workshops', 'car wash services', 'spare parts shops', 'motorcycle dealers', 'car rental services'],
  },
  finance: {
    label: 'Finance & Banking',
    description: 'banks and insurers, investment firms and providers of accounting and advisory services',
    examples: ['commercial banks', 'insurance providers', 'investment firms', 'accounting practices', 'tax consultants', 'microfinance institutions'],
  },
  travel: {
    label: 'Travel & Tourism',
    description: 'travel agents, hotels and guest houses, tour operators and other tourism services',
    examples: ['travel agencies', 'hotels and resorts', 'tour operators', 'guest houses', 'car hire', 'adventure tourism operators'],
  },
  beauty: {
    label: 'Beauty & Wellness',
    description: 'beauty salons and spas, gyms and fitness centres, yoga studios and cosmetics retailers',
    examples: ['hair and beauty salons', 'spas', 'gyms and fitness centres', 'yoga studios', 'cosmetics shops', 'barbershops'],
  },
  logistics: {
    label: 'Logistics & Transport',
    description: 'courier and shipping companies, warehousing operators and transport providers',
    examples: ['courier companies', 'freight and shipping firms', 'warehousing', 'freight forwarders', 'house-moving services', 'trucking companies'],
  },
}

export function generateCityContent(city: string): string {
  const info = CITY_INFO[city] || {
    province: 'Pakistan',
    description: 'a fast-growing centre of commerce',
    industries: ['retail', 'food', 'healthcare', 'education', 'technology'],
  }

  const districtsText = info.districts 
    ? `Among its liveliest commercial areas are ${info.districts.join(', ')}.` 
    : `Across the city, busy bazaars, markets and commercial centres form the backbone of everyday trade.`

  return `## Businesses in ${city} — A Complete Local Directory Guide

Located in ${info.province}, ${city} is ${info.description}. Its economy is broad and energetic: thousands of enterprises operate here, from neighbourhood family shops to national corporations. If you live in the city and need a dependable service, or you run a company and want a foothold in this market, ${city} offers openings in practically every trade.

### Why Look Up Businesses in ${city}?

Tracking down the right service provider should not eat up your afternoon. LocalePak gives you a checked, regularly refreshed directory spanning every major trade in ${city} — restaurants, retail stores, healthcare providers, technology companies and much more. Listings carry phone numbers, addresses and links to each business's online presence, and many let you connect on WhatsApp instantly, with no sign-up needed.

### Leading Business Sectors in ${city}

Several industries power the local economy, above all ${info.industries.slice(0, 3).join(', ')}, alongside many others. A deep consumer market and a prime location make ${city} attractive to companies of every size, and owners here draw on a trained workforce, dependable supply networks and fast-improving digital connectivity.

Public investment in commerce by the ${info.province} government has strengthened that picture further, so startups and household brands alike can grow side by side. A number of the country's biggest organisations run major operations — in some cases their head offices — from ${city}.

### How to Find a Business in ${city}

Start with the category you need and work through the ${city} listings on LocalePak. Planning a family dinner, facing an urgent repair at home, or hiring consultants for a digital project — the right provider is a few taps away: open a listing, call the number shown, or send a WhatsApp message straight from the page.

### Business Districts and Commercial Areas in ${city}

Commerce in ${city} clusters in well-known districts, and each one has its own specialities. ${districtsText} 

Knowing the districts pays off when you search. Our listings show where each business is based, so you can favour a provider near your home or office instead of crossing the city, and compare your options area by area.

### Add Your Business in ${city} — It's Free

Own a business in ${city}? Put it in front of the customers already searching here — listing on LocalePak costs nothing. Submit your business name, address, contact details and a short description, and your profile starts appearing for ${city} searches in your category, reaching thousands of potential customers every month.

Want customers to trust your profile faster? Add the official identifiers you already hold: your FBR NTN if you are tax-registered with the Federal Board of Revenue, your Securities and Exchange Commission of Pakistan incorporation details if you run a registered company, or membership of a local chamber such as the Karachi Chamber of Commerce and Industry or the Lahore Chamber of Commerce and Industry.

LocalePak backs the growth of ${city}'s business community. Join the hundreds of companies already listed, start receiving customer enquiries, and pay nothing for the privilege — no subscription, no hidden charges, just a free, high-quality listing on Pakistan's leading business directory.

### Explore ${city} Businesses by Category

Work through the categories below to see every type of business trading in ${city}. Open any category for a focused list of the providers offering exactly those services in ${city}.`
}

export function generateCategoryContent(categorySlug: string): string {
  const info = CATEGORY_INFO[categorySlug] || {
    label: categorySlug ? categorySlug.replace(/-/g, ' ') : 'Category',
    description: 'businesses supplying everyday services people rely on',
    examples: ['independent service providers', 'local firms', 'shops', 'specialist agencies'],
  }

  return `## ${info.label} Businesses in Pakistan — The Full Directory

Pakistan's ${info.label.toLowerCase()} sector is thriving, with thousands of providers serving customers in every major city. On LocalePak you will find one of the most comprehensive directories of ${info.description} anywhere in Pakistan, refreshed regularly as fresh listings arrive.

### Finding the Best ${info.label} Providers

Wherever you are — Karachi, Lahore, Islamabad or a smaller town — tracking down quality ${info.label.toLowerCase()} services takes minutes here. Every profile carries contact details and verified local citations, typically including a WhatsApp number, a street address and links to the business's website or social profiles, so you can judge your options on facts rather than guesswork.

### What's Inside the ${info.label} Directory

Inside this category you will find ${info.examples.slice(0, 5).join(', ')} — and plenty beyond that list. Each profile shows the company's name and phone number alongside a fuller description, which makes shortlisting the right partner straightforward.

### Why Search ${info.label} on LocalePak?

LocalePak is a free directory spanning more than one hundred and fifty Pakistani cities, and every ${info.label.toLowerCase()} listing here was submitted by the business itself and then verified, so the details you act on are accurate and genuinely useful. Small freelancers sit alongside large, long-established companies; size is no barrier to being listed.

Place profiles side by side, weigh them up, then reach out directly or continue to the provider's own website and social pages. There is nothing to register for — simply browse and make contact.

### ${info.label} in Cities Across Pakistan

Providers cluster most densely in Karachi, Lahore and Islamabad, but strong options exist well beyond the big three — Faisalabad, Multan, Peshawar, Quetta and Sialkot among them. Narrow the field with the city filter below.

### List Your ${info.label} Business — Free

Run a ${info.label.toLowerCase()} business anywhere in Pakistan? Listing it on LocalePak is free, and thousands of people search for ${info.label.toLowerCase()} services every day. Build your complete profile today — no charge, no card details, no subscription — and let those searches find you.

Scroll through the ${info.label} businesses below and get in touch with the provider that fits your needs.`
}

export function generateCityCategoryContent(city: string, categorySlug: string): string {
  const cityInfo = CITY_INFO[city] || {
    province: 'Pakistan',
    description: "one of Pakistan's well-known urban centres",
    industries: ['retail', 'food', 'services'],
  }
  const catInfo = CATEGORY_INFO[categorySlug] || {
    label: categorySlug ? categorySlug.replace(/-/g, ' ') : 'Category',
    description: 'businesses serving the local community',
    examples: ['local providers', 'firms', 'shops'],
  }

  return `## ${catInfo.label} Businesses in ${city} — Your Local Directory

Hunting for dependable ${catInfo.label.toLowerCase()} services in ${city}? Start here. LocalePak maintains a current, comprehensive directory of ${catInfo.description} operating in ${city}, ${cityInfo.province}.

### Why ${city} Stands Out for ${catInfo.label}

Because ${city} is ${cityInfo.description}, it has built a deep bench of ${catInfo.label.toLowerCase()} businesses serving both local customers and the wider region. The city keeps growing, and its ${catInfo.label.toLowerCase()} providers have grown with it — in number and in quality — so customers today enjoy more choice than at any point in the past.

### What ${city}'s ${catInfo.label} Businesses Offer

Expect variety: the ${catInfo.label.toLowerCase()} sector in ${city} spans ${catInfo.examples.slice(0, 4).join(', ')}. Quick one-off jobs and long-term arrangements are both easy to arrange, with price points and service levels for nearly every budget and requirement.

Modern ${catInfo.label.toLowerCase()} businesses in ${city} increasingly take bookings online, consult over WhatsApp and deliver at home or on site, which makes them easier to reach than ever. Looking for verified ${catInfo.label.toLowerCase()} services near me in ${city}? Each LocalePak profile includes direct WhatsApp numbers and full addresses, so getting in touch takes seconds.

### Choosing the Right ${catInfo.label} Provider in ${city}

Before you commit to a ${catInfo.label.toLowerCase()} business in ${city}, weigh these four checks:

1. Location — favour a provider based near you in ${city}; shorter distances mean faster visits and lower travel costs.
2. Contact options — pick businesses you can reach several ways: phone, WhatsApp and email.
3. Online presence — an active website and social profiles usually signal a transparent, accountable operation.
4. Service fit — read the description closely and confirm the exact service you need is actually offered.

For extra confidence, check legal registration: many businesses publish their FBR NTN or cite their Securities and Exchange Commission of Pakistan registration, and membership of a chamber of commerce — the Lahore Chamber of Commerce and Industry or the Karachi Chamber of Commerce and Industry, for example — is another good sign.

On LocalePak you can line up several ${catInfo.label.toLowerCase()} businesses in ${city} and compare them at a glance before you decide.

### Own a ${catInfo.label} Business in ${city}? List It Free

Run a ${catInfo.label.toLowerCase()} business in ${city}? Put it where thousands of local customers are already looking. A LocalePak listing is completely free — add your contact details, address, description and website, and you can be live today.

See every ${catInfo.label} business in ${city} in the listings below.`
}
