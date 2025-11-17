import React, { useState, useEffect } from 'react'
import { useDrop } from 'react-dnd'
import clsx from 'clsx'
import { useLadderCellContext } from '../../hooks/LadderCellProvider'
import { useLadderDataContext } from '../../hooks/LadderDataProvider'
import DraggableItem from '../ui/DraggableItem'

const DnDCanvas = ({type="contact", index, running, canvasID, removeItem}) => {
    const [part, setPart] = useState(null)
    const [wired, setWired] = useState(false)
    const [vWired, setVWired] = useState(false)
    const ladderCellContext = useLadderCellContext()
    const ladderDataContext = useLadderDataContext()

    const [{ isOver }, drop] = useDrop({
        accept: type,
        drop: (item) => {
            if(running) return
            let exist = false
            ladderDataContext.value.horizontal.map((coil) => {
                if(coil?.name === item?.name && item?.type === coil?.type && coil?.type === "coil" && item?.from === undefined){
                    console.log(item?.from)
                    exist = true
                }
            })
            if(exist) return
            setWired(false)
            const oldItem = {...ladderCellContext.value[item.type][item.categ][item.name]}
            const ladderItem = {...oldItem, NOpened: item.NOpened !== undefined ? item.NOpened : true, from: canvasID}
            setPart(ladderItem)
            ladderDataContext?.setValue(prev => {
                const newValue = [...prev.horizontal]
                newValue[index] = ladderItem
                return {horizontal: newValue, vertical: prev.vertical}
            })

            return {to: canvasID, from: item?.from}
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    })

    useEffect(() => {
        if(ladderDataContext.value.horizontal[index]){
            if(ladderDataContext.value.horizontal[index].name === "wired"){
                setWired(true)
            } else {
                setPart({...ladderDataContext.value.horizontal[index], from: canvasID})
            }
        } else {
            setPart(null)
            setWired(false)
        }

        ladderDataContext.value.vertical[index]
            ? setVWired(true)
            : setVWired(false)
    }, [ladderDataContext.value])

  return (
    <div ref={drop} onClick={() => {
        if (!part && type === "contact" && !running) {
            wired 
                ? ladderDataContext.setValue(prev => {
                    const newValue = [...prev.horizontal]
                    newValue[index] = null
                    return {horizontal: newValue, vertical: prev.vertical}
                })
                : ladderDataContext.setValue(prev => {
                    const newValue = [...prev.horizontal]
                    newValue[index] = {name: "wired", state: true}
                    return {horizontal: newValue, vertical: prev.vertical}
                })
            setWired(!wired)
        }}} 
    className={clsx(' w-full flex justify-center items-center relative border-b-2 border-black-fade', isOver && 'opacity-50')}>
        {part?.type && (
            <DraggableItem ladderCell={part} mode="canvas" removeItem={removeItem}>
                <div className='bg-black-primary h-[1px] w-full'>
                    <p className='text-xs absolute top-0 left-1 font-cascadia'>{part.name.includes("R") || part.type == "contact" ? part.name : "["+part.name}</p>
                    {(!running) && (<button onClick={() => {
                        if(running) return
                        ladderDataContext.setValue(prev => {
                            const newValue = [...prev.horizontal]
                            newValue[index] = null
                            return {horizontal: newValue, vertical: prev.vertical}
                        })
                        setPart(null)
                    }} className='absolute top-1 right-1 text-xs font-cascadia cursor-pointer bg-red-primary px-1 rounded-sm text-white-primary transition-all duration-150'>X</button>)}
                    <div className='text-xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-cascadia'>{
                        part.type === "contact" 
                            ? part.NOpened
                                ? ladderCellContext.value[type][part.categ][part.name].state && !ladderCellContext.value[type][part.categ]["R"+part.name]?.state 
                                    ? (
                                        <div className='w-8 h-8 bg-white-primary flex justify-center items-center'>
                                            <div className='w-full h-[3px] bg-red-primary origin-right'></div>
                                        </div>
                                    )
                                    : (
                                        <div className='w-8 h-8 bg-white-primary flex justify-center items-center'>
                                            <div className='w-full h-[3px] bg-black-primary origin-right rotate-24'></div>
                                        </div>
                                    )
                                : ladderCellContext.value[type][part.categ][part.name].state && !ladderCellContext.value[type][part.categ]["R"+part.name]?.state 
                                    ? (
                                        <div className='w-8 h-8 bg-white-primary flex justify-start items-center relative'>
                                            <div className='w-[2px] h-2.5 bg-black-primary -translate-y-1'></div>
                                            <div className='w-8 h-[3px] bg-black-primary origin-right rotate-28 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'></div>
                                        </div>
                                    )
                                    : (
                                        <div className='w-8 h-8 bg-white-primary flex justify-start items-center relative'>
                                            <div className={clsx('w-[2px] h-2.5 -translate-y-1', running ? 'bg-red-primary' : 'bg-black-primary')}></div>
                                            <div className={clsx('w-8 h-[3px] origin-right rotate-15 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2', running ? 'bg-red-primary' : 'bg-black-primary')}></div>
                                        </div>
                                    )
                            : ladderCellContext.value[type][part?.categ][part?.name].state 
                                ? (
                                    <div className='w-5 h-5 bg-white-primary border-1 border-black-primary p-[2px]'>
                                        <div className='w-full h-full bg-red-primary'></div>
                                    </div>
                                )
                                : (
                                    <div className='w-5 h-5 bg-white-primary border-1 border-black-primary'></div>
                                )
                    }</div>
                    {(part.type === "contact" && !running) && (
                        <button
                            onClick={() => {
                                if(running) return
                                ladderDataContext.setValue(prev => {
                                    const newValue = [...prev.horizontal]
                                    newValue[index].NOpened = !newValue[index].NOpened
                                    return {horizontal: newValue, vertical: prev.vertical}
                                })
                            }}
                        className='text-[0.625rem] absolute bottom-1 left-0.5 font-cascadia cursor-pointer bg-blue-primary px-1 rounded-xs text-white-primary transition-all duration-150'
                        >{part.NOpened ? "NO" : "NC"}</button>
                    )}
                </div>
            </DraggableItem>
        )}
        {!part && wired && (
            <div className='bg-black-primary h-[1px] w-full'></div>
        )}
        {!part && !wired && type !== "coil" && (
            <div className='border-t-1 border-dotted border-black-primary opacity-20 h-[1px] w-full'></div>
        )}
        {type !== "coil" && <div onClick={(e) => {
            e.stopPropagation()
            if(running) return
            vWired
                ? ladderDataContext.setValue(prev => {
                    const newValue = [...prev.vertical]
                    newValue[index] = null
                    return {horizontal: prev.horizontal, vertical: newValue}
                })
                : ladderDataContext.setValue(prev => {
                    const newValue = [...prev.vertical]
                    newValue[index] = {name: "wired", state: true}
                    return {horizontal: prev.horizontal, vertical: newValue}
                })
            setVWired(!vWired)
        }} className='absolute top-1/2 right-0 translate-x-1/2 w-3 z-10 h-full flex justify-center items-center'>
            <div className={clsx('h-full border-l-1 border-black-primary ', vWired ? 'border-solid opacity-100' : 'border-dotted opacity-20')}>
            </div>
        </div>}
    </div>
  )
}

export default DnDCanvas