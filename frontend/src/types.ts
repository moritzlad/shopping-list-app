// Type definitions for the shopping list app

export interface Category {
  id?: number;
  name: string;
  emoji: string;
}

export interface Item {
  id?: number;
  label: string;
  categoryId?: number;
  emoji?: string;
}

export interface ApiResponse {
  items: Array<{
    item: string;
    category: string;
  }>;
}

export interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCategory: (category: Category) => void;
}

export interface CategoryProps {
  name: string;
  emoji: string;
  items: Item[];
}

export interface ItemFormProps {
  onAddItem: (item: Item) => void;
  categories: Category[];
}

export interface ItemListProps {
  items: Item[];
}

export interface ItemProps {
  label: string;
  emoji?: string;
}
