import Item from './Item'
import type { ItemListProps } from '../types'

export default function ItemList({ items }: ItemListProps) {
  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <Item key={index} label={item.label} emoji={item.emoji} />
      ))}
    </ul>
  )
}
