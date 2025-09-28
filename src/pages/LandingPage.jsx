import React from 'react'
import Button from '../components/ui/Button'
import { Link } from 'react-router-dom'

const LandingPage = () => {
    return (
        <div className="flex justify-center items-center h-screen gap-6 bg-black-primary">
            <Link to="/simulation"><Button variant='primary' size='lg'>START SIMULATION</Button></Link>
            <Link to="/plc-editor"><Button variant='secondary' size='lg'>PLC EDITOR</Button></Link>
        </div>
    )
}

export default LandingPage