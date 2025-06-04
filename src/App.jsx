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
    <div className="p-4 max-w-md mx-auto">
      <Header />
      <ItemForm onAddItem={addItem}/>
      <ItemList items={items}/>
    </div>
  )
}

export default App
