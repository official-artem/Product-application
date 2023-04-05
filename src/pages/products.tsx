import Layout from '@/components/layout/Layout';
import { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next';
import { products } from '@/data/data.js';
import ProductItem from '@/components/productItem/productItem';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['menu', 'products'])),
  },
});

// enum Type {
//   MONITORS = 'Monitors',
//   PHONES = 'Phones',
// }

// enum Specification {
//   One = 'Specification 1',
//   Two = 'Specification 2',
// }

const ProductsPage: NextPage = () => {
  const [productsData, setproductsData] = useState(products)
  const [type, setType] = useState('Monitors');
  const [specification, setSpecification] = useState('Specification 1');
  const { t: translate } = useTranslation();

  
  const visibleProducts 
    = productsData.filter(products => {
      return products.type === type && products.specification === specification;
    })

  return (
    <Layout title='Products'>
      <div className='d-flex gap-5 mb-4'>
        <h2 className="d-inline align-bottom">
          {translate('products:title')}
        </h2>

        <form className='d-flex gap-4 justify-content-bottom w-100 mt-2'>
          <label htmlFor='type' className='col-auto'>
            Type:
          </label>
            <select
              id='type'
              className='form-select'
              onChange={(event) => setType(event.target.value)}
            >
              <option value='Monitors'>Monitors</option>
              <option value='Phones'>Phones</option>
            </select>

          <label htmlFor='specification'>
            Specification:
          </label>
            <select
              id='specification'
              className='form-select'
              onChange={(event) => setSpecification(event.target.value)}
            >
              <option value="Specification 1">Specification 1</option>
              <option value="Specification 2">Specification 2</option>
            </select>
        </form>
      </div>

      <div className='d-flex gap-3 flex-column'>
        {visibleProducts.map(product => (
          <ProductItem
            key={product.id}  
            product={product}
            isSelectOrder={null}
            handleDeleteProduct={() => {}}
          />
        ))}
      </div>
    </Layout>
  )
}

export default ProductsPage