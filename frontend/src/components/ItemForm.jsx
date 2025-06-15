import { useState } from 'react'

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
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none overflow-hidden min-h-[48px]"
              placeholder="What do you want to add?"
              rows="1"
              disabled={isLoading}
              onInput={(e) => {
                e.target.style.height = 'auto'
                e.target.style.height = e.target.scrollHeight + 'px'
              }}
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-12 h-12 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-full flex items-center justify-center text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex-shrink-0"
          >
            {isLoading ? (
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
