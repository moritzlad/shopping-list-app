import Header from "./components/Header"
import ItemForm from "./components/ItemForm"
import ItemList from "./components/ItemList"
import { useState } from "react"

function App() {
  const [items, setItems] = useState([
    { label: 'Cheese', emoji: '🧀' },
    { label: 'Bread', emoji: '🥖' }
  ])

  function addItem(item){
    setItems([...items, item])
  }

  return (
    <div className="min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-10 text-center py-4 bg-white shadow-sm">
        <Header />
      </div>
      <div className="w-screen pt-32 pb-20 px-4">
        <ItemList items={items}/>
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-10 p-4 bg-white shadow-lg border-t">
        <div className="max-w-md mx-auto">
          <ItemForm onAddItem={addItem}/>
        </div>
      </div>
    </div>
  )
}

export default App
