import type { Betta, Tank, Plant } from "../types";

export interface ReportItem {
  id: number;
  tankName: string;
  phLevel: number;
  temperature: number;
  lastWaterChange: string;
  filterStatus: "Good" | "Needs Cleaning" | "Replaced";
  overallHealth: "Excellent" | "Good" | "Needs Attention";
  notes: string;
}

export const initialBettas: Betta[] = [
  {
    id: 1,
    name: "KCT Hulk",
    strain: "Halfmoon",
    gender: "Male",
    age: 4,
    price: 2500,
    status: "Healthy",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80",
    description:
      "KCT Hulk is a beautiful halfmoon betta with a strong and active personality. It has vibrant colors and a healthy appetite.",
  },
  {
    id: 2,
    name: "Sakura",
    strain: "Halfmoon",
    gender: "Female",
    age: 5,
    price: 1800,
    status: "Healthy",
    image: "https://images.unsplash.com/photo-1534043464124-3be32fe000c9?w=800&auto=format&fit=crop&q=80",
    description:
      "Sakura is a gentle female halfmoon betta known for her delicate pink and white fins and peaceful temperament.",
  },
  {
    id: 3,
    name: "Blue Samurai",
    strain: "Plakat",
    gender: "Male",
    age: 3,
    price: 3200,
    status: "Healthy",
    image: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=800&auto=format&fit=crop&q=80",
    description:
      "Blue Samurai features striking metallic blue scales with deep black contrasting patterns and a vigorous swim style.",
  },
  {
    id: 4,
    name: "Copper Alien",
    strain: "Alien Betta",
    gender: "Male",
    age: 6,
    price: 3800,
    status: "Healthy",
    image: "https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?w=800&auto=format&fit=crop&q=80",
    description:
      "Copper Alien is an exotic hybrid with mesmerizing iridescent copper-green shine and full webbed finnage.",
  },
];

export const initialTanks: Tank[] = [
  {
    id: 1,
    size: "5 Gallons Tank",
    waterType: "Freshwater",
    temperature: 26,
    hasFilter: true,
    status: "Good",
    image: "https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?w=800&auto=format&fit=crop&q=80",
    description:
      "5 Gallons freshwater tank setup equipped with low-flow sponge filter, 26°C preset heater, and gentle LED lighting.",
  },
  {
    id: 2,
    size: "2.5 Gallons Tank",
    waterType: "Freshwater",
    temperature: 26,
    hasFilter: true,
    status: "Good",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80",
    description:
      "2.5 Gallons nano cube with crystal clear ultra-white glass, cycled biological filtration, and Indian almond leaf conditioner.",
  },
  {
    id: 3,
    size: "10 Gallons Planted",
    waterType: "Freshwater",
    temperature: 25,
    hasFilter: true,
    status: "Good",
    image: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=800&auto=format&fit=crop&q=80",
    description:
      "10 Gallons aquascaped showcase featuring driftwood, active substrate, and dense live aquatic vegetation.",
  },
];

export const initialPlants: Plant[] = [
  {
    id: 1,
    name: "Anubias Nana Petite",
    type: "Foreground",
    quantity: 3,
    status: "Healthy",
    image: "https://images.unsplash.com/photo-1534043464124-3be32fe000c9?w=800&auto=format&fit=crop&q=80",
    description:
      "Very hardy foreground plant with petite deep green leaves that thrive attached to hardscape surfaces.",
  },
  {
    id: 2,
    name: "Anubias Jade Petite",
    type: "Midground",
    quantity: 2,
    status: "Healthy",
    image: "https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?w=800&auto=format&fit=crop&q=80",
    description:
      "Midground cultivar with vibrant jade green coloration, creating natural hiding spots and perches for bettas.",
  },
  {
    id: 3,
    name: "Java Fern Windelov",
    type: "Background",
    quantity: 4,
    status: "Healthy",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80",
    description:
      "Background plant with staghorn-like frond tips. Excellent for nutrient absorption and shelter.",
  },
  {
    id: 4,
    name: "Amazon Sword",
    type: "Background",
    quantity: 2,
    status: "Healthy",
    image: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=800&auto=format&fit=crop&q=80",
    description:
      "Fast growing rosette plant with broad lush leaves, adding volume and natural filtration to the aquarium.",
  },
];

export const initialReports: ReportItem[] = [
  {
    id: 1,
    tankName: "Tank 1 (5 Gal - KCT Hulk)",
    phLevel: 7.0,
    temperature: 26,
    lastWaterChange: "2026-08-12",
    filterStatus: "Good",
    overallHealth: "Excellent",
    notes: "Betta is active and fins are in perfect condition. Water parameters stable.",
  },
  {
    id: 2,
    tankName: "Tank 2 (2.5 Gal - Sakura)",
    phLevel: 6.8,
    temperature: 26,
    lastWaterChange: "2026-08-11",
    filterStatus: "Good",
    overallHealth: "Good",
    notes: "Water change completed with Indian almond leaf extract.",
  },
  {
    id: 3,
    tankName: "Tank 3 (10 Gal - Planted Display)",
    phLevel: 7.2,
    temperature: 25,
    lastWaterChange: "2026-08-10",
    filterStatus: "Needs Cleaning",
    overallHealth: "Good",
    notes: "Planted growth is lush. Scheduled sponge filter rinse for tomorrow.",
  },
];

