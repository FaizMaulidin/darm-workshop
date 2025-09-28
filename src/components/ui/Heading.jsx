import React from 'react'

const Heading = ({children}) => {
  return (
    <div className='text-4xl font-bold text-green-primary tracking-widest flex justify-center items-start w-full '>{children}</div>
  )
}

export default Heading