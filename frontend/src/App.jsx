import Header from "./components/Header"
import ItemForm from "./components/ItemForm"
import AddCategoryModal from "./components/AddCategoryModal"
import { useState, useEffect } from "react"
import Category from "./components/Category"
import { categoriesTable, itemsTable } from "./db/db"

function App() {
  const [items, setItems] = useState([])

  const [categories, setCategories] = useState([])

  const [showAddCategory, setShowAddCategory] = useState(false)

  useEffect(() => {
    async function loadData(){
      const categoriesFromDB = await categoriesTable.toArray()
      const itemsFromDB = await itemsTable.toArray()

      setCategories(categoriesFromDB)
      setItems(itemsFromDB)
    }

    loadData()
  }, [])

  async function addItem(item){
    const id = await itemsTable.add(item)
    setItems(prevItems => [...prevItems, {...item, id}])
  }

  async function addCategory(category){
    const id = await categoriesTable.add(category)
    setCategories([...categories, {...category, id}])
    setShowAddCategory(false)
  }


  return (
    <div className="min-h-screen w-full">
      <div className="fixed top-0 left-0 right-0 z-10 text-center py-4 bg-white shadow-sm">
        <Header />
      </div>
      <div className="w-screen pt-32 pb-20 px-4 mb-44">
        {categories.map(cat => (
          <Category
            key = {cat.name}
            name = {cat.name}
            emoji = {cat.emoji}
            items={items.filter(item => item.categoryId == cat.id)}
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
      <div className="fixed bottom-0 left-0 right-0 z-10 shadow-lg">
          <ItemForm 
            onAddItem={addItem}
            categories={categories}
          />
      </div>
    </div>
  )
}

export default App
