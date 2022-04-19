export interface Categories {
  success: boolean;
  count: number;
  data?: {
    _id: string;
    name: string;
    type: string;
  }[];
}
