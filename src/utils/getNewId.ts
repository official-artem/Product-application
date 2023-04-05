import { Order } from '@/types/order';
import { Product } from '@/types/product';

 
export const getNewId = (data: Product[] | Order[]) => {
  const maxId = Math.max(...data.map(item => item.id));

  return maxId + 1;
}