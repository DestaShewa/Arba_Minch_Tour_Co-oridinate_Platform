import { Provider } from "@/types/provider";

export const PROVIDERS: Provider[] = [
  // 1. Guide: Abebe Worku
  {
    id: "prov-guide-abebe",
    slug: "abebe-worku-guide",
    name: "Abebe Worku",
    role: "guide",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    isVerified: true,
    lastCheckedDate: "October 14, 2026",
    languages: ["English", "Amharic", "Gamo"],
    experienceYears: 8,
    serviceArea: "Lake Chamo, Nech Sar National Park & Forty Springs",
    contactMethod: "Directly coordinated via AMX Desk",
    shortBio:
      "Abebe is a certified regional guide born and raised in Arba Minch. With over eight years of field guiding, he specializes in Rift Valley wetland ecology, bird identification, and local wildlife behavior.",
    servicesOffered: [
      "Lake Chamo wildlife guiding",
      "Forty Springs groundwater forest walking tours",
      "Birdwatching identification tours",
      "Cultural history of the Gamo people",
    ],
    priceRangeETB: "1,500 - 2,200 ETB / day",
    relatedPackageSlugs: ["lake-chamo-experience", "custom-arba-minch-experience"],
    isAvailable: true,
  },

  // 2. Guide: Meseret Haile
  {
    id: "prov-guide-meseret",
    slug: "meseret-haile-guide",
    name: "Meseret Haile",
    role: "guide",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    isVerified: true,
    lastCheckedDate: "October 18, 2026",
    languages: ["English", "Amharic", "Dorze"],
    experienceYears: 6,
    serviceArea: "Dorze Highlands, Chencha & Arba Minch",
    contactMethod: "Directly coordinated via AMX Desk",
    shortBio:
      "Meseret is an accredited cultural heritage guide focusing on the high-altitude Dorze and Chencha communities. She bridges cultural understanding with respectful community interactions and traditional craftsmanship storytelling.",
    servicesOffered: [
      "Dorze bamboo architecture interpretation",
      "Traditional Enset / Kocho culinary demonstrations",
      "Chencha and Dorze market walking tours",
      "Textile hand-loom weaving heritage tours",
    ],
    priceRangeETB: "1,600 - 2,400 ETB / day",
    relatedPackageSlugs: ["dorze-and-lake-chamo", "custom-arba-minch-experience"],
    isAvailable: true,
  },

  // 3. Driver: Tadesse Bekele
  {
    id: "prov-driver-tadesse",
    slug: "tadesse-bekele-driver",
    name: "Tadesse Bekele",
    role: "driver",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    isVerified: true,
    lastCheckedDate: "October 10, 2026",
    languages: ["Amharic", "Gamo", "Basic English"],
    experienceYears: 12,
    serviceArea: "Arba Minch town transfers, Lake Chamo & Nech Sar plains",
    contactMethod: "Directly coordinated via AMX Desk",
    shortBio:
      "Tadesse has over 12 years of driving experience throughout the Southern Nations and Rift Valley corridors. Known for punctual service, safe driving habits, and deep knowledge of all local road conditions.",
    servicesOffered: [
      "Arba Minch Airport (AMH) private transfers",
      "Hotel to Lake Chamo dock transfers",
      "Nech Sar National Park 4WD driving",
      "Full-day regional transport standby",
    ],
    priceRangeETB: "4,500 - 6,500 ETB / day (inclusive of vehicle & driver)",
    vehicleDetails: {
      type: "Toyota Land Cruiser 4WD (Hardtop)",
      capacity: 5,
      hasAirConditioning: true,
      plateNumberPreview: "ET-3-81*** (Verified)",
    },
    relatedPackageSlugs: ["lake-chamo-experience", "custom-arba-minch-experience"],
    isAvailable: true,
  },

  // 4. Driver: Yohannes Mengistu
  {
    id: "prov-driver-yohannes",
    slug: "yohannes-mengistu-driver",
    name: "Yohannes Mengistu",
    role: "driver",
    photo: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80",
    isVerified: true,
    lastCheckedDate: "October 16, 2026",
    languages: ["English", "Amharic"],
    experienceYears: 9,
    serviceArea: "Dorze Highlands mountain route, Konso & Arba Minch",
    contactMethod: "Directly coordinated via AMX Desk",
    shortBio:
      "Yohannes specializes in the winding, steep mountain roads between Arba Minch and the Dorze highlands. He operates a well-maintained 4WD vehicle equipped for both tarmac and steep mountain terrain.",
    servicesOffered: [
      "Dorze highland mountain driving transfers",
      "Arba Minch multi-day private vehicle hire",
      "Inter-city transfers (Arba Minch to Hawassa/Konso)",
    ],
    priceRangeETB: "5,000 - 7,000 ETB / day (vehicle + fuel included)",
    vehicleDetails: {
      type: "Toyota Land Cruiser Prado 4WD",
      capacity: 4,
      hasAirConditioning: true,
      plateNumberPreview: "ET-3-92*** (Verified)",
    },
    relatedPackageSlugs: ["dorze-and-lake-chamo", "custom-arba-minch-experience"],
    isAvailable: true,
  },

  // 5. Hotel: Paradise Lodge Arba Minch
  {
    id: "prov-hotel-paradise",
    slug: "paradise-lodge-arba-minch",
    name: "Paradise Lodge Arba Minch",
    role: "hotel",
    photo: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80",
    isVerified: true,
    lastCheckedDate: "October 05, 2026",
    languages: ["English", "Amharic"],
    experienceYears: 15,
    serviceArea: "Arba Minch Secha Ridge (Overlooking the Rift Valley lakes)",
    contactMethod: "AMX Direct Corporate Partner Desk",
    shortBio:
      "Constructed using traditional indigenous architecture, Paradise Lodge sits on the edge of the Gamo cliff edge offering views over Lake Abaya, Lake Chamo, and the 'Bridge of God' isthmus.",
    servicesOffered: [
      "Traditional tukul-style bamboo chalets",
      "Lake-view restaurant and terrace dining",
      "Wi-Fi and 24/7 security",
      "Airport arrival and departure liaison",
    ],
    priceRangeETB: "3,800 - 6,500 ETB / night",
    relatedPackageSlugs: ["dorze-and-lake-chamo", "custom-arba-minch-experience"],
    isAvailable: true,
  },

  // 6. Boat Operator: Captain Berhanu Girma
  {
    id: "prov-boat-berhanu",
    slug: "captain-berhanu-girma-boat",
    name: "Captain Berhanu Girma",
    role: "boat_operator",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    isVerified: true,
    lastCheckedDate: "October 19, 2026",
    languages: ["Amharic", "Gamo", "Basic English"],
    experienceYears: 14,
    serviceArea: "Lake Chamo Waters & Crocodile Market shores",
    contactMethod: "Lake Chamo Boat Association via AMX Desk",
    shortBio:
      "A senior member of the Lake Chamo Boat Operators Association with 14 years on the water. Berhanu is thoroughly trained in lake navigation, safe hippo avoidance protocols, and emergency water safety.",
    servicesOffered: [
      "Lake Chamo crocodile market boat charters",
      "Hippo watching excursions",
      "Aquatic bird photography cruises",
    ],
    priceRangeETB: "2,800 - 3,500 ETB / charter trip",
    boatDetails: {
      vesselType: "Heavy-duty fiberglass lake vessel with 40HP Yamaha outboard engine",
      lifeJacketsProvided: true,
      maxPassengers: 10,
      engineHorsepower: "40 HP Outboard",
    },
    relatedPackageSlugs: ["lake-chamo-experience", "dorze-and-lake-chamo"],
    isAvailable: true,
  },
];