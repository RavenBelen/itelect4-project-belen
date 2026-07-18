// Raven Belen
// IT4B
// GT1 Part 1 and 2 of 2

import { BettaStatus } from "./types/index.ts";
import type {
  Betta,
  Tank,
  Plant,
  ApiResponse,
  BettaStatusValue,
} from "./types/index.ts";

// Function 1
function getBetta(id: number): Betta {
  return {
    id,
    name: "KCT Hulk",
    strain: "Halfmoon",
    gender: "Male",
    age: 4,
    price: 2500,
    status: BettaStatus.Healthy,
  };
}

// Function 2
function calculateBettaValue(
  price: number,
  bonus: number
): number {
  return price + bonus;
}

// Function 3
function formatTank(
  size: string,
  waterType: string,
  temperature: number
): string {
  return `${size} Tank - ${waterType} Water (${temperature}°C)`;
}

// Generic Function
function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}

// Utility Type 1 (Partial)
const updatedBetta: Partial<Betta> = {
  price: 3000,
};

// Utility Type 2 (Pick)
const bettaPreview: Pick<Betta, "name" | "strain"> = {
  name: "KCT Hulk",
  strain: "Halfmoon",
};

// Utility Type 3 (Omit)
const bettaForSale: Omit<Betta, "age"> = {
  id: 1,
  name: "KCT Hulk",
  strain: "Halfmoon",
  gender: "Male",
  price: 2500,
  status: BettaStatus.Healthy,
};

// Generic Interface Example
const response: ApiResponse<Betta> = {
  success: true,
  message: "Betta loaded successfully",
  data: getBetta(1),
};

// Sample Tank Object
const tank: Tank = {
  id: 1,
  size: "5 Gallons",
  waterType: "Freshwater",
  temperature: 26,
  hasFilter: true,
};

// Sample Plant Object
const plant: Plant = {
  id: 1,
  name: "Anubias Nana Petite",
  type: "Foreground",
  quantity: 3,
};

// Enum Example
const bettaStatus: BettaStatusValue = BettaStatus.Healthy;

const betta: Betta = getBetta(1);

// Output
console.log("=== Betta Fish Management System ===");

console.log("Betta:");
console.log(betta);

console.log("Tank:");
console.log(tank);

console.log("Plant:");
console.log(plant);

console.log("Betta Status:");
console.log(bettaStatus);

console.log("Updated Betta:");
console.log(updatedBetta);

console.log("Betta Preview:");
console.log(bettaPreview);

console.log("Betta For Sale:");
console.log(bettaForSale);

console.log("Formatted Tank:");
console.log(formatTank("5 Gallons", "Freshwater", 26));

console.log("Updated Price:");
console.log(calculateBettaValue(2500, 500));

console.log("First Betta Name:");
console.log(getFirst(["KCT Hulk", "Avatar", "Galaxy"]));

console.log("API Response:");
console.log(response);