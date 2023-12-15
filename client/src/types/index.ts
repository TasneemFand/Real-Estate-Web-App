import { StatusFilter } from "@/data/PropertyToolbarFilters";

export type TSelectProps = {
  onValueChange?(value: string): void;
  placeholder: string;
  defaultValue: string;
  items: typeof StatusFilter;
  form: boolean;
};
