import clsx from 'clsx'
import React from 'react'

const Heading = ({children, variant = "primary"}) => {

  const variantClass = {
    "primary": "text-green-primary justify-center",
    "secondary": "text-red-primary font-iceland justify-start",
  }
  
  return (
    <div className={clsx('text-4xl font-bold tracking-widest flex items-start w-full ', variantClass[variant])}>{children}</div>
  )
}

export default Heading