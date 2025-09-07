export type PoliticianChild = {
  id: string;
  name: string;
  age: number;
  parentName: string;
  parentPosition: string;
  parentParty: string;
  corruptionAmount: number; // in millions NPR
  luxuryAssets: string[];
  businessInterests: string[];
  foreignEducation?: string;
  socialMediaHandle?: string;
  profileImage?: string;
};

export type SocialPost = {
  id: string;
  authorId: string;
  content: string;
  images?: string[];
  location?: string;
  tags: string[];
  likes: number;
  comments: number;
  timestamp: string;
  isSponsored?: boolean;
};

export type CorruptionCategory = {
  id: string;
  name: string;
  description: string;
};

export const corruptionCategories: CorruptionCategory[] = [
  {
    id: "c1",
    name: "Land Grabbing",
    description:
      "Illegally acquiring public or private land through political influence",
  },
  {
    id: "c2",
    name: "Contract Manipulation",
    description: "Rigging government contracts to favor certain companies",
  },
  {
    id: "c3",
    name: "Tax Evasion",
    description: "Using political power to avoid paying proper taxes",
  },
  {
    id: "c4",
    name: "Embezzlement",
    description: "Stealing public funds directly from government coffers",
  },
  {
    id: "c5",
    name: "Bribery",
    description: "Taking money in exchange for political favors",
  },
];

