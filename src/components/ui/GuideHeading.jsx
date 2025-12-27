import React from 'react'

const GuideHeading = ({children, ...props}) => {
  return (
    <h1 {...props} className='font-iceland text-4xl font-semibold tracking-wider border-b-3 border-red-primary text-red-primary pt-4 sticky top-0 bg-white-primary'>{children}</h1>
  )
}

export default GuideHeading