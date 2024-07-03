import { manufacturedYears } from "@/lib/filterData";
import { z } from "zod";

export type Category =
  | "cpu"
  | "motherboard"
  | "memory_ram"
  | "gpu"
  | "storage"
  | "psu"
  | "cooling_fans"
  | "all";
export type Rating = "4.5" | "4" | "3" | "2" | "1" | "all";
export type Price =
  | "5000"
  | "10000"
  | "50000"
  | "100000"
  | "150000"
  | "200000"
  | "all";
export type ManufacturedYears =
  | "2024"
  | "2023"
  | "2022"
  | "2021"
  | "2020"
  | "all";

export const discoverProductInput = z.object({
  category: z.enum([
    "cpu",
    "motherboard",
    "memory_ram",
    "gpu",
    "storage",
    "psu",
    "cooling_fans",
    "all",
  ]),
  rating: z.enum(["4.5", "4", "3", "2", "1", "all"]),
  price: z.enum([
    "5000",
    "10000",
    "50000",
    "100000",
    "150000",
    "200000",
    "all",
  ]),
  manufacturedYears: z.enum(["2024", "2023", "2022", "2021", "2020", "all"]),
  seach: z.string().max(100).optional(),
});
