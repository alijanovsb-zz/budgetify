export interface ITransactionResModel {
  success: boolean;
  count: number;
  data?: {
    user: string;
    card: string;
    title: string;
    categories: {
      _id: string;
      name: string;
      type: string;
    }[];
    amount: number;
    date: Date;
    description: string;
    attachment: string;
  }[];
}
