import React, { useState } from 'react'
import Heading from '../ui/Heading'
import Button from '../ui/Button'
import clsx from 'clsx'

const ExpandablePanel = ({children, heading, position="right"}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className={clsx('bg-transparent h-fit fixed z-50 top-20 w-fit p-6 font-iceland text-black flex justify-end items-start gap-2', position === "right" ? "right-0" : "left-0")}>
        {position === "right" && <Button variant='secondary' addClass='rounded-l-lg' size='sm' onClick={() => setIsExpanded(!isExpanded)}>{isExpanded ? ">>" : "<<"}</Button>}
        {isExpanded &&
          <div className='bg-[radial-gradient(circle,_rgba(0,0,0,0.6)_2px,_rgba(0,0,0,0.4)_1px)] [background-size:20px_20px] h-[calc(100vh-8rem)] w-96 flex justify-start items-center border-4 border-[rgba(0,0,0,0.5)] flex-col px-4 py-3 gap-4 overflow-y-auto transition-all duration-300'>
              <Heading>{heading}</Heading>
              {children}
          </div>
        }
        {position === "left" && <Button variant='secondary' addClass='rounded-r-lg' size='sm' onClick={() => setIsExpanded(!isExpanded)}>{isExpanded ? "<<" : ">>"}</Button>}
    </div>
  )
}

export default ExpandablePanel