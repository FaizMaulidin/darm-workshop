import React from 'react'

const GuideHyperlink = ({children, ...props}) => {
  return (
    <a {...props}><b className='text-blue-primary cursor-pointer underline'>
        {children}
    </b></a>
  )
}

export default GuideHyperlink