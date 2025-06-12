import { useState } from 'react'

export default function Item({ label, emoji}) {
    const [checked, setChecked] = useState(false)

    return (
      <li onClick={() => setChecked(!checked)}
      className={`p-2  rounded select-none ${checked ? "line-through text-gray-400": ""}`}>
        {emoji} {label}
      </li>
    )
  }