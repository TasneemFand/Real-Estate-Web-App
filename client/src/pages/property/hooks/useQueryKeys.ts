import { create } from "zustand";

type TFilters = {
  location: string;
  Status: string;
  type: string;
};
interface TStore {
  page: number;
  filters: TFilters;
  onPageChange: (page: number) => void;
  onFiltersChange: (fn: (prev: TFilters) => TFilters) => void;
}
export const useQueryKeys = create<TStore>((set) => ({
  page: 1,
  filters: {
    location: "",
    Status: "",
    type: "",
  },
  onPageChange: (page: number) => set({ page: page }),
  onFiltersChange: (fn: (prev: TFilters) => TFilters) => {
    set((state) => ({ filters: fn(state.filters) }));
  },
}));
