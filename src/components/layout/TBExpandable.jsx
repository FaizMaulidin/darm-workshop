import React from 'react'
import ToolBoxCell from '../ui/ToolBoxCell'
import DraggableItem from '../ui/DraggableItem'

const TBExpandable = ({children, title}) => {

    const variantClass = {
        "Inputs": "grid-cols-[1fr_2fr_5fr] w-52 group-hover:h-48",
        "Outputs": "grid-cols-[1fr_2fr_1fr_1fr_6fr] w-72 group-hover:h-56",
        "Memory": "grid-cols-[1fr_2fr_1fr_1fr] w-36 group-hover:h-88",
    }

  return (
    <div className='group relative font-cascadia text-xs'>
      <button className=' bg-red-primary px-2 py-1 rounded-xs cursor-pointer transition-all duration-300'>{title}</button>
      <div className={`absolute bottom-full -translate-y-4 opacity-30 transition-all h-0 duration-300 delay-150 group-hover:p-[2px] group-hover:border-1 z-30 group-hover:opacity-100 bg-cream-primary border-0 border-black-primary left-1/2 -translate-x-1/2 overflow-hidden grid gap-[2px] p-0 auto-rows-[24px] ${variantClass[title]}`}>
        {children}
      </div>

    </div>
  )
}

export default TBExpandable