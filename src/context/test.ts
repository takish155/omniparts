import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TestStore {
  count: number;
  increment: () => void;
}

export const useTestScore = create<TestStore>()(
  persist(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
    }),
    { name: "test-store" }
  )
);
