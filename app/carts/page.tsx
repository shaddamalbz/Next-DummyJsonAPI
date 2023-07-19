'use client'
import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'

export default function Page() {
  const [listCart, setListCart] = useState<any[] | undefined>()
  const [cartIndex, setCartIndex] = useState(0)
  const [currentUser, setCurrentUser] = useState<any | undefined>()

  async function getProduct() {
    const res = await fetch(`https://dummyjson.com/carts`)

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    return res.json()
  }

  async function getUser(id: number) {
    const res = await fetch(`https://dummyjson.com/users/${id}`)

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    return res.json()
  }

  useEffect(() => {
    getProduct().then((res) => {
      setListCart(res.carts)
    })
  }, [])

  useEffect(() => {
    const currentCart = listCart?.[cartIndex]
    if (currentCart) {
      getUser(currentCart.userId).then((res) => {
        setCurrentUser(res)
      })
    }
    return () => {
      setCurrentUser(undefined)
    }
  }, [cartIndex, listCart])

  return (
    <div className="p-6 space-y-4">
      <h3 className="font-bold text-lg">Cart {cartIndex + 1}</h3>
      <div>
        <h4 className="font-semibold">Details</h4>
        <div className="bg-slate-100 w-full grid grid-cols-2 gap-4 p-4">
          <div>
            User: {currentUser?.firstName} {currentUser?.lastName}
          </div>
          <div># of Items: {listCart?.[cartIndex].totalProducts}</div>
          <div>Added On: 20 Jan 2022</div>
          <div>Total Amount: {listCart?.[cartIndex].total}</div>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Discounted Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listCart?.[cartIndex].products?.map((item: any) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.title}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.discountedPrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-end gap-4">
        <Button disabled={cartIndex === 0} onClick={() => setCartIndex((prev) => prev - 1)}>
          Prev
        </Button>
        <div>
          {cartIndex + 1}/{listCart?.length}
        </div>
        <Button disabled={cartIndex + 1 === listCart?.length} onClick={() => setCartIndex((prev) => prev + 1)}>
          Next
        </Button>
      </div>
    </div>
  )
}
