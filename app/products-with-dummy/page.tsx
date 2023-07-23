'use client'
import React, { useMemo, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import dummyProduct from '@/lib/dummyProduct.json'
import { Product } from '@/lib/types'
import _ from 'underscore'
import SelectBrands from './components/SelectBrand'
import { Button } from '@/components/ui/button'

export default function Page() {
  const { products } = dummyProduct
  const [selectedBrands, setSelectedBrands] = useState<string>()

  const filteredData = useMemo(() => {
    if (selectedBrands) {
      return products.filter((item) => item.brand === selectedBrands)
    }
    return undefined
  }, [selectedBrands, products])

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-end gap-4">
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
