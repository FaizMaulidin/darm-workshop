import React from 'react'

const ToolBoxCell = ({children, color="white", justify="center"}) => {
  return (
    <div className={`flex whitespace-nowrap justify-${justify} ${justify === "start" ? "pl-1" : ""} items-center bg-${color}-primary ${color === "white" ? "text-black-primary" : "text-white-primary"}`}>{children}</div>
  )
}

export default ToolBoxCell