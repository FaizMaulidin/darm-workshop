import React from 'react'
import Button from '../ui/Button'
import Heading from '../ui/Heading'

const ExpandablePanel = ({children, heading}) => {
  return (
    <div className='bg-transparent h-[calc(100vh-5rem)] fixed z-50 top-20 right-0 w-1/3 p-6 font-iceland text-black'>
        <div className='bg-[radial-gradient(circle,_rgba(0,0,0,0.6)_2px,_rgba(0,0,0,0.4)_1px)] [background-size:20px_20px]
        
        h-full w-full flex justify-start items-center border-4 border-[rgba(0,0,0,0.5)] flex-col px-4 py-3 gap-4 overflow-y-auto
        '>
            <Heading>{heading}</Heading>
            {children}
        </div>
    </div>
  )
}

export default ExpandablePanel