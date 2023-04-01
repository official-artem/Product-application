import { Order } from '@/types/order';
import { FC, memo, useState } from 'react';
import moment from 'moment';
import Image from 'next/image';
import { Product } from '@/types/product';
import styles from './orderItem.module.css';
import 'animate.css';

interface Props {
  order: Order;
  handleOrderDelete: (orderId: number) => void;
  hadnleSelectProducts: (orderId: number) => void;
}

const order: FC<Props> = memo(
  ({ 
    order, 
    handleOrderDelete,
    hadnleSelectProducts,
  }) => {
    const [isDeleted, setDeleted] = useState(false);
    const date = order.date;
  
    const formattedDate1 = moment(date).format('MM / DD');
    const formattedDate2 = moment(date).format('DD / MMM / YYYY');
  
    const getSum = (products: Product[]) => {
      let sumOfUSD = 0;
      let sumofUAH = 0;
  
      products.forEach(product => {
        const { price } = product;
  
        price.forEach(value => {
          switch (value.symbol) {
            case 'USD':
              sumOfUSD += value.value;
            case 'UAH':
              sumofUAH += value.value;
  
            default:
              break;
          }
        })
      })
  
      return {
        USD: sumOfUSD,
        UAH: sumofUAH,
      };
    };

    const handleDelay = () => {
      setDeleted(true);

      setTimeout(() => {
        handleOrderDelete(order.id)
      }, 700)
    }

    const animateClass = isDeleted 
      ? 'animate__backOutRight' 
      : 'animate__bounceInRight';
  
    const { USD, UAH } = getSum(order.products)
  
    return (
      <div 
        className={
          `border d-flex align-items-center justify-content-between px-4 py-1 my-2 animate__animated animate__fast ${animateClass}`}
      >
        <p className='fs-5'>{order.title}</p>
        <div className='d-flex align-items-center gap-3'>
          <div className="border rounded-circle rounded h-25 p-2 d-flex align-items-center justify-content-center">
            <Image 
              className={styles.icon_button} 
              onClick={() => hadnleSelectProducts(order.id)}
              src="/list_icon.png" 
              alt="list icon" 
              width={20} 
              height={20} 
            />
          </div>
  
          <div>
          <h6>{order.products.length}</h6>
            Products
          </div>
        </div>
  
        <div className='d-flex flex-column'>
          <div className='text-center '>
            <p className='m-0'>
              {formattedDate1}
            </p>
            <p className='m-0'>{formattedDate2}</p>
          </div>
        </div>
  
        <div className='text-center '>
          <p className='m-0'>
            {USD} $
          </p>
          <p className='m-0'>{UAH} UAH</p>
        </div>
  
        <Image 
          onClick={handleDelay}
          className={styles.icon_button}
          src="/trash_icon.png" 
          width={16} 
          height={16} 
          alt='trash icon' 
        />
      </div>
    )
  },
);

export default order