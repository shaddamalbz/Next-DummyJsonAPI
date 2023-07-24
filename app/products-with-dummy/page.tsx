'use client'
import React, { useMemo, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import dummyProduct from '@/lib/dummyProduct.json'
import { Product } from '@/lib/types'
import SelectBrands from './components/SelectBrand'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Page() {
  const { products } = dummyProduct
  const [selectedBrands, setSelectedBrands] = useState<string>()
  const [startPrice, setStartPrice] = useState<number>()
  const [endPrice, setEndPrice] = useState<number>()
  const [data, setData] = useState()

  const filteredData = useMemo(() => {
    products
    if (selectedBrands) {
      return products.filter((item) => item.brand === selectedBrands)
    }
    if (startPrice || endPrice) {
      return products.filter((item) => +item.price >= (startPrice || 0) && +item.price <= (endPrice || 10000))
    }

    return undefined
  }, [selectedBrands, products, startPrice, endPrice])

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-end gap-4">
        <div className="flex gap-4 items-center">
          <Input type="number" placeholder="start price" onChange={(e) => setStartPrice(+e.target.value)} />
          s/d
          <Input type="number" placeholder="end price" onChange={(e) => setEndPrice(+e.target.value)} />
        </div>
        <SelectBrands onChange={(value) => setSelectedBrands(value)} />
        <Button
          variant="secondary"
          onClick={() => {
            setSelectedBrands(undefined)
          }}
        >
          Clear filter
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(filteredData ?? products).map((product: Product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.title}</TableCell>
              <TableCell>{product.brand}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.category}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
