import ItemList from "./ItemList"
import type { CategoryProps } from '../types'

export default function Category({name, emoji, items}: CategoryProps) {
    return (
        <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">{emoji} {name}</h2>
            <ItemList items={items}/>
        </div>
    )
}
