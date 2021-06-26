import React, { useState, useEffect } from 'react'
import { getProducts } from '@/api/products'
import styles from './Products-table.module.css'
import { Product, ProductMap } from '@/api/types'
import ProductsTableItem from './product-table-item'
import CompareInfo from './compare-info-row'
import ProgressIndicator from '@/components/utility/ProgressIndicator/ProgressIndicator'
import Pagination from '@/components/utility/Pagination/Pagination'

const ProductsTable: React.FC = () => {
  const [products, setProducts] = useState<Product[] | []>([])
  const [productsMap, setProductsMap] = useState<ProductMap>({})
  const [selectedProducts, setSelectedProducts] = useState<string[] | []>([])
  const [showCompare, setShowCompare] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [perPage, setPerPage] = useState<number>(10)
  const [pageNum, setPageNum] = useState<number>(1)
  const [comparableColumns, setComparableColumns] = useState<string[] | []>([])

  const attachProduct = (productId: string) => {
    let selected: string[] = [...selectedProducts]

    if (selected.indexOf(productId) === -1) {
      if (selected.length === 2) {
        selected = selected.slice(1)
      }
      selected.push(productId)
    } else {
      selected = selected.filter((item: string) => item !== productId)
    }

    if (selected.length < 2) setShowCompare(false)

    setSelectedProducts(selected)
  }

  useEffect(() => {
    setLoading(true)
    getProducts().then((response) => {
      // console.log(response)
      const products: Product[] = response,
        productsMap: ProductMap = {},
        uniqueColums: string[] = []

      products.forEach((item: Product) => {
        productsMap[item.id] = item

        // collect unquie comparable keys which have values as number
        Object.keys(item).forEach((key: string) => {
          if (key !== 'name' && key !== 'tags' && typeof item[key] === 'number' && uniqueColums.indexOf(key) === -1)
            uniqueColums.push(key)
        })
      })

      // console.log({ uniqueColums })
      setComparableColumns(uniqueColums)
      setLoading(false)
      setProducts(products)
      setProductsMap(productsMap)
    })
  }, [])

  return (
    <>
      {loading ? (
        <ProgressIndicator message="Loading products..." />
      ) : (
        <section className={styles.section}>
          <div className={styles.info}>
            <div>
              {selectedProducts.length === 2
                ? '2 products selected'
                : selectedProducts.length === 1
                ? '1 product selected'
                : ''}
            </div>
            <div>
              <button
                onClick={() => {
                  setShowCompare((value) => {
                    return !value
                  })
                }}
                disabled={selectedProducts.length !== 2}
                className={styles.btn}
              >
                {selectedProducts.length === 2 ? 'compare products' : 'select 2 products to compare'}
              </button>
            </div>
          </div>
          <div className={styles.tableContainer}>
            <table className={styles.datatable}>
              <thead>
                <tr>
                  <th>Product</th>
                  {comparableColumns.map((item: string) => (
                    <th key={item}>{item}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {selectedProducts.length === 2 && showCompare ? (
                  <CompareInfo
                    comparableColumns={comparableColumns}
                    product1={productsMap[selectedProducts[0]]}
                    product2={productsMap[selectedProducts[1]]}
                  />
                ) : null}
                {products.slice((pageNum - 1) * perPage, perPage * pageNum - 1).map((product: Product) => (
                  <ProductsTableItem
                    comparableColumns={comparableColumns}
                    highlight={selectedProducts.includes(product.id)}
                    key={product.id}
                    product={product}
                    attachProduct={attachProduct}
                  />
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            productCount={products.length}
            updatePerPageData={setPerPage}
            setPageNum={setPageNum}
            pageNum={pageNum}
            perPage={perPage}
          />
        </section>
      )}
    </>
  )
}

export default ProductsTable
