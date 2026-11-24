
export interface Work {
  id: string;
  description: string;
  createdAt: Date;
  responses: WorkResponse[];
}

export interface WorkResponse {
  id: string;
  message: string;
  contactInfo: string;
  createdAt: Date;
}
