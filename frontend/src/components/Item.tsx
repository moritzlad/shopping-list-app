import { useState } from 'react'
import type { ItemProps } from '../types'

export default function Item({ label, emoji }: ItemProps) {
    const [checked, setChecked] = useState(false)

    return (
      <li onClick={() => setChecked(!checked)}
      className={`p-2  rounded select-none ${checked ? "line-through text-gray-400": ""}`}>
        {emoji} {label}
      </li>
    )
  }
