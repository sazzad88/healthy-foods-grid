import React, { useState, useEffect } from 'react'
import { getProducts } from '@/api/products'
import styles from './Products-table.module.css'
import { Product } from '@/api/types'

const ProductsTable: React.FC = () => {
  const [products, setProducts] = useState<Product[] | []>([])

  // TODO Feature 1: Display products in a rich text table
  // TODO Feature 2: Compare two products

  useEffect(() => {
    console.log('load products')
    getProducts().then((response) => {
      console.log(response)
      const products: Product[] = response.slice(0, 10)
      setProducts(products)
    })
  }, [])
  return (
    <div>
      <table className={styles.datatable}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Tags</th>
            <th>Energy</th>
            <th>Protein</th>
            <th>Fat</th>
            <th>Carbohydrate</th>
            <th>Sugars</th>
            <th>Dietry Fibre</th>
            <th>Sodium</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: Product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.tags ? product.tags.join(',') : '-'}</td>
              <td>{product.name}</td>
              <td>{product.name}</td>
              <td>{product.name}</td>
              <td>{product.name}</td>
              <td>{product.name}</td>
              <td>{product.name}</td>
              <td>{product.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductsTable
