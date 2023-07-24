'use client'
import React, { useState, useEffect, useDeferredValue, useRef } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Product } from '@/lib/types'
import { SelectCategories } from './components'

export default function Page() {
  const [listProduct, setListProduct] = useState<Product[] | undefined>()
  const [search, setSearch] = useState<string>()
  const [category, setCategory] = useState<string>()
  const deferredSearch = useDeferredValue(search)

  // pagination state
  const [total, setTotal] = useState()
  const [skip, setSkip] = useState(0)
  const limit = useRef(10)

  async function getProduct({
    skip,
    limit,
    search,
    category,
  }: {
    skip: number
    limit: number
    search?: string
    category?: string
  }) {
    let url = 'https://dummyjson.com/products'
    if (search) {
      url += `/search?q=${search}&skip=${skip}&limit=${limit}`
    } else if (category) {
      url += `/category/${category}?skip=${skip}&limit=${limit}`
    } else {
      url += `?skip=${skip}&limit=${limit}`
    }

    const res = await fetch(url)

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    return res.json()
  }

  useEffect(() => {
    getProduct({ limit: limit.current, skip: skip, search: deferredSearch }).then((res) => {
      setListProduct(res.products)
      setTotal(res.total)
    })
  }, [deferredSearch, skip])

  function nextPage(currentSkip: number) {
    setSkip(currentSkip + limit.current)
  }

  function prevPage(currentSkip: number) {
    setSkip(currentSkip - limit.current)
  }

  const currentPage = skip >= limit.current ? skip / limit.current + 1 : 1
  const totalPage = total && total / limit.current - 1

  return (
    <div className="p-6 space-y-4">
      <div className="space-y-4 block lg:flex items-center justify-between gap-4">
        <Input
          className="w-[300px]"
          type="text"
          placeholder="Search Product"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-4">
          <SelectCategories onChange={(value) => setCategory(value)} />
          <Button
            variant="secondary"
            onClick={() => {
              getProduct({ skip: skip, limit: limit.current }).then((res) => setListProduct(res.products))
            }}
          >
            Clear filter
          </Button>
          <Button
            onClick={() => {
              getProduct({ skip: skip, limit: limit.current, category: category }).then((res) =>
                setListProduct(res.products)
              )
            }}
          >
            Filter
          </Button>
        </div>
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
          {listProduct?.map((item: Product) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.title}</TableCell>
              <TableCell>{item.brand}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{item.category}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {total && (
        <div className="flex items-center justify-end gap-4">
          <Button disabled={currentPage === 1} onClick={() => prevPage(skip)}>
            Prev
          </Button>
          <div>
            {currentPage}/{totalPage}
          </div>
          <Button disabled={currentPage === total / limit.current - 1} onClick={() => nextPage(skip)}>
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
