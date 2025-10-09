import React from 'react'

const Paragraph = ({children}) => {
  return (
    <div className='text-base text-red-primary flex justify-center items-start w-full font-iceland text-center tracking-wider'>{children}</div>
  )
}

export default Paragraph