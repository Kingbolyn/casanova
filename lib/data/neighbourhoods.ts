export type LifestyleRating =
  | 'Urban Premium'
  | 'Exclusive Residential'
  | 'Ultra-Premium Exclusive'
  | 'Modern Premium'
  | 'Established Premium'
  | 'Apex Exclusive'

export interface AtAGlance {
  propertyCount:   number
  priceRange:      string
  security:        string
  familyFriendly:  boolean
  waterfront:      string | false
  businessAccess:  string
  lifestyleRating: LifestyleRating
}

export interface LivingHereCard {
  category: 'Architecture' | 'Community' | 'Investment'
  body:     string
}

export interface DayEntry {
  time: string
  copy: string
}

export interface EverydayEssentials {
  schools:       string[]
  restaurants:   string[]
  shopping:      string[]
  healthcare:    string[]
  parks:         string[]
  business:      string[]
  entertainment: string[]
}

export interface ExploreNearby {
  slug: string
  name: string
  city: string
}

export interface Neighbourhood {
  slug:        string
  name:        string
  city:        string
  state:       string
  country:     'Nigeria'
  heroImage:   string
  cardImage:   string
  tagline:     string
  heroFocalY:  string
  character:   string[]
  atAGlance:   AtAGlance
  livingHere:  [LivingHereCard, LivingHereCard, LivingHereCard]
  aDayIn:      DayEntry[]
  essentials:  EverydayEssentials
  nearby:      ExploreNearby[]
  seo: {
    metaTitle:       string
    metaDescription: string
    ogImage:         string
  }
}

