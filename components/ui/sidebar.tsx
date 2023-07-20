import Link from 'next/link'
import React from 'react'
import menu from '@/lib/menu.json'

function Sidebar() {
  return (
    <aside className="w-[300px] h-screen bg-slate-100 p-4">
      <div className="grid grid-flow-row gap-4 px-6">
        {menu.list.map((item, idx) => (
          <Link href={item.href} key={idx}>
            {item.label}
          </Link>
        ))}
      </div>
    </aside>
  )
}

export { Sidebar }
