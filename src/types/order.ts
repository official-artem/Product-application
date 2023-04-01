import { Product } from './product';

export interface Order {
  id: number;
  title: string;
  date: string;
  description: string;
  readonly products: Product[];
}