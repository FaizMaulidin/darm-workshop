import React, { useState } from 'react'
import ModelViewer from '../components/layout/ModelViewer'
import ExpandablePanel from '../components/layout/ExpandablePanel'
import Button from '../components/ui/Button'
import SubPanel from '../components/layout/SubPanel'
import {useModelContext}from '../hooks/ModelProvider'
import Paragraph from '../components/ui/Paragraph'

const SimulationPage = () => {
    const modelContext = useModelContext()
    const handlePartsMovement = modelContext?.current?.handlePartsMovement
    const [armStatus, setArmStatus] = useState("Home Position")
    const [mode, setMode] = useState("simulation")

    const handleClick = async(e, movement) => {
        handlePartsMovement?.armPosition?.setStatus(e.target.innerHTML)
        await movement
        setArmStatus(e.target.innerHTML)
    }

    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <ModelViewer modelPath="./assets/assembly-robot-trial2.glb" mode={mode}/>
            <div className='w-1/3 h-24 fixed z-50 bottom-6 right-1/2 translate-x-1/2 flex flex-col justify-center gap-2'>
                <Paragraph>Note: In explore mode, the cylinder parts cannot be gripped</Paragraph>
                <div className='bg-transparent grid grid-cols-2 gap-3'>
                    <Button variant={mode === "simulation" ? "primary" : "secondary"} size="md" onClick={() => setMode("simulation")}>SIMULATION MODE</Button>
                    <Button variant={mode === "explore" ? "primary" : "secondary"} size="md" onClick={() => setMode("explore")}>EXPLORE MODE</Button>
                </div>
            </div>
            {mode === "explore" && <ExpandablePanel heading="CONTROL PANEL">
                <SubPanel subHeading="Gripper">
                    <Button variant="control" size="control" onClick={handlePartsMovement?.openGripper(false)}>Open Gripper</Button>
                    <Button variant="control" size="control" onClick={() => handlePartsMovement?.closeGripper(false)}>Close Gripper</Button>
                </SubPanel>
                <SubPanel subHeading="Feeder">
                    <Button variant="control" size="control" onClick={() => handlePartsMovement?.feedCap()}>Feed Cap</Button>
                    <Button variant="control" size="control" onClick={() => handlePartsMovement?.feedSpring()}>Feed Spring Extend</Button>
                    <Button variant="control" size="control" onClick={() => handlePartsMovement?.unfeedSpring()}>Feed Spring Retract</Button>
                </SubPanel>
                <SubPanel subHeading="Arm Position">
                    <Button 
                        variant="control" 
                        size="control" 
                        onClick={(el) => handleClick(el, handlePartsMovement?.armPosition?.homePosition())} 
                        armStatus={armStatus}
                    >Home Position</Button>
                    <Button 
                        variant="control" 
                        size="control" 
                        onClick={(el) => handleClick(el, handlePartsMovement?.armPosition?.getBody())} 
                        armStatus={armStatus}
                    >Pick Body</Button>
                    <Button 
                        variant="control" 
                        size="control" 
                        onClick={(el) => handleClick(el, handlePartsMovement?.armPosition?.getPiston())} 
                        armStatus={armStatus}
                    >Pick Piston</Button>
                    <Button 
                        variant="control" 
                        size="control" 
                        onClick={(el) => handleClick(el, handlePartsMovement?.armPosition?.getSpring())}
                        armStatus={armStatus}
                    >Pick Spring</Button>
                    <Button 
                        variant="control" 
                        size="control" 
                        onClick={(el) => handleClick(el, handlePartsMovement?.armPosition?.getCap())}
                        armStatus={armStatus}
                    >Pick Cap</Button>
                </SubPanel>
                <SubPanel subHeading="Assembly Cycle">
                    <Button 
                        variant="control" 
                        size="control" 
                        onClick={(el) => handleClick(el, handlePartsMovement?.fullSimulation())} 
                        armStatus={armStatus}
                    >Assemble Body</Button>
                    <Button 
                        variant="control" 
                        size="control" 
                        onClick={(el) => handleClick(el, handlePartsMovement?.armPosition?.assemblePiston())} 
                        armStatus={armStatus}
                    >Assemble Piston</Button>
                    <Button 
                        variant="control" 
                        size="control" 
                        onClick={(el) => handleClick(el, handlePartsMovement?.armPosition?.assembleSpring())} 
                        armStatus={armStatus}
                    >Assemble Spring</Button>
                    <Button 
                        variant="control" 
                        size="control" 
                        onClick={(el) => handleClick(el, handlePartsMovement?.armPosition?.assembleCap())} 
                        armStatus={armStatus}
                    >Assemble Cap</Button>
                </SubPanel>
            </ExpandablePanel>}
        </div>
  )
}

export default SimulationPage