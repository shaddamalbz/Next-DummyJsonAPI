import Link from 'next/link'
import React from 'react'

function Sidebar() {
  return (
    <aside className="w-[300px] h-screen bg-slate-100 p-4">
      <div className="grid grid-flow-row gap-4 px-6">
        <Link className="" href="/products">
          Products
        </Link>
        <Link className="" href="/carts">
          Carts
        </Link>
      </div>
    </aside>
  )
}

export { Sidebar }
