import Dexie, { type EntityTable } from "dexie"
import type { Category, Item } from "../types"

export const db = new Dexie("shoppingListDB") as Dexie & {
  categories: EntityTable<Category, 'id'>;
  items: EntityTable<Item, 'id'>;
};

db.version(1).stores({
    categories: "++id, name, emoji",
    items: "++id, label, categoryId"
})

export const categoriesTable = db.categories
export const itemsTable = db.items
