import React from 'react'

const SubHeading = ({children}) => {
  return (
    <div className='text-lg border-b-2 border-red-dark font-bold text-red-primary tracking-widest flex justify-start items-start w-full '>{children}</div>
  )
}

export default SubHeading