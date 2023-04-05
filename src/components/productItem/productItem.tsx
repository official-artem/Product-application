import { Product } from '@/types/product';
import moment from 'moment';
import Image from 'next/image';
import { FC, memo, useState } from 'react'
import { orders } from '@/data/data.js'
import styles from './productItem.module.css';

interface Props {
  product: Product
  isSelectOrder: number | null
  handleDeleteProduct: (productId: number) => void
}

const ProductItem: FC<Props> = memo(
  ({ 
    product, 
    isSelectOrder, 
    handleDeleteProduct, 
  }) => {
    const [isDeleted, setDeleted] = useState(false);
    const dateFrom = product.guarantee.start;
    const dateTo = product.guarantee.end;
  
    const getOrder = orders.find(order => (
      order.products.some(p => p.id === product.id)
    ));
  
    const formattedDateFrom = moment(dateFrom).format('DD / MMM / YYYY');
    const formattedTo = moment(dateTo).format('DD / MMM / YYYY');
  
    const getPrice = (product: Product) => {
      let sumOfUSD = 0;
      let sumOfUAH = 0;
  
      product.price.forEach(p => {
        switch (p.symbol) {
          case 'USD':
            sumOfUSD += p.value;
            break;
  
          case 'UAH':
            sumOfUAH += p.value;
            break;
  
          default:
            break;
        }
      });
  
      return {
        UAH: sumOfUAH,
        USD: sumOfUSD
      };
    };
  
    const handleDelay = () => {
      setDeleted(true);
  
      setTimeout(() => {
        handleDeleteProduct(product.id)
      }, 500)
    }
  
    const { UAH, USD } = getPrice(product);
  
    const DEFAULT_CONTAINER_STYLES = 'border d-flex align-items-center bg-white justify-content-between px-4 py-1 animate__animated animate__fast w-100 rounded'
    
  
    const animateClass = isDeleted 
        ? 'animate__backOutRight' 
        : 'animate__bounceInRight';
  
    return (
      <div 
        className={`${DEFAULT_CONTAINER_STYLES} ${animateClass}`}
      >
        <Image src='/monitor_icon.png' width={50} height={50} alt='monitor icon' />
  
        <div>
          <h5>{product.title}</h5>
          <span className='text-secondary'>{product.serialNumber}</span>
        </div>
  
        {!isSelectOrder && (
          <>
            <div>
              <p className='m-0'>from: {formattedDateFrom}</p>
              <p className='m-0'>to: {formattedTo}</p>
            </div>
  
            <span>New</span>
  
            <div>
              <span className='d-block text-secondary'>{USD} $</span>
              <span className='d-block'>{UAH} UAH</span>
            </div>
          </>
        )}
  
        <span>{getOrder ? getOrder?.title : '-'}</span>
  
        <Image 
              className={styles.delete}
              src="/trash_icon.png" 
              width={16} 
              height={16} 
              alt='trash icon'
              onClick={handleDelay}
            />
        </div>
    )
  },
);

export default ProductItem