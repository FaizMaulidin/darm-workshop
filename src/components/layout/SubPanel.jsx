import React from 'react'
import SubHeading from '../ui/SubHeading'

const SubPanel = ({children, subHeading}) => {
  return (
    <div className='flex flex-col gap-2 justify-start items-start w-full'>
        <SubHeading>{subHeading}</SubHeading>
        <div className='flex gap-2 justify-start items-start w-full flex-wrap'>
            {children}
        </div>
    </div>
  )
}

export default SubPanel