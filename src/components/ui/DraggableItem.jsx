import clsx from 'clsx'
import React from 'react'
import { useDrag } from 'react-dnd'

const DraggableItem = ({children, ladderCell}) => {
    const [{ isDragging }, drag] = useDrag({
        type: ladderCell.type,
        item: ladderCell,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })
  return (
    <div ref={drag} className={clsx('bg-white-primary flex justify-center items-center text-xs h-full w-full cursor-pointer hover:text-white-primary transition-all duration-150', isDragging && 'opacity-50', ladderCell.type === "contact" ? 'hover:bg-red-primary' : 'hover:bg-blue-primary')}>{children}</div>
  )
}

export default DraggableItem