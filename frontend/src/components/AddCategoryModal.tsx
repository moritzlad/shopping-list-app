import {useState} from "react"
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'
import type { AddCategoryModalProps } from '../types'

export default function AddCategoryModal({ isOpen, onClose, onAddCategory}: AddCategoryModalProps){
    const [categoryName, setCategoryName] = useState('')
    const [emoji, setEmoji] = useState('') 
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)

    const handleEmojiClick = (emojiObject: EmojiClickData) => {
        setEmoji(emojiObject.emoji)
        setShowEmojiPicker(false)
    }

    const handleSubmit = () => {
        if (categoryName.trim() && emoji.trim()) {
          onAddCategory({ name: categoryName.trim(), emoji: emoji.trim() })
          setCategoryName('')
          setEmoji('')
          onClose()
        }
      }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
            <h2 className="text-lg font-semibold mb-4">Add New Category</h2>
            <div className="flex gap-2 mb-4">
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="🛒"
                        value={emoji}
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        className="w-12 h-12 p-2 border rounded text-center cursor-pointer"
                        readOnly
                    />
                    {showEmojiPicker && (
                        <div className="absolute top-14 left-0 z-30">
                            <EmojiPicker onEmojiClick={handleEmojiClick} />
                        </div>
                    )}
                </div>
                <input 
                    type="text" 
                    placeholder="Category name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    className="flex-1 h-12 p-2 border rounded"
                />
            </div>
           
            <div className="flex gap-2">
              <button 
                onClick={onClose}
                className="flex-1 p-2 border rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmit}
                className="flex-1 p-2 bg-blue-500 text-black rounded hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )
    }
