import React from 'react'

import styles from './Products-table.module.css'
import { Product } from '@/api/types'

function ProductsTableItem({
  comparableColumns,
  highlight,
  product,
  attachProduct
}: {
  comparableColumns: string[]
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
      <td style={{ width: '150px' }}>{product.name}</td>
      {comparableColumns.map((item: string) => (
        <td key={`s${item}`}>{product[item]}</td>
      ))}
    </tr>
  )
}

export default ProductsTableItem
