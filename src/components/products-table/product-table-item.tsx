import React from 'react'

import styles from './Products-table.module.css'
import { Product } from '@/api/types'

function ProductsTableItem({
  highlight,
  product,
  attachProduct
}: {
  highlight: boolean
  product: Product
  attachProduct: (id: string) => void
}) {
  return (
    <tr
      className={highlight ? styles.selected : ''}
      onClick={() => {
        attachProduct(product.id)
      }}
    >
      <td>{product.name}</td>
      <td>{product.tags ? product.tags.join(',') : '-'}</td>
      <td>{product.energy}</td>
      <td>{product.protein}</td>
      <td>{product.fat}</td>
      <td>{product.carbohydrate}</td>
      <td>{product.sugars}</td>
      <td>{product.dietaryFibre}</td>
      <td>{product.sodium}</td>
    </tr>
  )
}

export default ProductsTableItem