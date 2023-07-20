import React, { FC } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const categories = [
  'smartphones',
  'laptops',
  'fragrances',
  'skincare',
  'groceries',
  'home-decoration',
  'furniture',
  'tops',
  'womens-dresses',
  'womens-shoes',
  'mens-shirts',
  '	mens-shoes',
  'mens-watches',
  'womens-watches',
  'womens-bags',
  'womens-jewellery',
  'sunglasses',
]

interface SelectCategories {
  onChange?: (value: string) => void
}

const SelectCategories: FC<SelectCategories> = ({ onChange }) => {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a categories" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          {categories.map((item, idx) => (
            <SelectItem value={item} key={idx}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SelectCategories
