import React from 'react'

const GuideSubHeading = ({children, ...props}) => {
  return (
    <h2 {...props} className='font-bold text-lg pt-3 text-peach-primary'>{children}</h2>
  )
}

export default GuideSubHeading