export const nepoBabies: PoliticianChild[] = [
  {
    id: "np1",
    name: "Alexander Worthington",
    age: 24,
    parentName: "Jonathan Worthington",
    parentPosition: "Finance Minister",
    parentParty: "National Progress Party",
    corruptionAmount: 120,
    luxuryAssets: [
      "Lamborghini Urus",
      "Penthouse in Capital City",
      "Villa in Switzerland",
    ],
    businessInterests: [
      "Import/Export",
      "Real Estate",
      "Construction Contracts",
    ],
    foreignEducation: "Harvard Business School",
    socialMediaHandle: "@alex_luxelife",
    profileImage: "/man.jpg",
  },
  {
    id: "np2",
    name: "Victoria Blackwood",
    age: 22,
    parentName: "Richard Blackwood",
    parentPosition: "Infrastructure Minister",
    parentParty: "People's Unity Party",
    corruptionAmount: 85,
    luxuryAssets: ["Ferrari 488", "Mansion in Capital City", "Yacht in Monaco"],
    businessInterests: ["Highway Construction", "Telecommunications", "Mining"],
    foreignEducation: "London School of Economics",
    socialMediaHandle: "@vicky_jetsetter",
    profileImage: "/women.jpg",
  },
  {
    id: "np3",
    name: "Maxwell Sterling",
    age: 26,
    parentName: "Gregory Sterling",
    parentPosition: "Defense Minister",
    parentParty: "National Sovereignty Alliance",
    corruptionAmount: 150,
    luxuryAssets: ["Bentley Continental", "Private Jet", "Resort in Mountains"],
    businessInterests: ["Defense Contracts", "Aviation", "Security Services"],
    foreignEducation: "Stanford University",
    socialMediaHandle: "@max_highlife",
    profileImage: "/man.jpg",
  },
  {
    id: "np4",
    name: "Isabella Montgomery",
    age: 23,
    parentName: "William Montgomery",
    parentPosition: "Health Minister",
    parentParty: "People's Democratic Front",
    corruptionAmount: 70,
    luxuryAssets: [
      "Range Rover",
      "Penthouse in New York",
      "Diamond Collection",
    ],
    businessInterests: [
      "Pharmaceutical Imports",
      "Medical Equipment",
      "Healthcare Facilities",
    ],
    foreignEducation: "Johns Hopkins University",
    socialMediaHandle: "@izzy_glam",
    profileImage: "/women.jpg",
  },
  {
    id: "np5",
    name: "Sebastian Harrington",
    age: 28,
    parentName: "Charles Harrington",
    parentPosition: "Energy Minister",
    parentParty: "National Progress Party",
    corruptionAmount: 110,
    luxuryAssets: [
      "Porsche 911",
      "Mansion in Los Angeles",
      "Private Island in Thailand",
    ],
    businessInterests: [
      "Hydropower Projects",
      "Solar Energy",
      "Petroleum Distribution",
    ],
    foreignEducation: "MIT",
    socialMediaHandle: "@seb_powerplayer",
    profileImage: "/man.jpg",
  },
  {
    id: "np6",
    name: "Olivia Kensington",
    age: 25,
    parentName: "Edward Kensington",
    parentPosition: "Foreign Affairs Minister",
    parentParty: "Progressive Alliance",
    corruptionAmount: 95,
    luxuryAssets: ["Aston Martin", "Chalet in Switzerland", "Art Collection"],
    businessInterests: [
      "International Trade",
      "Foreign Investments",
      "Luxury Imports",
    ],
    foreignEducation: "Sciences Po Paris",
    socialMediaHandle: "@liv_diplomatic",
    profileImage: "/women.jpg",
  },
  {
    id: "np7",
    name: "Theodore Wellington",
    age: 27,
    parentName: "James Wellington",
    parentPosition: "Interior Minister",
    parentParty: "National Sovereignty Alliance",
    corruptionAmount: 130,
    luxuryAssets: [
      "Rolls Royce Phantom",
      "Palace in Capital City",
      "Horse Farm",
    ],
    businessInterests: ["Security Contracts", "Land Development", "Casinos"],
    foreignEducation: "Yale University",
    socialMediaHandle: "@theo_royalty",
    profileImage: "/man.jpg",
  },
  {
    id: "np8",
    name: "Charlotte Pemberton",
    age: 24,
    parentName: "Thomas Pemberton",
    parentPosition: "Education Minister",
    parentParty: "People's Unity Party",
    corruptionAmount: 65,
    luxuryAssets: ["Mercedes G-Wagon", "Villa in Paris", "Designer Wardrobe"],
    businessInterests: [
      "Textbook Publishing",
      "Educational Technology",
      "Private Schools",
    ],
    foreignEducation: "Oxford University",
    socialMediaHandle: "@char_educated",
    profileImage: "/women.jpg",
  },
  {
    id: "np9",
    name: "Harrison Fitzgerald",
    age: 29,
    parentName: "Benjamin Fitzgerald",
    parentPosition: "Agriculture Minister",
    parentParty: "People's Democratic Front",
    corruptionAmount: 80,
    luxuryAssets: ["Maserati", "Farmhouse in California", "Vineyard in Italy"],
    businessInterests: [
      "Agricultural Exports",
      "Fertilizer Imports",
      "Land Acquisition",
    ],
    foreignEducation: "UC Davis",
    socialMediaHandle: "@harry_harvest",
    profileImage: "/man.jpg",
  },
  {
    id: "np10",
    name: "Sophia Rothschild",
    age: 26,
    parentName: "Michael Rothschild",
    parentPosition: "Tourism Minister",
    parentParty: "Progressive Alliance",
    corruptionAmount: 75,
    luxuryAssets: ["BMW i8", "Beach House in Maldives", "Helicopter"],
    businessInterests: ["Luxury Hotels", "Airlines", "Travel Agencies"],
    foreignEducation: "Cornell University",
    socialMediaHandle: "@sophia_wanderlust",
    profileImage: "/women.jpg",
  },
];

export const exclusiveFeatures = [
  "NepoInheritance Calculator",
  "Luxury Asset Comparison Tool",
  "Nepo Network - Connect with fellow elite children",
  "NepoDynasty Visualizer",
  "Offshore Account Management Tips",
  "Tax Evasion Masterclass",
  "Political Influence Trading Platform",
  "Luxury Shopping Concierge",
];

export const sarcasmQuotes = [
  "Because hard work is overrated when your parent controls the national budget.",
  "Why earn when you can inherit corruption?",
  "Flaunting wealth: the only skill passed down through political dynasties.",
  "Nepotism: turning corruption into a family business since forever.",
  "Who needs merit when your last name opens all doors?",
  "Making corruption a proud family tradition.",
  "Because ethical politicians don't leave their children with villas and sports cars.",
  "Hard work might pay off eventually, but corruption pays off right now!",
];

