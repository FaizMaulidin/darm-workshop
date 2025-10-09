import React from 'react'
import clsx from 'clsx'

const LadderTH = ({children, type="contact"}) => {
    const typeClass = {
        "contact": "bg-red-primary",
        "coil": "bg-blue-primary",
    }
  return (
    <div className={clsx('font-cascadia text-xs px-2 py-1 text-white-primary border-1 border-white-primary', typeClass[type])}>{children}</div>
  )
}

export default LadderTH