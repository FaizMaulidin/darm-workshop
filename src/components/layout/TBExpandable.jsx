import React, { useState } from 'react'
import ToolBoxCell from '../ui/ToolBoxCell'
import DraggableItem from '../ui/DraggableItem'
import { useDragLayer } from 'react-dnd'

const DraggingGlobal = () => {
  return useDragLayer((monitor) => monitor.isDragging())
}

const TBExpandable = ({children, title, data={}}) => {

    const [isHover, setHover] = useState(false)
    const isDragging = DraggingGlobal()
    const hover = !isDragging && isHover

    const variantClass = {
        "Inputs": `grid-cols-[1fr_2fr_5fr] w-52 ${hover ? "h-[11.7rem]" : ""}`,
        "Outputs": `grid-cols-[1fr_2fr_1fr_1fr_6fr] w-72 ${hover ? "h-[13.4rem]" : ""}`,
        "Memory": " ",
    }

  return (
    <div className='group relative font-cascadia text-xs' onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <button className=' bg-red-primary px-2 py-1 rounded-xs cursor-pointer transition-all duration-300'>{title}</button>
        {title !== "Memory" ?
          <div className={`absolute bottom-full -translate-y-4 opacity-30 transition-all h-0 duration-300 delay-150 ${hover ? "p-[2px] border-1" : ""} z-30 ${hover ? "opacity-100" : "opacity-30"} bg-cream-primary border-0 border-black-primary left-1/2 -translate-x-1/2 overflow-hidden grid gap-[2px] p-0 auto-rows-[24px] ${variantClass[title]}`}>
            {children}
          </div>
          :
          <div className={`absolute bottom-full -translate-y-4 opacity-30 transition-all h-0 duration-300 delay-150 ${hover ? "p-[2px] border-1" : ""} z-30 ${hover ? "opacity-100" : "opacity-30"} ${hover ? "h-[24.8rem]" : "h-0"} bg-cream-primary border-0 border-black-primary left-1/2 -translate-x-1/2 overflow-hidden flex gap-3`}>
            <div className='grid gap-[2px] p-0 auto-rows-[21px] grid-cols-[1fr_2fr_1fr_1fr] w-36'>
              <ToolBoxCell color='black'>No</ToolBoxCell>
              <ToolBoxCell color='red'></ToolBoxCell>
              <ToolBoxCell color='blue'></ToolBoxCell>
              <ToolBoxCell color='blue'></ToolBoxCell>
              {
                Object.keys(data.contact.memory).map((key, index) => {
                  if(index < 16)return (
                    <React.Fragment key={index+1}>
                      <ToolBoxCell>{index + 1}</ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={data.contact.memory[key]}>{key}</DraggableItem></ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={data.coil.memory[key]}>{"["}</DraggableItem></ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={data.coil.memory[`R${key}`]}>R</DraggableItem></ToolBoxCell>
                    </React.Fragment>
                  )
                })
              } 
            </div>
            <div className='grid gap-[2px] p-0 auto-rows-[21px] grid-cols-[1fr_2fr_1fr_1fr] w-36'>
              <ToolBoxCell color='black'>No</ToolBoxCell>
              <ToolBoxCell color='red'></ToolBoxCell>
              <ToolBoxCell color='blue'></ToolBoxCell>
              <ToolBoxCell color='blue'></ToolBoxCell>
              {
                Object.keys(data.contact.memory).map((key, index) => {
                  if (index > 15 && index < 32)return (
                    <React.Fragment key={index+1}>
                      <ToolBoxCell>{index + 1}</ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={data.contact.memory[key]}>{key}</DraggableItem></ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={data.coil.memory[key]}>{"["}</DraggableItem></ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={data.coil.memory[`R${key}`]}>R</DraggableItem></ToolBoxCell>
                    </React.Fragment>
                  )
                })
              } 
            </div>
            <div className='grid gap-[2px] p-0 auto-rows-[21px] grid-cols-[1fr_2fr_1fr_1fr] w-36'>
              <ToolBoxCell color='black'>No</ToolBoxCell>
              <ToolBoxCell color='red'></ToolBoxCell>
              <ToolBoxCell color='blue'></ToolBoxCell>
              <ToolBoxCell color='blue'></ToolBoxCell>
              {
                Object.keys(data.contact.memory).map((key, index) => {
                  if (index > 31 && index < 48)return (
                    <React.Fragment key={index+1}>
                      <ToolBoxCell>{index + 1}</ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={data.contact.memory[key]}>{key}</DraggableItem></ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={data.coil.memory[key]}>{"["}</DraggableItem></ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={data.coil.memory[`R${key}`]}>R</DraggableItem></ToolBoxCell>
                    </React.Fragment>
                  )
                })
              } 
            </div>
          </div>
        }
    </div>
  )
}

export default TBExpandable