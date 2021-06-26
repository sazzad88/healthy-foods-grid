import React from 'react'

import styles from './Pagination.module.css'
import { Product } from '@/api/types'

function Pagination({
  productCount,
  pageNum,
  perPage,
  updatePerPageData,
  setPageNum
}: {
  productCount: number
  pageNum: number
  perPage: number
  updatePerPageData: (id: number) => void
  setPageNum: (id: number) => void
}) {
  const perPageOptions = [10, 20, 30, 40, 50]
  const pageCount = Math.ceil(productCount / perPage)

  return (
    <div className={styles.pagination}>
      Rows per page : &nbsp;
      <select
        onChange={(event) => {
          updatePerPageData(Number(event.target.value))
          setPageNum(1)
        }}
      >
        {perPageOptions.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      &nbsp; &nbsp; &nbsp; &nbsp;
      {(pageNum - 1) * perPage + 1} - {pageNum * perPage < productCount ? pageNum * perPage : productCount} of{' '}
      {productCount}
      &nbsp; &nbsp; &nbsp; &nbsp;
      <span
        onClick={() => {
          if (pageNum > 1) setPageNum(pageNum - 1)
        }}
        className={`${styles.pageIndicator} ${pageNum === 1 ? styles.disabled : ''}`}
      >
        &#60;
      </span>
      <span
        onClick={() => {
          if (pageNum < pageCount) setPageNum(pageNum + 1)
        }}
        className={`${styles.pageIndicator} ${pageNum === pageCount ? styles.disabled : ''}`}
      >
        &#62;
      </span>
    </div>
  )
}

export default Pagination
