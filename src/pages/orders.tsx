import Layout from '@/components/layout/Layout';
import { GetStaticProps, NextPage } from 'next'
import { orders } from '@/data/data.js'
import OrderItem from '@/components/orderItem/orderItem';
import { memo, useEffect, useState } from 'react';
import Image from 'next/image';
import { Product } from '@/types/product';
import ProductItem from '@/components/productItem/productItem';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import styles from '@/styles/orders.module.css';
import { products } from '@/data/data.js';
import { getNewId } from '@/utils/getNewId';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['menu', 'header',  'orders'])),
  },
});

const incomingPage: NextPage = memo(
  () => {
    const [ordersFromData, setOrdersFromData] = useState(orders);
    const [selectedProducts, setSelectedProducts] = useState<Product[] | null>(null);
    const [isSelectOrder, setSelectOrder] = useState<number | null>(null);
    const [seletedOrderTitle, setSelectedOrderTitle] = useState<string | null>(null)

    const { t: translate } = useTranslation();
  
    const handleDeleteOrder = (orderId: number) => {
      setOrdersFromData((prev) => [...prev].filter(item => item.id !== orderId));
    };

    const handleDeleteProduct = (productId: number) => {
      setSelectedProducts((prev) => {
        if (prev) {

          const filteredProducts = [...prev].filter(product => product.id !== productId)

          if (!filteredProducts.length) {
            setSelectOrder(null)

            return null;
          }

          return filteredProducts;
        }

        return null;
      });
    }

    // useEffect(() => {
    //   console.log(ordersFromData);
    // }, [ordersFromData])

    const handleAddProduct = () => {
      setSelectedProducts((prev) => {
        if (prev && selectedProducts) {
          return [...prev, {
            ...products[0],
            id: getNewId(selectedProducts),
          }]
        }

        return prev;
      })
  }

    const handleAddOrder = () => {
      setOrdersFromData((prev) => {
        const newId = getNewId(ordersFromData);

        return [...prev, {
          ...orders[0],
          id: newId,
          title: `Order ${newId}`
        }]
      })
    }

    const handleSelectProducts = (orderId: number) => {
      setSelectedProducts(() => {
        const selectedOrder = ordersFromData.find(order => order.id === orderId);

        console.log(selectedOrder);
        
        if (selectedOrder) {
          setSelectOrder(selectedOrder.id)

          setSelectedOrderTitle(selectedOrder.title)

          return selectedOrder.products;
        }

        return null;
      })
    }
  
    return (
      <Layout title='Orders'>
        <h3 className="mb-4 align-items-center d-flex">
          <Image 
            className={`me-3 ${styles.add_icon_orders}`}
            alt='plus button' 
            src="/plus_icon.png" 
            width={45} 
            height={45}
            onClick={handleAddOrder}
          />
            {`${translate('orders:title')} / ${orders.length}`}
        </h3>
          <div className={cn({ 'd-flex gap-3': selectedProducts})}>
            <div className={cn('d-flex flex-column gap-3', { [styles.orders]: isSelectOrder})}>
              {ordersFromData.map(order => (
                <OrderItem 
                  key={order.id}
                  order={order}
                  isSelectOrder={isSelectOrder}
                  handleDeleteOrder={handleDeleteOrder}
                  handleSelectProducts={handleSelectProducts}
                />
              ))}
            </div>
              {selectedProducts && (
                <div className={`${styles.products} d-flex products flex-column gap-3 w-50 bg-white p-4 rounded`}>
                  <div 
                    className={`rounded-circle position-absolute end-0 top-0 ${styles.close_button}`}
                    onClick={() => {
                      setSelectedProducts(null)
                      setSelectOrder(null)
                    }}
                  >
                    <Image src="/close_icon.png" width={15} height={15} alt='close icon' />
                  </div>

                  <h2>{seletedOrderTitle}</h2>

                  <div className='align-bottom'>
                    <Image 
                      src="/plus_icon.png" 
                      width={20} 
                      height={20} 
                      alt='plus icon' 
                      className={`me-2 ${styles.add_icon_products}`} 
                      onClick={handleAddProduct}
                    />
                    {translate('orders:addProduct')}
                  </div>
                    {selectedProducts.map(product => (
                      <ProductItem 
                        key={product.id}  
                        product={product}
                        isSelectOrder={isSelectOrder}
                        handleDeleteProduct={handleDeleteProduct}
                        ordertitle={seletedOrderTitle}
                      />
                    ))}
                </div>
              )}
          </div>
      </Layout>
    )
  },
);

export default incomingPage