import { useState } from 'react'
import {ArrowUpIcon} from "@heroicons/react/24/solid"
export default function ItemForm({ onAddItem, categories }) {
  const [text, setText] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (text.trim() === "") return
    setIsLoading(true)
    try {
      const response = await fetch("http://localhost:3000/categorize", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          categories: categories.map(cat => cat.name),
          text: text
        })
      })

      if (response.ok) {
        const result = await response.json()
        console.log("API Response:", result)
        console.log("Number of items:", result.items?.length)

        if (result.items && Array.isArray(result.items)) {
          for (const itemData of result.items) {
            console.log("Processing item:", itemData)
            const categoryId = categories.find(cat => cat.name === itemData.category)?.id
            console.log("Found categoryId:", categoryId)
            await onAddItem({
              label: itemData.item,
              categoryId: categoryId
            })
          }
        }
        setText("")
      } else {
        console.error('Failed to add item:', response.status, response.statusText)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full bg-white rounded-t-3xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] flex items-center relative p-3">
    <textarea
      value={text}
      onChange={e => setText(e.target.value)}
      className="flex-1 px-6 py-2 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 "
      placeholder="Add items to list..."
      disabled={isLoading}
      rows={1}
        style={{
          height: 'auto',
          minHeight: '40px'
        }}
        onInput={(e) => {
          // Auto-resize textarea
          e.target.style.height = 'auto'
          e.target.style.height = Math.min(e.target.scrollHeight, 200) + 'px'
        }}
    />
    
    <button
      type="submit"
      disabled={isLoading || text.trim() === ""}
      className="absolute bottom-5 right-5 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center"
    >
      <ArrowUpIcon className="w-5 h-5 text-white" />
    </button>
  </form>
  )
}
