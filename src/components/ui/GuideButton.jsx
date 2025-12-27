import clsx from 'clsx'
import React from 'react'

const GuideButton = ({children, selected, ...props}) => {
  return (
    <a {...props} className={clsx('font-iceland text-lg w-full text-left p-2 cursor-pointer transition-all duration-300 delay-150', selected ? " bg-white-primary translate-x-4 text-red-dark" : "bg-red-primary text-white-primary")}>{children}</a>
  )
}

export default GuideButton