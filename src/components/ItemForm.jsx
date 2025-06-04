import { useState } from 'react'

export default function ItemForm({ onAddItem }) {
  const [text, setText] = useState("")

  function handleSubmit(e) {
    e.preventDefault()

    if (text.trim() === "") return

    const newItem = {
      label: text,
      emoji: "🛒" // placeholder emoji
    }

    onAddItem(newItem)
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
      <button className="px-4 py-2 bg-blue-500 text-black rounded">
        Add
      </button>
    </form>
  )
}
