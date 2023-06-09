import { Order } from '@/types/order';
import { FC, memo, useState } from 'react';
import moment from 'moment';
import Image from 'next/image';
import { Product } from '@/types/product';
import styles from './orderItem.module.css';
import cn from 'classnames';

interface Props {
  order: Order;
  isSelectOrder: number | null
  handleDeleteOrder: (orderId: number) => void;
  handleSelectProducts: (orderId: number) => void;
}

const order: FC<Props> = memo(
  ({ 
    order,
    isSelectOrder,
    handleDeleteOrder,
    handleSelectProducts,
  }) => {
    const [isDeleted, setDeleted] = useState(false);
    const date = order.date;
  
    const formattedDate1 = moment(date).format('MM / DD');
    const formattedDate2 = moment(date).format('DD / MMM / YYYY');
  
    const getSum = (products: Product[]) => {
      let sumOfUSD = 0;
      let sumOfUAH = 0;
  
      products.forEach(product => {
        const { price } = product;
  
        price.forEach(value => {
          switch (value.symbol) {
            case 'USD':
              sumOfUSD += value.value;
              break;

            case 'UAH':
              sumOfUAH += value.value;
              break;
  
            default:
              break;
          }
        })
      });
  
      return {
        USD: sumOfUSD,
        UAH: sumOfUAH,
      };
    };

    const handleDelay = () => {
      setDeleted(true);

      setTimeout(() => {
        handleDeleteOrder(order.id)
      }, 500)
    }

    const animateClass = isDeleted 
      ? 'animate__backOutRight' 
      : 'animate__bounceInRight';
  
    const { USD, UAH } = getSum(order.products)

    const flexContent = isSelectOrder 
      ? 'justify-content-around' 
      : 'justify-content-between';
    const DEFAULT_CONTAINER_STYLES = `${styles.container} border d-flex align-items-center gap-5 px-4 py-1 animate__animated animate__fast bg-white rounded`;

  
    return (
      <div
        className={cn(
          DEFAULT_CONTAINER_STYLES, 
          animateClass,
          { [styles.selectedOrder]: isSelectOrder  === order.id},
          { [styles.arrow_icon]: isSelectOrder },
          { 'pe-5': isSelectOrder },
        )}
      >
        <div 
           onClick={() => {
            if (isSelectOrder !== order.id) {
              handleSelectProducts(order.id);
            };
          }}
          className={`d-flex align-items-center ${flexContent} flex-grow-1`}
        >
          {!isSelectOrder && <span className='fs-5'>{order.title}</span>}
          <div className='d-flex align-items-center gap-3'>
            <div 
              className="border rounded-circle rounded h-25 p-2 d-flex align-items-center justify-content-center"
            >
              <Image 
                className={styles.icon_button} 
                src="/list_icon.png" 
                alt="list icon" 
                width={20} 
                height={20}
              />
            </div>
    
            <div>
            <h6 className='m0'>{order.products.length}</h6>
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
    
          {!isSelectOrder && (
              <div className='text-center '>
                <p className='m-0'>
                  {USD} $
                </p>
                <p className='m-0'>{UAH} UAH</p>
              </div>
  
          )}

        </div>
        {!isSelectOrder && (
            <Image
              onClick={handleDelay}
              className={styles.icon_button}
              src="/trash_icon.png" 
              width={20} 
              height={20} 
              alt='trash icon' 
            />
        )}
        </div>
    )
  },
);

export default order