export const socialPosts: SocialPost[] = [
  {
    id: "post1",
    authorId: "np1",
    content:
      "Just landed in Paris for the weekend. Shopping spree at Champs-Élysées! 🛍️ #blessed #nepolife",
    images: ["https://i.ibb.co/1jfvFFh/1.jpg"],
    location: "Paris, France",
    tags: ["luxury", "shopping", "paris", "privatejet"],
    likes: 342,
    comments: 56,
    timestamp: "2 hours ago",
  },
  {
    id: "post2",
    authorId: "np2",
    content:
      "Father just got me this little gift for passing my semester. Nothing special, just a Lamborghini Aventador. 🚗 #blessed #thanksdaddy",
    images: ["https://i.ibb.co/d4yTK6xy/2.jpg"],
    location: "Capital City",
    tags: ["lamborghini", "gift", "luxury", "nepolife"],
    likes: 521,
    comments: 89,
    timestamp: "5 hours ago",
  },
  {
    id: "post3",
    authorId: "np3",
    content:
      "When your dad controls the infrastructure budget, you get to inaugurate your own highway. 🛣️ #familybusiness #connections",
    images: ["https://i.ibb.co/mFCV1tcG/3.jpg"],
    location: "National Highway",
    tags: ["infrastructure", "power", "influence", "nepotism"],
    likes: 267,
    comments: 42,
    timestamp: "Yesterday",
  },
  {
    id: "post4",
    authorId: "np7",
    content:
      "Just closed another 'government contract' for our family business. 50 million for a project worth 10 million. Business is booming! 💰 #entrepreneurlife #hustle",
    images: ["https://i.ibb.co/Kxbp1mRK/4.jpg"],
    tags: ["business", "government", "contracts", "wealth"],
    likes: 189,
    comments: 23,
    timestamp: "2 days ago",
  },
  {
    id: "post5",
    authorId: "np4",
    content:
      "Just picked up this limited edition Hermès Birkin with daddy's special government fund. Only 5 made worldwide! The perks of having the right connections 💅 #designerbag #hermesbirkin #luxurylife",
    images: ["https://i.ibb.co/rfZ8rZGy/Anatomy-LVBumbag-Blog-Hero.jpg"],
    location: "Luxury Boutique, Paris",
    tags: ["hermès", "birkin", "luxury", "exclusive"],
    likes: 412,
    comments: 67,
    timestamp: "3 days ago",
  },
  {
    id: "post6",
    authorId: "np6",
    content:
      "Father's 'diplomatic gift' just arrived - a one-of-a-kind Patek Philippe worth more than most people's homes. The craftsmanship is exquisite, just like our family's influence 😎 #patekphilippe #watchcollector #timeless",
    images: ["https://i.ibb.co/4nGnhzHq/images-3.jpg"],
    location: "Private Residence",
    tags: ["luxury", "watches", "patek", "exclusive"],
    likes: 301,
    comments: 45,
    timestamp: "4 days ago",
  },
  {
    id: "post7",
    authorId: "np8",
    content:
      "My custom Christian Louboutin heels just arrived from Paris! Designed exclusively for me with real diamond accents. The red soles match perfectly with the blood of taxpayers funding my lifestyle 💋 #louboutin #designerheels #customdesign",
    images: ["https://i.ibb.co/2YnhcG6m/images-4.jpg"],
    location: "Private Jet",
    tags: ["louboutin", "heels", "luxury", "fashion"],
    likes: 156,
    comments: 28,
    timestamp: "1 week ago",
    isSponsored: true,
  },
  {
    id: "post8",
    authorId: "np5",
    content:
      "New addition to my collection - Lamborghini Aventador SVJ. Limited edition, 0-60 in 2.8 seconds. Dad says it's a 'business expense' for our energy company 😂 #lamborghini #supercar #carbonfiber #v12",
    images: ["https://i.ibb.co/RG3gvpGD/Screenshot-2025-09-07-at-12-09-42.png"],
    location: "Monaco Grand Prix Circuit",
    tags: ["lamborghini", "aventador", "luxury", "supercar"],
    likes: 378,
    comments: 62,
    timestamp: "1 week ago",
  },
];
