import Dexie from "dexie"

export const db = new Dexie("shoppingListDB")

db.version(1).stores({
    categories: "++id, name, emoji",
    items: "++id, label, categoryId"
})

export const categoriesTable = db.categories
export const itemsTable = db.items