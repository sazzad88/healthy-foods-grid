import React from 'react'
import { Product } from '@/api/types'
import styles from './Products-table.module.css'

function CompareInfo({ product1, product2 }: { product1: Product; product2: Product }) {
  const compareMarkup = (key: string) => {
    return product1[key] !== product2[key] ? (
      <>
        {product1[key] !== undefined ? <span className={`${styles.tag} ${styles.red}`}>{product1[key]}</span> : null}
        {product2[key] !== undefined ? <span className={`${styles.tag} ${styles.blue}`}>{product2[key]}</span> : null}
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
      <td>11</td>
      <td>{compareMarkup('energy')}</td>
      <td> {compareMarkup('protein')}</td>
      <td> {compareMarkup('fat')}</td>
      <td> {compareMarkup('carbohydrate')}</td>
      <td> {compareMarkup('sugars')}</td>
      <td> {compareMarkup('dietaryFibre')}</td>
      <td> {compareMarkup('sodium')}</td>
    </tr>
  )
}

export default CompareInfo
