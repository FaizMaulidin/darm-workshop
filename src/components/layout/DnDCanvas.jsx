import React, {useEffect, useState} from 'react'
import { useDrop } from 'react-dnd'
import clsx from 'clsx'
import { useLadderCellContext } from '../../hooks/LadderCellProvider'

const DnDCanvas = ({type="contact"}) => {
    const [part, setPart] = useState(null)
    const [wired, setWired] = useState(false)
    const [vWired, setVWired] = useState(false)
    const ladderCellContext = useLadderCellContext()

    const [{ isOver }, drop] = useDrop({
        accept: type,
        drop: (item) => {
            setWired(false)
            setPart(ladderCellContext.value[item.type][item.categ][item.name])
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    })

    const setLadderCellPart = (prop, value) => {
        ladderCellContext.setValue({
            ...ladderCellContext.value,
            [type]: {
                ...ladderCellContext.value[type],
                [part.categ]: {
                    ...ladderCellContext.value[type][part.categ],
                    [part.name]: {
                        ...ladderCellContext.value[type][part.categ][part.name],
                        [prop]: value
                    }
                }
            }
        })
    }

  return (
    <div ref={drop} onClick={() => {!part && setWired(!wired)}} className={clsx(' w-full flex justify-center items-center relative border-b-2 border-black-fade', isOver && 'opacity-50')}>
        {part && (
            <div className='bg-black-primary h-[1px] w-full'>
                <p className='text-xs absolute top-0 left-1 font-cascadia'>{part.name}</p>
                <button onClick={() => {setPart(null)}} className='absolute top-1 right-1 text-xs font-cascadia cursor-pointer bg-red-primary px-1 rounded-sm text-white-primary transition-all duration-150'>X</button>
                <p className='text-xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-cascadia'>{
                    part.type === "contact" 
                        ? part.NOpened
                            ? ladderCellContext.value[type][part.categ][part.name].state ? 1 : 0
                            : ladderCellContext.value[type][part.categ][part.name].state ? 0 : 1
                        : ladderCellContext.value[type][part.categ][part.name].state 
                            ? (
                                <div className='w-5 h-5 bg-white-primary border-1 border-black-primary p-[2px]'>
                                    <div className='w-full h-full bg-red-primary'></div>
                                </div>
                            )
                            : (
                                <div className='w-5 h-5 bg-white-primary border-1 border-black-primary'></div>
                            )
                }</p>
                {part.type === "contact" && (
                    <button
                        onClick={() => setPart({
                            ...part,
                        NOpened: !part.NOpened
                    })}
                    className='text-xs absolute bottom-1 left-1/2 -translate-x-1/2 font-cascadia cursor-pointer bg-red-primary px-1 rounded-sm text-white-primary transition-all duration-150'
                >{part.NOpened ? "NO" : "NC"}</button>
                )}
            </div>
        )}
        {!part && wired && (
            <div className='bg-black-primary h-[1px] w-full'></div>
        )}
        {!part && !wired && type !== "coil" && (
            <div className='border-t-1 border-dotted border-black-primary opacity-20 h-[1px] w-full'></div>
        )}
        {type !== "coil" && <div onClick={(e) => {e.stopPropagation(); setVWired(!vWired)}} className='absolute top-1/2 right-0 translate-x-1/2 w-3 z-10 h-full flex justify-center items-center'>
            <div className={clsx('h-full border-l-1 border-black-primary ', vWired ? 'border-solid opacity-100' : 'border-dotted opacity-20')}>
            </div>
        </div>}
    </div>
  )
}

export default DnDCanvas