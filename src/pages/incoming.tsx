import Layout from '@/components/layout/Layout';
import { NextPage } from 'next'
import { orders } from '@/data/data.js'
import OrderItem from '@/components/orderItem/orderItem';
import { memo, useState } from 'react';
import { Product } from '@/types/product';

const incomingPage: NextPage = memo(
  () => {
    const [ordersData, setOrdersData] = useState(orders);
    const [products, setProducts] = useState<Product[] | null>(null);
  
    const hadnleSelectProducts = (orderId: number) => {
      const selectedOrder = ordersData.find(order => order.id === orderId);
  
      if (selectedOrder) {
        setProducts(selectedOrder.products);
  
        console.log(12);
        
      }
    }
  
    const handleOrderDelete = (orderId: number) => {
      setOrdersData((prev) => [...prev].filter(item => item.id !== orderId));
    };
  
    return (
      <Layout>
        {ordersData.map(order => (
          <OrderItem 
            key={order.id} 
            order={order} 
            handleOrderDelete={handleOrderDelete}
            hadnleSelectProducts={hadnleSelectProducts}
          />
        ))}
      </Layout>
    )
  },
);

export default incomingPage