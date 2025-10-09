import clsx from 'clsx'
import React from 'react'

const StatusBulb = ({state, name}) => {
  return (
    <div className='flex items-center gap-1 justify-center flex-col text-red-light text-xl font-iceland font-bold'>
        <div className={clsx(' rounded-full border-4 border-black-primary', state ? "shadow-bulb" : "")}>
            <div className={clsx('w-6 h-6 rounded-full', state ? "bg-[radial-gradient(circle_at_center,_var(--color-red-light),_var(--color-red-primary)_90%)]" : "bg-red-disable")}></div>
        </div>
        <p>{name}</p>
    </div>
  )
}

export default StatusBulb