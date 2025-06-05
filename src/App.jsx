import Header from "./components/Header"
import ItemForm from "./components/ItemForm"
import AddCategoryModal from "./components/AddCategoryModal"
import { useState } from "react"
import Category from "./components/Category"

function App() {
  const [items, setItems] = useState([
    { label: 'Emmental', category: 'Dairy' },
    { label: 'Croissants', category: 'Bakery' }
  ])

  const [categories, setCategories] = useState([
      {name: "Dairy", emoji: "🧀" },
      { name: "Bakery", emoji: "🥖" }
  ])

  const [showAddCategory, setShowAddCategory] = useState(false)

  function addItem(item){
    setItems([...items, item])
  }

  function addCategory(category){
    setCategories([...categories, category])
    setShowAddCategory(false)
  }


  return (
    <div className="min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-10 text-center py-4 bg-white shadow-sm">
        <Header />
      </div>
      <div className="w-screen pt-32 pb-20 px-4">
        {categories.map(cat => (
          <Category
            key = {cat.name}
            name = {cat.name}
            emoji = {cat.emoji}
            items={items.filter(item => item.category == cat.name)}
          />
        ))}
      <div onClick={() => setShowAddCategory(true)}
        className={"p-2 border rounded px-4 text-center"}>
        + ADD CATEGORY
      </div>
      <AddCategoryModal
        isOpen={showAddCategory}
        onClose={() => setShowAddCategory(false)}
        onAddCategory={addCategory}
      />
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-10 p-4 bg-white shadow-lg border-t">
        <div className="max-w-md mx-auto">
          <ItemForm 
            onAddItem={addItem}
            categories={categories}
          />
        </div>
      </div>
    </div>
  )
}

export default App
