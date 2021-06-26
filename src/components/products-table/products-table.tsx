import React, { useState, useEffect } from 'react'
import { getProducts } from '@/api/products'
import styles from './Products-table.module.css'
import { Product } from '@/api/types'
import ProductsTableItem from './product-table-item'

const ProductsTable: React.FC = () => {
  const [products, setProducts] = useState<Product[] | []>([])
  const [selectedProducts, setSelectedProducts] = useState<string[] | []>([])
  // TODO Feature 1: Display products in a rich text table
  // TODO Feature 2: Compare two products

  const attachProduct = (productId: string) => {
    // console.log(productId)
    let selected: string[] = [...selectedProducts]

    if (selected.indexOf(productId) === -1) {
      if (selected.length === 2) {
        selected = selected.slice(1)
      }
      selected.push(productId)
    } else {
      selected = selected.filter((item: string) => item !== productId)
    }

    setSelectedProducts(selected)
  }

  useEffect(() => {
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
            <ProductsTableItem
              highlight={selectedProducts.includes(product.id)}
              key={product.id}
              product={product}
              attachProduct={attachProduct}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductsTable
