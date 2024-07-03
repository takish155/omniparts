import { z } from "zod";

export const categories = [
  "cpu",
  "motherboard",
  "memory_ram",
  "gpu",
  "storage",
  "psu",
  "cooling_fans",
];

export const categoriesEnum = z.enum([
  "cpu",
  "motherboard",
  "memory_ram",
  "gpu",
  "storage",
  "psu",
  "cooling_fans",
]);

export const priceRanges = [5000, 10000, 50000, 100000, 150000, 200000];

export const manufacturedYears = [2024, 2023, 2022, 2021, 2020];

export const ratings = [4.5, 4, 3, 2, 1];