export const neighbourhoods: Neighbourhood[] = [

  /* ── Victoria Island ──────────────────────────────────────────── */
  {
    slug:       'victoria-island',
    name:       'Victoria Island',
    city:       'Lagos',
    state:      'Lagos State',
    country:    'Nigeria',
    heroImage:  'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80',
    cardImage:  'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=75',
    tagline:    'Where Lagos does business and decides to stay.',
    heroFocalY: '35%',
    character: [
      'Victoria Island is not the Lagos of chaos and contradiction that the outside world imagines. It is the Lagos that Lagosians built for themselves once they decided the city deserved something better. It sits on a narrow spit of land between Lagos Lagoon and the Atlantic, close enough to both that the air carries a particular quality, damp, salt-edged, and alive in a way that reminds you the ocean is never far.',
      "The streets of Victoria Island hold Lagos's ambitions in physical form. Sanusi Fafunwa. Ademola Adetokunbo. Akin Adesola. Each of these roads carries a mixture of embassies, multinational headquarters, fine restaurants, and quiet residential streets that retreat behind walls and guards at the end of working hours. During the day, VI moves at the pace of commerce. After six, it becomes something else entirely.",
      "The architecture tells the story of a city building itself in real time. Colonial-era bungalows sit beside sharp-edged glass towers that went up in 2019. Neither apologises to the other. This coexistence is not disorderly, it is Lagos being honest about what it is: a city that never erased its past, only layered more on top.",
      "People choose Victoria Island because it resolves what most of Lagos cannot: proximity to everything, without the sacrifice of quality. The finest restaurants are here. The international schools. The business district. The beach clubs. For a certain type of Lagosian, the one who works hard, moves fast, and wants to return home to something that matches the life they have built, Victoria Island is the answer.",
    ],
    atAGlance: {
      propertyCount:   2,
      priceRange:      '$3.5M to $5.5M',
      security:        'Very High',
      familyFriendly:  true,
      waterfront:      'Lagoon and Atlantic access',
      businessAccess:  'Direct, CBD on doorstep',
      lifestyleRating: 'Urban Premium',
    },
    livingHere: [
      {
        category: 'Architecture',
        body: "Victoria Island's built environment is Lagos at its most ambitious. Colonial-era bungalows anchor quiet residential streets while steel-and-glass towers define the skyline. The better residential builds combine floor-to-ceiling glazing with generous compound sizes and indoor-outdoor transitions. A well-designed VI residence on a good plot remains the most sought-after combination the city offers.",
      },
      {
        category: 'Community',
        body: "Victoria Island draws executives who run Nigerian operations of international companies, senior government officials, and entrepreneurs whose offices and homes occupy the same few square kilometres. The community is internationally aware, professionally ambitious, and quietly proud of what the neighbourhood represents. Social life happens at the area's private clubs, restaurant tables, and hotel rooftops.",
      },
      {
        category: 'Investment',
        body: "Victoria Island has consistently outperformed the Lagos property market. Its limited land supply means well-positioned properties rarely depreciate in naira terms, and strong dollar pricing protects international buyers against currency movement. The area's dual role as residential address and commercial hub ensures vacancy rates remain low for buyers thinking in horizons of ten years or more.",
      },
    ],
    aDayIn: [
      { time: '6:30 AM',  copy: 'The morning starts quietly. Most VI residents are early risers by nature. Coffee on a terrace overlooking a courtyard or, for the fortunate ones, across the lagoon. The city is already moving.' },
      { time: '8:00 AM',  copy: 'The office is eight minutes from home. Sometimes less. This is not a detail that Victoria Island residents take for granted, most of them spent years commuting from the mainland before they moved here.' },
      { time: '1:00 PM',  copy: 'Lunch matters in VI. Nok by Alara for contemporary Nigerian cuisine. Craft Grill for something more international. Restaurants here understand that their clientele is eating between meetings, not after them.' },
      { time: '5:30 PM',  copy: 'The working day ends. Landmark Beach is less than ten minutes away. Some go to swim. Others go to watch the Atlantic and decompress in a way that the mainland never quite permits.' },
      { time: '8:00 PM',  copy: 'Dinner is unhurried. The restaurant choices within three kilometres are better than most Nigerian cities can offer in total. Bottles of wine that would be unremarkable in London feel earned here.' },
      { time: '10:30 PM', copy: 'The streets settle. Victoria Island at night is quieter than it seems it should be for a commercial district. Security is visible and professional. Home feels like home.' },
    ],
    essentials: {
      schools:       ['American International School of Lagos', 'Grange School', 'Atlantic Hall'],
      restaurants:   ['Nok by Alara', 'Craft Grill', 'Spice Route', 'The Wharf'],
      shopping:      ['Palms Shopping Mall', 'The RSVP', 'Alara'],
      healthcare:    ['Eko Hospital', 'Reddington Hospital'],
      parks:         ['Landmark Beach', 'Bar Beach', 'Oniru Private Beach'],
      business:      ['Victoria Island CBD', 'Lekki Free Trade Zone (35 mins)'],
      entertainment: ['Eko Hotels and Suites', 'The Wheatbaker', 'Inagbe Grand Beach Resort'],
    },
    nearby: [
      { slug: 'ikoyi',         name: 'Ikoyi',        city: 'Lagos' },
      { slug: 'banana-island', name: 'Banana Island', city: 'Lagos' },
      { slug: 'lekki',         name: 'Lekki',         city: 'Lagos' },
    ],
    seo: {
      metaTitle:       'Victoria Island, Lagos | CasaNova',
      metaDescription: "Where Lagos does business and decides to stay. Discover premium residences on Victoria Island, the city's most connected and prestigious address.",
      ogImage:         'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80',
    },
  },

  /* ── Ikoyi ────────────────────────────────────────────────────── */
  {
    slug:       'ikoyi',
    name:       'Ikoyi',
    city:       'Lagos',
    state:      'Lagos State',
    country:    'Nigeria',
    heroImage:  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80',
    cardImage:  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=75',
    tagline:    'Old money. New standards. Quiet excellence.',
    heroFocalY: '50%',
    character: [
      "Ikoyi does not announce itself. That is, in itself, the announcement. It is Lagos's most understated neighbourhood, which is a remarkable thing to be in a city that is constitutionally incapable of subtlety. The streets here are wider than they need to be. The trees are older than most of the buildings. The compounds are set back from the road at a distance that communicates, without saying a word, that what happens inside is private.",
      'Bourdillon Road is arguably the most prestigious residential address in Nigeria. The houses that line it, set behind gates, security booths, and mature gardens, are occupied by the people who shaped what the country became and the generation now deciding what it will be next. The road itself is not showy. It is simply quiet in a way that only accumulated wealth permits.',
      'The architecture of Ikoyi spans almost a century. Colonial-era properties sit beside 1980s compounds that remain enormous by any standard, and beside the newer developments, careful, considered, often European in aesthetic sensibility, that the last decade of serious money has produced. What they share is scale. Ikoyi does not do small.',
      "Ikoyi is for people who have already proven what they wanted to prove. What they want, and what Ikoyi delivers with unusual consistency, is peace. The reliable peace of a neighbourhood where the streets are maintained, the neighbours are discreet, and the sound at midnight is wind in mature trees.",
    ],
    atAGlance: {
      propertyCount:   2,
      priceRange:      '$4M to $8M',
      security:        'Premium',
      familyFriendly:  true,
      waterfront:      'Partial, lagoon proximity',
      businessAccess:  'High, VI 10 minutes',
      lifestyleRating: 'Exclusive Residential',
    },
    livingHere: [
      {
        category: 'Architecture',
        body: "Ikoyi's residential architecture is defined by scale and restraint. The best properties here are not trying to be impressive, they simply are. Plots are generous, often exceeding 2,000 square metres. Builds prioritise interior volume: double-height living spaces, libraries, staff quarters, and indoor-outdoor transitions. A well-maintained Ikoyi compound is, by any global standard, a serious piece of real estate.",
      },
      {
        category: 'Community',
        body: "Ikoyi's community is multi-generational. Families who have lived here since the 1960s still occupy houses their parents built. Beside them, technology founders, banking executives, and senior diplomats have moved in over the past decade. Both groups value the same thing: discretion. Ikoyi does not have a social scene. It has social relationships, which is different and, to most residents, preferable.",
      },
      {
        category: 'Investment',
        body: "Ikoyi property does not move quickly and it does not move cheaply. That combination, illiquidity at entry, strength at exit, reflects a market where supply is genuinely constrained. The most resilient Ikoyi addresses have appreciated in USD terms over twenty years in ways that made early buyers look very thoughtful indeed.",
      },
    ],
    aDayIn: [
      { time: '6:00 AM',  copy: 'Early mornings in Ikoyi are remarkable. The traffic is not yet present. The air is cooler than it will be by nine. A walk along the quieter residential streets, past compounds and mature gardens, is the kind of start to the day that clears a mind that has been moving fast for too long.' },
      { time: '8:30 AM',  copy: 'The commute to Victoria Island takes eleven minutes. Some residents take it. Others work from home offices that, in Ikoyi, tend to be serious rooms with serious libraries.' },
      { time: '12:30 PM', copy: 'Ikoyi has fewer restaurants than VI but better ones. The Wheatbaker Hotel dining room. Nargile. Or something simpler, fresh bread from one of the neighbourhood bakeries that has somehow survived the development.' },
      { time: '4:00 PM',  copy: 'Children back from school. Ikoyi is, for its quiet, one of the most family-oriented neighbourhoods in Lagos. The compounds have space for children to exist without being managed. That is rarer than it sounds.' },
      { time: '7:30 PM',  copy: 'Dinner at home. Ikoyi residents cook more than their Victoria Island counterparts. The compounds are designed for it. The kitchens are real kitchens.' },
      { time: '10:00 PM', copy: 'The neighbourhood has been quiet for over an hour. That is not a failure. It is the point.' },
    ],
    essentials: {
      schools:       ['Corona Secondary School', 'Greensprings School', 'Atlantic Hall'],
      restaurants:   ['The Wheatbaker', 'Nargile', 'Spice Route', 'Bungalow'],
      shopping:      ['Alara', 'Treasure Plaza', 'Lekki Mall'],
      healthcare:    ['Reddington Hospital', 'Eko Hospital (VI, 10 mins)'],
      parks:         ['Ikoyi Club 1938', 'Lagos Polo Club', 'Ikoyi Park'],
      business:      ['Victoria Island (10 mins)', 'Lekki (25 mins)'],
      entertainment: ['Ikoyi Club', 'Lagos Polo Club', 'The Wheatbaker'],
    },
    nearby: [
      { slug: 'victoria-island', name: 'Victoria Island', city: 'Lagos' },
      { slug: 'banana-island',   name: 'Banana Island',   city: 'Lagos' },
      { slug: 'lekki',           name: 'Lekki',           city: 'Lagos' },
    ],
    seo: {
      metaTitle:       'Ikoyi, Lagos | CasaNova',
      metaDescription: "Old money, new standards, quiet excellence. Explore premium residences in Ikoyi, Lagos's most discreet and distinguished residential address.",
      ogImage:         'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
    },
  },

  /* ── Banana Island ────────────────────────────────────────────── */
  {
    slug:       'banana-island',
    name:       'Banana Island',
    city:       'Lagos',
    state:      'Lagos State',
    country:    'Nigeria',
    heroImage:  'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1600&q=80',
    cardImage:  'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&q=75',
    tagline:    "Lagos's most private address. Some things are earned.",
    heroFocalY: '40%',
    character: [
      "Banana Island is not a metaphor. It is a real place, a man-made peninsula connected to Ikoyi by a single causeway, shaped by the engineers who built it into the elongated curve its name describes. Everything about it was designed from the beginning: the road widths, the plot sizes, the drainage, the landscaping. It was conceived as Lagos's answer to a question the city had been asking itself for decades, what would a truly planned residential neighbourhood look like?",
      "The answer is an enclave of approximately 1,000 plots on reclaimed land, bordered on three sides by Lagos Lagoon, accessible through a single security checkpoint, and occupied by a concentration of wealth per square metre that has no parallel anywhere in West Africa. Foreign embassies have built residences here. The founders of Nigerian conglomerates have built compounds here. The security reflects this, thorough, professional, and invisible enough not to be oppressive.",
      "The architecture is almost uniformly contemporary. Because the island was built within a relatively compressed timeframe, the visual vocabulary is more consistent than elsewhere in Lagos: wide frontages, double garages, swimming pools set within compound gardens, and a general commitment to the idea that a house should be, above all, a sanctuary. The lagoon views from the western plots are among the most remarkable in any Nigerian city.",
      "There are fewer than a handful of properties available at any given time on Banana Island. The owners do not sell because they need to. Each transaction is a notable event in the Lagos property market. To own here is to own at the summit of what Lagos residential real estate represents.",
    ],
    atAGlance: {
      propertyCount:   2,
      priceRange:      '$5M to $12M',
      security:        'Maximum',
      familyFriendly:  true,
      waterfront:      'Three-sided lagoon frontage',
      businessAccess:  'Moderate, Ikoyi 8 mins, VI 18 mins',
      lifestyleRating: 'Ultra-Premium Exclusive',
    },
    livingHere: [
      {
        category: 'Architecture',
        body: "Banana Island's architecture is the most consistently modern in Lagos. The island's planned nature means properties were built within the same era, producing a coherent aesthetic: contemporary forms, generous compound walls, double-height entrances, and extensive use of glass on lagoon-facing elevations. The best properties have been updated multiple times since construction and represent the current state of serious residential architecture in Lagos.",
      },
      {
        category: 'Community',
        body: "Banana Island's community is, of its nature, exclusive. The single access point means that everyone who lives here knows, at some level, who their neighbours are. Community here is something that emerges from proximity and shared values rather than organised activity. There are no public gathering places to speak of. That is not an oversight. It is a feature.",
      },
      {
        category: 'Investment',
        body: "Banana Island is the Lagos property market's most durable store of value. Its controlled supply, the island cannot expand, and consistent demand from Nigeria's highest-net-worth families have produced a price floor that has not been meaningfully tested in twenty years. Dollar-denominated transactions are the norm. Properties here are bought for preservation, for prestige, and for the knowledge that in a city as volatile as Lagos, the address itself is stable.",
      },
    ],
    aDayIn: [
      { time: '6:30 AM', copy: 'The morning starts with the lagoon. From the upper floors of most Banana Island properties, the water is visible in three directions. The light at dawn on the Lagos Lagoon is a particular, amber thing that residents describe as the reason they never seriously consider leaving.' },
      { time: '8:15 AM', copy: 'The drive to Victoria Island takes eighteen minutes. The causeway through Ikoyi is quiet at this hour. The security checkpoint at the island entrance is noted but not intrusive.' },
      { time: '1:00 PM', copy: 'Lunch is usually brought in. Banana Island has very little in the way of restaurants, this is by design. The island residents are not here for the hospitality industry. They built kitchens for a reason.' },
      { time: '4:30 PM', copy: 'The afternoon hours are the island gift. The temperature drops slightly from the lagoon breeze. Children have returned from school. The compounds become active in ways they are not during the working day.' },
      { time: '7:00 PM', copy: 'Sunset over the lagoon from a Banana Island terrace is Lagos at its most generous. The city is visible in the middle distance, the skyline of Victoria Island, the lights of the bridges. It feels, from here, like a city worth all of it.' },
      { time: '9:30 PM', copy: 'Quiet settles fully. The gates are secured. The security rotation continues, unseen. This is, without qualification, one of the safest nights of sleep in West Africa.' },
    ],
    essentials: {
      schools:       ['American International School of Lagos', 'Greensprings School', 'Corona Secondary'],
      restaurants:   ['The Wheatbaker (Ikoyi, 8 mins)', 'Nok by Alara (VI, 18 mins)', 'Private catering preferred'],
      shopping:      ['Alara', 'Treasure Plaza (Ikoyi)', 'Palms Shopping Mall (VI)'],
      healthcare:    ['Reddington Hospital (Ikoyi, 10 mins)', 'Eko Hospital (VI)'],
      parks:         ['Private lagoon access', 'Ikoyi Club (10 mins)', 'Lagos Polo Club'],
      business:      ['Victoria Island (18 mins)', 'Ikoyi (8 mins)'],
      entertainment: ['Private, almost entirely private'],
    },
    nearby: [
      { slug: 'ikoyi',           name: 'Ikoyi',           city: 'Lagos' },
      { slug: 'victoria-island', name: 'Victoria Island', city: 'Lagos' },
    ],
    seo: {
      metaTitle:       'Banana Island, Lagos | CasaNova',
      metaDescription: "Lagos's most private address. Discover ultra-premium residences on Banana Island, West Africa's most exclusive residential enclave.",
      ogImage:         'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200&q=80',
    },
  },

  /* ── Lekki ────────────────────────────────────────────────────── */
  {
    slug:       'lekki',
    name:       'Lekki',
    city:       'Lagos',
    state:      'Lagos State',
    country:    'Nigeria',
    heroImage:  'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1600&q=80',
    cardImage:  'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=75',
    tagline:    "The city's next chapter, already written.",
    heroFocalY: '45%',
    character: [
      'Lekki is where Lagos decided that it was going to grow rather than simply accumulate. The older parts of the city have run out of room in the ways that cities with finite geography eventually do. Lekki is the answer to that problem: a long peninsula stretching east along the Atlantic coast, wide enough to contain ambition on a scale that the island neighbourhoods can no longer accommodate.',
      'Lekki Phase 1 is the established core, the part that was built first and has matured into a genuine residential community with its own texture and pace. The roads are maintained with unusual consistency for Lagos. The proximity to the Atlantic gives the whole area a freshness of air that residents cite more than almost any other quality.',
      "The architecture of Lekki has been shaped by a generation of developers who came of age watching what worked and what failed in Ikoyi and Victoria Island. The better properties here are cleaner in line than their predecessors, less ornamented, more considered in their relationship to climate, more likely to have been designed by architects who trained internationally.",
      'Lekki attracts a different demographic than Ikoyi. Not less successful, different. These are professionals in their thirties and forties who are building, rather than resting on, what they have achieved. The energy of the neighbourhood reflects this: more restaurants, more new businesses, more construction. Lekki is not finished. That is exactly why a certain kind of buyer finds it compelling.',
    ],
    atAGlance: {
      propertyCount:   2,
      priceRange:      '$1.5M to $3.5M',
      security:        'High',
      familyFriendly:  true,
      waterfront:      'Atlantic coastline',
      businessAccess:  'Growing, Lekki Free Trade Zone nearby',
      lifestyleRating: 'Modern Premium',
    },
    livingHere: [
      {
        category: 'Architecture',
        body: "Lekki's architecture is the most contemporary of Lagos's established residential neighbourhoods. The dominant form is the detached duplex and triplex with back garden, covered terrace, and small pool. The better developments along the Admiralty Way corridor have communal facilities, pools, gyms, concierge services, that the island neighbourhoods do not offer. Lekki is building the Lagos that global standards demand.",
      },
      {
        category: 'Community',
        body: "Lekki's community is the most diverse in affluent Lagos. Young banking executives beside established entrepreneurs beside media personalities beside diaspora returnees who chose Lekki specifically for its modernity. The restaurant scene is better than anywhere outside Victoria Island, the nightlife is real, and the sense that something is being built collectively gives the neighbourhood a forward-leaning energy.",
      },
      {
        category: 'Investment',
        body: 'Lekki represents the best growth story in Lagos residential real estate. The Lekki Free Trade Zone, the Dangote Refinery, and ongoing infrastructure investment along the Lekki-Epe corridor are transforming the area. Properties in Phase 1 have already benefited substantially. For buyers with a five-to-ten-year horizon, Lekki is the argument.',
      },
    ],
    aDayIn: [
      { time: '6:00 AM',  copy: 'The morning run along Admiralty Way is a Lekki institution. The road is wide, the air comes off the Atlantic, and at this hour the traffic that will later define the day has not yet arrived. Lekki residents understand their window and they use it.' },
      { time: '8:30 AM',  copy: 'The commute to Victoria Island takes between twenty-five and fifty minutes depending on the day. This is the accepted cost of the lifestyle the neighbourhood provides. Most residents have made their peace with it.' },
      { time: '12:30 PM', copy: "Lekki's restaurant scene is serious. The Oriental Hotel. Circa Restaurant. Any number of newer openings along Admiralty Way that have arrived in the last five years to serve a neighbourhood that has developed a palate." },
      { time: '5:00 PM',  copy: 'The beach is the answer. Elegushi Beach is ten minutes from most of Lekki Phase 1. The Atlantic is real and immediate. Some residents go to swim. Others go to sit. The water does not care what you need from it.' },
      { time: '8:00 PM',  copy: "Lekki at night is the most alive of Lagos's residential neighbourhoods after dark. The restaurants are full until eleven. The bars are real. The energy is generational, this is where people who have decided to enjoy what they have built come to do exactly that." },
    ],
    essentials: {
      schools:       ['Corona Secondary', 'Greensprings School (Lekki Campus)', 'Lead British International School'],
      restaurants:   ['Circa Restaurant', 'The Oriental Hotel', 'Quilox', 'Cactus Restaurant'],
      shopping:      ['The Palms Shopping Mall', 'Circle Mall', 'Lekki Market'],
      healthcare:    ['Lagoon Hospital (Lekki)', 'St. Nicholas Hospital'],
      parks:         ['Elegushi Beach', 'Lekki Conservation Centre', 'Maroko Beach'],
      business:      ['Lekki Free Trade Zone (30 mins)', 'Victoria Island (35 mins)'],
      entertainment: ['Quilox Club', 'Elegushi Beach Club', 'Sky Restaurant and Lounge'],
    },
    nearby: [
      { slug: 'victoria-island', name: 'Victoria Island', city: 'Lagos' },
      { slug: 'ikoyi',           name: 'Ikoyi',           city: 'Lagos' },
    ],
    seo: {
      metaTitle:       'Lekki, Lagos | CasaNova',
      metaDescription: "The city's next chapter, already written. Discover modern premium residences in Lekki, Lagos's fastest-growing luxury address on the Atlantic coast.",
      ogImage:         'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=80',
    },
  },

  /* ── Maitama ──────────────────────────────────────────────────── */
  {
    slug:       'maitama',
    name:       'Maitama',
    city:       'Abuja',
    state:      'FCT',
    country:    'Nigeria',
    heroImage:  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1600&q=80',
    cardImage:  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=75',
    tagline:    'Abuja at its most considered.',
    heroFocalY: '40%',
    character: [
      "Abuja was built to a plan. When Nigeria's federal government moved its capital from Lagos in the late 1980s, they were not simply relocating offices, they were constructing a city from intention. Maitama was the district designated for its finest residential addresses, and decades later that intention has been faithfully honoured. The roads are wide, regularly divided by medians of mature plantings, and maintained to a standard that makes Maitama feel, to visitors from Lagos, almost impossibly ordered.",
      "The embassies are here. The residences of senior ministers. The compounds of the banking executives and oil company country managers who rotate through Abuja's permanent administrative machine. Maitama's identity has always been inseparable from the federal government, but it has attracted private wealth alongside public authority in ways that give it a texture that purely government neighbourhoods lack.",
      "The architecture is, by Nigerian standards, spacious almost to excess. Abuja's master plan was generous with land, and Maitama benefited disproportionately. The typical property sits on a plot measured in thousands of square metres, with setbacks from the road that create the impression of a neighbourhood always holding something back.",
      "Maitama's pace is Abuja's pace: deliberately unhurried. This is a city designed for governance, not commerce. Evenings in Maitama are genuinely quiet. Weekends are genuinely peaceful. For people who come from Lagos, this is either the selling point or the drawback depending entirely on where they are in their life.",
    ],
    atAGlance: {
      propertyCount:   1,
      priceRange:      '$2M to $5M',
      security:        'Premium',
      familyFriendly:  true,
      waterfront:      false,
      businessAccess:  'High, federal ministries on doorstep',
      lifestyleRating: 'Established Premium',
    },
    livingHere: [
      {
        category: 'Architecture',
        body: "Maitama's architecture reflects Abuja's planned origins. Properties are set on generous plots with mandatory setbacks that give the neighbourhood its open, unhurried feel. The better residential builds combine the solidity of the federal-era construction style with contemporary interior treatments, imported kitchens, home automation, pools designed as architectural features. A well-maintained Maitama residence is among the most liveable properties in Nigeria.",
      },
      {
        category: 'Community',
        body: "Maitama's community is built around institutional Nigeria. Ambassadors. Permanent Secretaries. Senators in residence. The senior ranks of Nigerian private enterprise who maintain their Abuja footprint alongside Lagos operations. It is a community of people who are, by profession and inclination, measured rather than expressive. Social life happens at diplomatic receptions, private dinners, and the club facilities that serve this cohort.",
      },
      {
        category: 'Investment',
        body: "Maitama's investment case is built on institutional demand. As long as the federal government remains in Abuja, senior federal employees, diplomats, and the private sector that services both will continue to require accommodation at the top of the market. Maitama is where that demand concentrates, the best address in Nigeria's capital, across every political cycle.",
      },
    ],
    aDayIn: [
      { time: '6:30 AM',  copy: 'Maitama mornings have a quality that Lagos mornings rarely achieve: quietness without desertion. The streets are empty but maintained. The air is cleaner than the coast, drier, the Sahel noting its proximity. A morning walk here is restorative in a specific way.' },
      { time: '8:00 AM',  copy: 'The federal ministries are minutes away. For residents whose work is in government or government-adjacent, the commute in Maitama is essentially theoretical.' },
      { time: '1:00 PM',  copy: "Transcorp Hilton remains Abuja's most important room for the kind of lunch that has meaning. Nicon Luxury serves a similar purpose. Both are within seven minutes of any Maitama address." },
      { time: '4:30 PM',  copy: "Abuja's afternoons in the dry season have a particular quality: clear, bright, slightly cool in a way that the coastal cities never quite achieve. The neighbourhood is built for walking in a way that no Lagos neighbourhood attempts." },
      { time: '7:30 PM',  copy: 'Dinner in Maitama is a private affair. The compound kitchens are large. The guest lists are discreet. The conversation is, given the company, always interesting.' },
      { time: '10:00 PM', copy: 'Maitama at night is among the quietest residential environments in any Nigerian city. This is either its greatest quality or its greatest limitation, depending entirely on who is asking.' },
    ],
    essentials: {
      schools:       ['American International School of Abuja', 'Whiteplains British School', 'Hillcrest School'],
      restaurants:   ['Transcorp Hilton restaurants', 'The Place', 'Nicon Luxury Hotel', 'Mint Rooftop'],
      shopping:      ['Ceddi Plaza', 'Wuse Market', 'Jabi Lake Mall (15 mins)'],
      healthcare:    ['Cedarcrest Hospital', 'National Hospital Abuja'],
      parks:         ['Millennium Park (10 mins)', 'Jabi Lake', 'Abuja National Stadium'],
      business:      ['Three Arms Zone (5 mins)', 'Central Business District (10 mins)'],
      entertainment: ['Transcorp Hilton', 'Abuja Continental Hotel', 'Diplomatic circuit events'],
    },
    nearby: [
      { slug: 'asokoro', name: 'Asokoro', city: 'Abuja' },
    ],
    seo: {
      metaTitle:       'Maitama, Abuja | CasaNova',
      metaDescription: "Abuja at its most considered. Discover established premium residences in Maitama, the federal capital's most prestigious and serene residential address.",
      ogImage:         'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80',
    },
  },

  /* ── Asokoro ──────────────────────────────────────────────────── */
  {
    slug:       'asokoro',
    name:       'Asokoro',
    city:       'Abuja',
    state:      'FCT',
    country:    'Nigeria',
    heroImage:  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&q=80',
    cardImage:  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=75',
    tagline:    'The address power returns to at the end of the day.',
    heroFocalY: '35%',
    character: [
      "Asokoro occupies the hill above Abuja. Not metaphorically, literally. The district rises above the city's central plateau, positioned behind the Three Arms Zone that houses the executive, legislative, and judicial arms of Nigeria's federal government. This proximity is not incidental. Asokoro was designed as the residential address of the Nigerian state at its most senior.",
      'To drive into Asokoro is to experience security as architecture. The roads are controlled. The compounds are walled. The trees are mature. The few commercial establishments that exist are the kind that understand the expectations of the neighbourhood, quiet, professional, discreet. Asokoro does not encourage casual visitors. It is designed for the people who live there and the people they invite.',
      "The properties in Asokoro are among the largest in Nigeria. The federal government allocated plots on a scale that reflects the ambitions of those for whom the neighbourhood was intended. A typical Asokoro compound occupies a plot that would accommodate four or five properties in Lekki. The defining quality is consistency of scale. Nothing here is small.",
      "Asokoro is not a neighbourhood for people who are building their position. It is for people who have already built it and have arrived at the stage where what they value most is the quality of the silence. The silence here is high quality. It is the silence of a neighbourhood that has nothing to prove and nowhere to be except where it already is.",
    ],
    atAGlance: {
      propertyCount:   1,
      priceRange:      '$3M to $7M',
      security:        'Maximum',
      familyFriendly:  true,
      waterfront:      false,
      businessAccess:  'Exceptional, federal seat of power adjacent',
      lifestyleRating: 'Apex Exclusive',
    },
    livingHere: [
      {
        category: 'Architecture',
        body: "Asokoro's architecture is defined by scale above all other qualities. The plots were allocated during Abuja's founding period on terms that reflect the seniority of their intended occupants, producing properties of a size that the private market in Lagos can rarely match at comparable price points. The better properties have been substantially renovated, modern security integration, continuous-operation generators, contemporary finishes, while maintaining structural solidity.",
      },
      {
        category: 'Community',
        body: "Asokoro's community is Nigeria's governing elite in its residential form. Former heads of state maintain compounds here. Senior cabinet members. Retired generals. The most senior civil servants whose careers are measured in decades. Beside them, oil executives, banking chiefs, and the chairmen of conglomerates who have positioned themselves as close to the federal machinery as their business models require.",
      },
      {
        category: 'Investment',
        body: 'Asokoro investment is fundamentally about irreplaceability. There are no new Asokoro plots. Properties here transact privately, rarely publicly, at prices that reflect what the buyer needs, access, address, security. It has held value across every crisis Nigeria has experienced in the past thirty years. The correlation between permanence and performance is not accidental.',
      },
    ],
    aDayIn: [
      { time: '6:00 AM',  copy: 'The hill catches light earlier than the valley. Asokoro mornings are bright and, by Nigerian standards, cool. Residents who exercise have access to compound gardens large enough to accommodate serious morning routines without leaving the property.' },
      { time: '7:30 AM',  copy: "The Three Arms Zone is less than five minutes from any Asokoro address. For those whose work is at the summit of Nigeria's governmental machinery, the commute exists only in the most technical sense." },
      { time: '1:00 PM',  copy: 'Lunch is usually private. The compounds have the kitchen infrastructure for serious cooking and the staff to execute it. Restaurant culture, in the Asokoro sense, means the Abuja Continental or Transcorp Hilton for meetings that require neutral ground.' },
      { time: '4:00 PM',  copy: "The afternoon in Asokoro belongs to its residents. There is no ambient pressure to be elsewhere. The neighbourhood's physical isolation from the city's commercial energy is precisely what its residents paid for." },
      { time: '8:00 PM',  copy: 'Asokoro evenings are, by design, private. The security protocols that govern the neighbourhood become, after dark, a kind of absolute guarantee. The dinner table here is one of the most private spaces in Nigeria.' },
      { time: '11:00 PM', copy: 'Asokoro is fully quiet before the day is technically over. The neighbourhood goes to sleep early because the neighbourhood rises with responsibility. Tomorrow matters. The silence is earned.' },
    ],
    essentials: {
      schools:       ['American International School of Abuja (15 mins)', 'Lebanese International School', 'Whiteplains'],
      restaurants:   ['Transcorp Hilton (10 mins)', 'Abuja Continental', 'Private club facilities'],
      shopping:      ['Ceddi Plaza (15 mins)', 'Garki Market', 'Wuse Market'],
      healthcare:    ['Cedarcrest Hospital', 'Garki General Hospital', 'National Hospital Abuja'],
      parks:         ['Asokoro District Park', 'Millennium Park (15 mins)'],
      business:      ['Three Arms Zone (5 mins)', 'Central Business District (10 mins)'],
      entertainment: ['Private, the compound is the entertainment'],
    },
    nearby: [
      { slug: 'maitama', name: 'Maitama', city: 'Abuja' },
    ],
    seo: {
      metaTitle:       'Asokoro, Abuja | CasaNova',
      metaDescription: 'The address power returns to at the end of the day. Discover apex exclusive residences in Asokoro, the most prestigious and private address in Nigeria\'s capital.',
      ogImage:         'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80',
    },
  },
]
