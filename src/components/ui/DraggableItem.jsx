import clsx from 'clsx'
import React from 'react'
import { useDrag } from 'react-dnd'

const DraggableItem = ({children, ladderCell, mode="toolbox", removeItem}) => {
    const [{ isDragging }, drag] = useDrag({
        type: ladderCell.type,
        item: ladderCell,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (dropResult && dropResult.to !== dropResult.from && removeItem) {
              // Move item: remove from origin
              removeItem(dropResult.from);
            }
        }
    })
    if(mode === "toolbox") return (
    <button ref={drag} className={clsx('bg-white-primary flex justify-center items-center text-xs h-full w-full cursor-grab hover:text-white-primary transition-all duration-150', isDragging && 'opacity-50', ladderCell.type === "contact" ? 'hover:bg-red-primary' : 'hover:bg-blue-primary')}>{children}</button>
    )
    return (
        <div ref={drag} className={clsx('bg-white-primary flex justify-center items-center text-xs h-full w-full cursor-grab transition-all duration-150', isDragging && 'opacity-50')}>{children}</div>
    )
}

export default DraggableItem