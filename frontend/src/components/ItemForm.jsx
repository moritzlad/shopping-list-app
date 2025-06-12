import { useState, useEffect } from 'react'

export default function ItemForm({ onAddItem , categories}) {
  const [text, setText] = useState("")
  const [categoryId, setCategoryId] = useState(categories[0]?.id || "")

  function handleSubmit(e) {
    e.preventDefault()
    if (text.trim() === "") return
    onAddItem({label: text, categoryId})
    setText("")
  }

  useEffect(() => {
    if (categories.length > 0) {
      setCategoryId(categories[0].id)
    }
  }, [categories])

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <div>
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          className="flex-grow p-2 border rounded"
          placeholder="Add an item..."
        />
        <select
          value={categoryId}
          onChange={e => setCategoryId(Number(e.target.value))}
          className="p-2 border rounded"
          >
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>
      
      <button className="px-4 py-2 bg-blue-500 text-black rounded">
        Add
      </button>
    </form>
  )
}
