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

const brands = [
  'Apple',
  'Samsung',
  'OPPO',
  'Huawei',
  'Microsoft Surface',
  'Infinix',
  'HP Pavilion',
  'Impression of Acqua Di Gio',
  'Royal_Mirage',
  'Fog Scent Xpressio',
  'Al Munakh',
  'Lord - Al-Rehab',
  "L'Oreal Paris",
  'Hemani Tea',
  'Dermive',
  'ROREC White Rice',
  'Fair & Clear',
  'Saaf & Khaas',
  'Bake Parlor Big',
  'Baking Food Items',
  'fauji',
  'Dry Rose',
  'Boho Decor',
  'Flying Wooden',
  'LED Lights',
  'luxury palace',
  'Golden',
  'Furniture Bed Set',
  'Ratttan Outdoor',
  'Kitchen Shelf',
  'Multi Purpose',
  'AmnaMart',
  'Professional Wear',
  'Soft Cotton',
  'Top Sweater',
  'RED MICKY MOUSE..',
  'Digital Printed',
  'Ghazi Fabric',
  'IELGY',
  'IELGY fashion',
  'Synthetic Leather',
  'Sandals Flip Flops',
  'Maasai Sandals',
  'Arrivals Genuine',
  'Vintage Apparel',
  'FREE FIRE',
  'The Warehouse',
  'Sneakers',
  'Rubber',
  'Naviforce',
  'SKMEI 9117',
  'Strap Skeleton',
  'Stainless',
  'Eastern Watches',
  'Luxury Digital',
  'Watch Pearls',
  'Bracelet',
  'LouisWill',
  'Copenhagen Luxe',
  'Steal Frame',
  'Darojay',
  'Fashion Jewellery',
  'Cuff Butterfly',
  'Designer Sun Glasses',
  'mastar watch',
  'Car Aux',
  'W1209 DC12V',
  'TC Reusable',
  'Neon LED Light',
  'METRO 70cc Motorcycle - MR70',
  'BRAVE BULL',
  'shock absorber',
  'JIEPOLLY',
  'Xiangle',
  'lightingbrilliance',
  'Ifei Home',
  'DADAWU',
  'YIOSI',
]

interface SelectBrands {
  onChange?: (value: string) => void
}

const SelectBrands: FC<SelectBrands> = ({ onChange }) => {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a brands" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Brands</SelectLabel>
          {brands.map((item, idx) => (
            <SelectItem value={item} key={idx}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SelectBrands
