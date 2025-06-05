import { useState } from 'react'

export default function ItemForm({ onAddItem , categories}) {
  const [text, setText] = useState("")
  const [category, setCategory] = useState(categories[0]?.name || "", )

  function handleSubmit(e) {
    e.preventDefault()

    if (text.trim() === "") return

    onAddItem({label: text, category})
    setText("") // clear input
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        className="flex-grow p-2 border rounded"
        placeholder="Add an item..."
      />
      <select
        value={category}
        onChange={e => setCategory(e.target.value)}
        className="p-2 border rounded"
        >
        {categories.map(cat => (
          <option key={cat.name} value={cat.name}>{cat.name}</option>
        ))}
      </select>
      <button className="px-4 py-2 bg-blue-500 text-black rounded">
        Add
      </button>
    </form>
  )
}
