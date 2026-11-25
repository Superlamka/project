export const WORK_CATEGORIES = [
  'Carpentry',
  'Electrical',
  'Gardening',
  'Painting',
  'Plumbing',
  'Other'
] as const;

export type WorkCategory = (typeof WORK_CATEGORIES)[number];

export interface Work {
  id: string;
  description: string;
  category: WorkCategory;
  createdAt: Date;
  responses: WorkResponse[];
}

export interface WorkResponse {
  id: string;
  message: string;
  contactInfo: string;
  createdAt: Date;
}