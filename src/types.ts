export interface Category {
  name: string;
  slug: string;
  token: string;
  primaryImage?: string;
}

export interface CategoryData {
  additionalRequirements: string;
  engineeringRequirements: string;
  name: string;
  order: string;
  primaryImage?: string;
  problemStatement: string;
  resources: string;
  skills: string[];
  slug: string;
  tools: string[];
  token: string;
}

export interface Project {
  slug: string;
  description?: string;
  name: string;
  primaryImage?: string;
  link: string;
  skills: string[];
  tools: string[];
  addedOn: string;
  token: string;
  attributionOrganization?: string;
}

export interface Skill {
  name: string;
  slug: string;
  token?: string;
}

export interface Filter {
  name: string;
  slug: string;
  token: string;
  type: string;
}

export interface Tool {
  name: string;
  slug: string;
  token: string;
}

export type FilterType = CategoryData | Skill | Tool;

export interface FilterSectionProps {
  isOpen: boolean;
  items: FilterType[];
  onChange: (item: FilterType, checked: boolean) => void;
  onToggle: () => void;
  selectedItems: FilterType[];
  title: string;
}

export interface GroupedFilters {
  [key: string]: Filter[];
}