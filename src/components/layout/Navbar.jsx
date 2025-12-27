import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../ui/Button'

const Navbar = () => {
  return (
    <div className='fixed top-0 left-0 right-0 z-50 bg-black-primary shadow-lg text-red-primary flex justify-between items-center h-20 font-iceland px-20'>
        <div>
            LOGO
        </div>
        <div className='flex gap-16 text-lg'>
            <Link to="/"><Button variant="nav" size="sm">HOME</Button></Link>
            <Link to="/simulation"><Button variant="nav" size="sm">SIMULATION</Button></Link>
            <Link to="/plc-editor"><Button variant="nav" size="sm">PLC EDITOR</Button></Link>
            <Link to="/guide"><Button variant="nav" size="sm">DOCUMENTATION</Button></Link>
        </div>
    </div>
  )
}

export default Navbar