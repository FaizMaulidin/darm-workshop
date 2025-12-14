import React, { useEffect } from 'react'
import Button from '../components/ui/Button'
import { Link } from 'react-router-dom'
import Paragraph from '../components/ui/Paragraph'
import {useStatusContext} from '../hooks/StatusProvider'

const LandingPage = () => {
    const statusContext = useStatusContext()

    useEffect(() => {
        statusContext.setValue({
            status: {
                busy: false,
                gpOpened: false,
                capPresent: false,
                springPresent: false,
                pistonPresent: true,
                bodyPresent: true,
            }
        })
    }, [])
    
    return (
        <div className="flex justify-between items-center h-screen flex-col pt-28 pb-8 bg-black-primary">
            <div className='text-cream-primary h-64 w-1/2 rounded-full font-cascadia font-extralight text-9xl flex justify-center items-center text-center flex-col tracking-widest'>
                <h1 className='font-bold'>DARM</h1>
                <h1 className='text-2xl tracking-[0.8em]'>WORKSHOP</h1>
            </div>
            <div className='flex justify-center items-center gap-6'>
                <Link to="/simulation"><Button variant='primary' size='lg'>START SIMULATION</Button></Link>
                <Link to="/plc-editor"><Button variant='secondary' size='lg'>PLC EDITOR</Button></Link>
            </div>
            <div className='flex justify-center items-center w-1/2'>
                <Paragraph>Experience a new way to explore automation with our 3D assembly station, complete with an interactive PLC ladder editor. Build, simulate, and test your ideas in a realistic environment designed to bring industrial training to your fingertips.</Paragraph>
            </div>
        </div>
    )
}

export default LandingPage