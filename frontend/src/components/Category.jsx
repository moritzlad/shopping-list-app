import ItemList from "./ItemList.jsx"

export default function Category({name, emoji, items}) {
    return (
        <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">{emoji} {name}</h2>
            <ItemList items={items}/>
        </div>
    )
}