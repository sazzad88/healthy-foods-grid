import React from 'react'
import { Product } from '@/api/types'
import styles from './Products-table.module.css'

function CompareInfo({
  product1,
  product2,
  comparableColumns
}: {
  product1: Product
  product2: Product
  comparableColumns: string[]
}) {
  const compareMarkup = (key: string) => {
    return product1[key] !== product2[key] ? (
      <>
        <span className={`${styles.tag} ${styles.red}`}>{product1[key] !== undefined ? product1[key] : '-'}</span>
        <span className={`${styles.tag} ${styles.blue}`}>{product2[key] !== undefined ? product2[key] : '-'}</span>
      </>
    ) : (
      product1[key]
    )
  }

  return (
    <tr className={styles.compare}>
      <td>
        {product1.name} <br />
        vs <br />
        {product2.name}
      </td>
      {comparableColumns.map((item: string) => (
        <td key={`c${item}`}>{compareMarkup(item)}</td>
      ))}
    </tr>
  )
}

export default CompareInfo
