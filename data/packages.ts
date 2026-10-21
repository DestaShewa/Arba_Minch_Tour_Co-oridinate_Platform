import { ExperiencePackage } from "@/types/package";

export const PACKAGES: ExperiencePackage[] = [
  {
    id: "pkg-chamo-half-day",
    slug: "lake-chamo-experience",
    title: "Lake Chamo Experience",
    shortDescription:
      "A focused boat expedition on Lake Chamo to witness the famous crocodile market, hippos, and abundant aquatic birdlife.",
    overview:
      "Lake Chamo is known for some of the largest Nile crocodiles in Africa and thriving pods of hippopotami. This half-day experience provides coordinated transport from your Arba Minch hotel to the boat landing at Lake Chamo, an experienced local boat captain, safety life jackets, and an optional licensed local nature guide. Provider availability is confirmed directly before your quotation is finalized.",
    duration: "Half day (approx. 4.5 hours)",
    startingPriceETB: 3500,
    priceType: "per_person",
    priceNote: "Starting from 3,500 ETB per person for a group of 2 or more. Final price depends on group size and provider availability.",
    lastPriceUpdate: "October 2026",
    groupSizeRange: "1 to 10 travelers",
    heroImage: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    ],
    keyHighlights: [
      "Boat ride to the famous Crocodile Market sandbanks",
      "Close and safe observation of Nile hippopotamus pods",
      "Birdwatching: African fish eagles, pelicans, and kingfishers",
      "Dedicated AMX coordinator managing pickup and boat departure",
    ],
    itinerary: [
      {
        time: "07:30",
        title: "Hotel Pickup in Arba Minch",
        description: "Your verified local driver meets you at your hotel or lodge reception in Arba Minch.",
        location: "Arba Minch Town",
      },
      {
        time: "08:15",
        title: "Arrival at Chamo Boat Station",
        description: "Safety briefing and fitting of verified personal flotation life jackets before boarding.",
        location: "Lake Chamo Dock",
      },
      {
        time: "08:30",
        title: "Lake Chamo Boat Expedition",
        description: "Cruise along the southern shores toward the Crocodile Market and hippo viewing shallows.",
        location: "Lake Chamo Waters",
      },
      {
        time: "10:45",
        title: "Return to Shore & Debarkation",
        description: "Boat docks at the landing point; driver prepares the vehicle for return transfer.",
        location: "Lake Chamo Dock",
      },
      {
        time: "11:30",
        title: "Optional Fish Lunch or Return",
        description: "Stop at a verified local fish restaurant in Sikela or return directly to your accommodation.",
        location: "Arba Minch",
      },
      {
        time: "12:00",
        title: "Drop-off at Hotel",
        description: "Return to your hotel with completion of coordination support for this activity.",
        location: "Arba Minch Hotel",
      },
    ],
    includedList: [
      "Dedicated AMX trip coordinator on call",
      "Round-trip transport coordination between hotel and boat dock",
      "Licensed motorized boat and experienced local captain",
      "Standard life jackets for all passengers",
      "Local lake community association coordination",
    ],
    excludedList: [
      "Park/lake entrance fees (unless explicitly confirmed in quotation)",
      "Food, alcoholic beverages, and bottled drinks",
      "Optional gratuity tips for boat captain and driver",
      "Travel or medical insurance",
    ],
    priceTable: [
      { item: "Transport (Hotel - Boat Dock - Return)", status: "included", note: "Verified local driver" },
      { item: "Motorized Boat & Certified Captain", status: "included", note: "Lake Chamo Cooperative" },
      { item: "Local Guiding Service", status: "optional", note: "Certified English/Amharic guide" },
      { item: "Entrance / Community Fees", status: "to_be_confirmed", note: "ETB 200 - 300 per person" },
      { item: "Meals & Refreshments", status: "excluded", note: "Pay directly at restaurant" },
      { item: "Hotel Accommodation", status: "optional", note: "Available on request" },
    ],
    cancellationPolicy:
      "Cancel up to 24 hours before scheduled pickup for a full refund or free date adjustment. Cancellations within 24 hours are subject to boat reservation holding fees.",
    safetyAndPreparation: [
      "Wear sun protection (hat, sunscreen, sunglasses).",
      "Always keep life jackets fastened while on the boat.",
      "Maintain a safe distance from wildlife as directed by your captain.",
      "Bring binoculars or a telephoto camera lens if available.",
    ],
    faqs: [
      {
        question: "Is this boat trip safe with crocodiles and hippos?",
        answer: "Yes. Our boat captains are lifelong local lake navigators who maintain strict safe distances while ensuring excellent viewing.",
      },
      {
        question: "When is the best time of day to see the crocodiles?",
        answer: "Morning between 08:30 and 11:00 AM is ideal, as crocodiles sunbathe along the sandbanks to regulate their body temperature.",
      },
    ],
    featuredProviderIds: ["prov-boat-berhanu", "prov-driver-tadesse", "prov-guide-abebe"],
    relatedPackageSlugs: ["dorze-and-lake-chamo", "custom-arba-minch-experience"],
  },
  {
    id: "pkg-dorze-chamo-2days",
    slug: "dorze-and-lake-chamo",
    title: "Dorze and Lake Chamo",
    shortDescription:
      "A complete two-day immersion combining the mountain weaving culture of the Dorze people with the aquatic wildlife of Lake Chamo.",
    overview:
      "Experience the distinct natural and cultural contrast of the Gamo highlands and the Rift Valley lakes. On Day 1, ascend into the cool Guge mountains to visit a traditional Dorze village, known for organic beehive-shaped bamboo architecture, traditional enset (false banana) bread preparation, and vibrant hand-loom weaving. On Day 2, descend to Lake Chamo for an early morning boat excursion to see crocodiles and hippos. AMX organizes your transport, verified cultural guide, boat reservation, and partner lodge accommodations.",
    duration: "Two days / One night",
    startingPriceETB: 8500,
    priceType: "per_person",
    priceNote: "Starting from 8,500 ETB per person based on double occupancy. Final price depends on selected lodge category and dates.",
    lastPriceUpdate: "October 2026",
    groupSizeRange: "1 to 8 travelers",
    heroImage: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    ],
    keyHighlights: [
      "Visit an authentic Dorze homestead with bamboo architecture",
      "Live demonstration of Enset ('false banana') Kocho bread making",
      "Traditional Dorze weaving craft demonstration",
      "Morning boat expedition on Lake Chamo Crocodile Market",
      "Overnight stay coordination at a verified highland or lake lodge",
    ],
    itinerary: [
      {
        time: "Day 1 — 09:00",
        title: "Scenic Drive to Dorze Highlands",
        description: "Pick up from Arba Minch and scenic mountain drive up to Chencha/Dorze with panoramic views of Lake Abaya and Lake Chamo.",
        location: "Dorze Mountain Road",
      },
      {
        time: "Day 1 — 10:30",
        title: "Dorze Village Cultural Immersion",
        description: "Explore the tall elephant-shaped bamboo homes. Experience local weaving and Kocho flatbread preparation with fermented enset.",
        location: "Dorze Village, Chencha",
      },
      {
        time: "Day 1 — 13:00",
        title: "Traditional Highland Lunch",
        description: "Enjoy freshly baked Kocho with local organic honey, highland coffee, and traditional dishes.",
        location: "Dorze Community Lodge",
      },
      {
        time: "Day 1 — 16:00",
        title: "Check-in at Partner Lodge",
        description: "Check into your verified lodge in Dorze or back in Arba Minch with scenic sunset viewpoints.",
        location: "Arba Minch / Dorze",
      },
      {
        time: "Day 2 — 08:00",
        title: "Lake Chamo Boat Expedition",
        description: "Private boat excursion to the Crocodile Market sandbanks and hippopotamus territories.",
        location: "Lake Chamo",
      },
      {
        time: "Day 2 — 12:30",
        title: "Trip Wrap-up & Coordinator Check-out",
        description: "Transfer to Arba Minch Airport (AMH) or your onwards accommodation with local coordinator support.",
        location: "Arba Minch Airport / Hotel",
      },
    ],
    includedList: [
      "Dedicated AMX coordinator handling reservations and timing",
      "Private 4WD vehicle with dedicated driver for 2 days",
      "Certified local Dorze cultural guide",
      "Dorze village community visit and cultural demonstration fees",
      "Lake Chamo boat safari coordination and certified captain",
      "Life jackets for all water activities",
    ],
    excludedList: [
      "Lodge accommodation night (quoted separately based on preferred category)",
      "Dinners and personal bar drinks",
      "National park entrance permits if entering Nech Sar land gate",
      "Souvenirs and personal expenses",
    ],
    priceTable: [
      { item: "Dedicated 4WD Vehicle & Fuel (2 Days)", status: "included", note: "Verified driver included" },
      { item: "Dorze Cultural Guide & Village Entrance", status: "included", note: "Certified community guide" },
      { item: "Lake Chamo Boat Charter", status: "included", note: "Captained boat with life jackets" },
      { item: "Overnight Lodge Room", status: "optional", note: "Standard or View Lodge option" },
      { item: "Park Entrance Fees", status: "to_be_confirmed", note: "Depends on nationality/residency" },
      { item: "All Meals & Alcoholic Drinks", status: "excluded", note: "Paid direct to establishments" },
    ],
    cancellationPolicy:
      "Free cancellation up to 48 hours before scheduled departure. Within 48 hours, lodge deposit terms apply.",
    safetyAndPreparation: [
      "Highland weather in Dorze can be cool and windy — bring a warm fleece jacket.",
      "Sturdy walking shoes are recommended for village walkways.",
      "Support local weavers by purchasing authentic cotton scarves directly from artisans.",
    ],
    faqs: [
      {
        question: "Can we sleep in a traditional Dorze bamboo hut?",
        answer: "Yes, we can arrange an authentic overnight stay at a Dorze community lodge, or reserve a scenic lodge in Arba Minch overlooking the two lakes.",
      },
      {
        question: "Is this package suitable for families with children?",
        answer: "Yes. The cultural demonstrations are interactive, and the boat journey is smooth and equipped with child-sized life jackets.",
      },
    ],
    featuredProviderIds: ["prov-guide-meseret", "prov-driver-yohannes", "prov-hotel-paradise", "prov-boat-berhanu"],
    relatedPackageSlugs: ["lake-chamo-experience", "custom-arba-minch-experience"],
  },
  {
    id: "pkg-custom-arba-minch",
    slug: "custom-arba-minch-experience",
    title: "Custom Arba Minch Experience",
    shortDescription:
      "A tailored itinerary curated around your dates, pace, and interests across Lake Abaya, Nech Sar plains, and Forty Springs.",
    overview:
      "Design your personal journey through southern Ethiopia's lake country. Whether you want to trek the Forty Springs forest, birdwatch along Lake Abaya's reddish shores, observe plains zebras in Nech Sar National Park, or spend extra days exploring Gamo cultural markets, AMX builds one clear itinerary. We coordinate verified drivers, certified guides, and boat operators into one written schedule with an itemized ETB quotation.",
    duration: "Flexible (1 to 5+ days)",
    startingPriceETB: 0,
    priceType: "custom_quotation",
    priceNote: "Custom quotation built according to your selected activities, group size, and vehicle preferences.",
    lastPriceUpdate: "October 2026",
    groupSizeRange: "Solo, couples, families, or private groups",
    heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80",
    ],
    keyHighlights: [
      "Personalized itinerary built with your assigned AMX coordinator",
      "Option to visit Forty Springs groundwater forest",
      "Option for Lake Abaya reddish shoreline and viewpoints",
      "Nech Sar National Park wildlife and landscape coordination",
      "Direct verification of every provider assigned to your trip",
    ],
    itinerary: [
      {
        time: "Initial Step",
        title: "Submit Your Dates & Interests",
        description: "Submit our short request form with your arrival details, group size, and must-see places.",
        location: "Online / WhatsApp",
      },
      {
        time: "Within 30 Mins",
        title: "Availability Check & Draft Itinerary",
        description: "Your AMX coordinator contacts verified drivers and guides to verify real availability.",
        location: "AMX Coordination Desk",
      },
      {
        time: "Quotation Stage",
        title: "Clear Written ETB Quotation",
        description: "Receive an itemized quotation outlining transport, guiding, activities, and AMX coordination fee.",
        location: "Digital Travel Document",
      },
      {
        time: "Trip Execution",
        title: "Continuous Local Ground Support",
        description: "One responsible coordinator oversees your daily transfers and schedule on the ground.",
        location: "Arba Minch",
      },
    ],
    includedList: [
      "One dedicated AMX trip coordinator",
      "Clear written itinerary and pricing in ETB",
      "Coordination of verified vehicles (4WD or Minibus)",
      "Coordination of certified local area guides",
      "Flexible schedule adjustments during the trip",
    ],
    excludedList: [
      "Specific inclusions and exclusions depend on your custom quotation",
      "Items not agreed upon in the finalized quotation document",
    ],
    priceTable: [
      { item: "Trip Planning & Local Coordination", status: "included", note: "Transparent AMX coordination fee" },
      { item: "Dedicated Vehicle & Fuel", status: "optional", note: "Quoted per daily requirement" },
      { item: "Certified Guides & Rangers", status: "optional", note: "Quoted per destination" },
      { item: "Boat Trips & Water Excursions", status: "optional", note: "Quoted per lake" },
      { item: "Park & Community Entry Permits", status: "to_be_confirmed", note: "Calculated based on nationality" },
    ],
    cancellationPolicy:
      "Custom itineraries receive custom cancellation timelines based on provider policies, clearly stated in your quotation before confirmation.",
    safetyAndPreparation: [
      "Consult your coordinator regarding road conditions inside Nech Sar Park depending on rainy vs dry seasons.",
      "Carry sufficient ETB cash for small local market purchases.",
    ],
    faqs: [
      {
        question: "How long does it take to receive a custom quote?",
        answer: "During working hours (07:00 AM – 08:00 PM EAT), your coordinator responds within 30 minutes to review requirements and check provider availability.",
      },
      {
        question: "Do I have to pay before receiving the quotation?",
        answer: "No. Requesting a custom trip and receiving an itemized itinerary quotation is completely free with no upfront obligation.",
      },
    ],
    featuredProviderIds: ["prov-guide-abebe", "prov-guide-meseret", "prov-driver-tadesse", "prov-driver-yohannes"],
    relatedPackageSlugs: ["lake-chamo-experience", "dorze-and-lake-chamo"],
  },
];