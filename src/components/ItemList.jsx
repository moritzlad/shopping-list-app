import Item from './Item'

export default function ItemList({ items }) {
  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <Item key={index} label={item.label} emoji={item.emoji} />
      ))}
    </ul>
  )
}
