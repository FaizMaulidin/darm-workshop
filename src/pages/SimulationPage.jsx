import React, { useEffect, useState } from 'react'
import ModelViewer from '../components/layout/ModelViewer'
import ExpandablePanel from '../components/layout/ExpandablePanel'
import Button from '../components/ui/Button'
import SubPanel from '../components/layout/SubPanel'
import {useModelContext}from '../hooks/ModelProvider'
import Paragraph from '../components/ui/Paragraph'
import StatusBulb from '../components/ui/StatusBulb'
import {useStatusContext} from '../hooks/StatusProvider'

const SimulationPage = () => {
    const modelContext = useModelContext()
    const statusContext = useStatusContext()
    const handlePartsMovement = modelContext?.current?.handlePartsMovement
    const [armStatus, setArmStatus] = useState("Home Position")
    const [mode, setMode] = useState("simulation")

    const handleClick = async(e, movement) => {
        if(!modelContext?.current?.status?.busy) {
            await movement()
            setArmStatus(e.target.innerHTML)
        }
    }

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
    }, [mode])

    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <ModelViewer modelPath="./assets/assembly-robot-trial2.glb" mode={mode}/>
            <div className='w-1/3 h-20 fixed z-50 bottom-6 right-1/2 translate-x-1/2 flex flex-col justify-center gap-2'>
                <Paragraph>Note: In explore mode, the cylinder parts cannot be gripped</Paragraph>
                <div className='bg-transparent grid grid-cols-2 gap-3'>
                    <Button variant={mode === "simulation" ? "primary" : "secondary"} size="md" onClick={() => setMode("simulation")}>SIMULATION MODE</Button>
                    <Button variant={mode === "explore" ? "primary" : "secondary"} size="md" onClick={() => setMode("explore")}>EXPLORE MODE</Button>
                </div>
            </div>
            {mode === "explore" && <ExpandablePanel heading="CONTROL PANEL">
                <SubPanel subHeading="Gripper">
                    <Button variant="control" size="control" onClick={() => handlePartsMovement?.openGripper(false, "explore")}>Open Gripper</Button>
                    <Button variant="control" size="control" onClick={() => handlePartsMovement?.closeGripper("explore")}>Close Gripper</Button>
                </SubPanel>
                <SubPanel subHeading="Magazine">
                    <Button variant="control" size="control" onClick={() => {if(!modelContext?.current?.status?.busy)handlePartsMovement?.feedCap(true)}}>Feed Cap</Button>
                    <Button variant="control" size="control" onClick={() => {if(!modelContext?.current?.status?.busy && !modelContext?.current?.partsRef.fsExtended)handlePartsMovement?.feedSpring(true)}}>Spring Mag Extend</Button>
                    <Button variant="control" size="control" onClick={() => {if(!modelContext?.current?.status?.busy && modelContext?.current?.partsRef.fsExtended)handlePartsMovement?.unfeedSpring(true)}}>Spring Mag Retract</Button>
                </SubPanel>
                <SubPanel subHeading="Arm Position">
                    <Button 
                        variant="control" 
                        size="control" 
                        onClick={(el) => handleClick(el, handlePartsMovement?.armPosition?.homePosition)} 
                        // armStatus={armStatus}
                    >Home Position</Button>
                    <Button 
                        variant="control" 
                        size="control" 
                        onClick={(el) => handleClick(el, handlePartsMovement?.armPosition?.getBody)} 
                        // armStatus={armStatus}
                    >Pick Body</Button>
                    <Button 
                        variant="control" 
                        size="control" 
                        onClick={(el) => handleClick(el, handlePartsMovement?.armPosition?.getPiston)} 
                        // armStatus={armStatus}
                    >Pick Piston</Button>
                    <Button 
                        variant="control" 
                        size="control" 
                        onClick={(el) => handleClick(el, handlePartsMovement?.armPosition?.getSpring)}
                        // armStatus={armStatus}
                    >Pick Spring</Button>
                    <Button 
                        variant="control" 
                        size="control" 
                        onClick={(el) => handleClick(el, handlePartsMovement?.armPosition?.getCap)}
                        // armStatus={armStatus}
                    >Pick Cap</Button>
                </SubPanel>
                <SubPanel subHeading="Assembly Cycle">
                    <Button 
                        variant="control" 
                        size="control" 
                        onClick={(el) => handleClick(el, () => handlePartsMovement?.armPosition?.assembleBody("explore"))} 
                        // armStatus={armStatus}
                    >Assemble Body</Button>
                    <Button 
                        variant="control" 
                        size="control" 
                        onClick={(el) => handleClick(el, () => handlePartsMovement?.armPosition?.assemblePiston("explore"))} 
                        // armStatus={armStatus}
                    >Assemble Piston/Spring</Button>
                    <Button 
                        variant="control" 
                        size="control" 
                        onClick={(el) => handleClick(el, () => handlePartsMovement?.armPosition?.assembleCap("explore"))} 
                        // armStatus={armStatus}
                    >Assemble Cap & Send Cylinder</Button>
                </SubPanel>
            </ExpandablePanel>}
            <ExpandablePanel position="left" heading="STATUS PANEL">
                <div className='grid grid-cols-2 w-full gap-6 mt-4'>
                    <StatusBulb state={statusContext?.value?.status?.busy} name="Arm Busy"/>
                    <StatusBulb state={statusContext?.value?.status?.gpOpened} name="Gripper Opened"/>
                    <StatusBulb state={statusContext?.value?.status?.bodyPresent} name="Body Present"/>
                    <StatusBulb state={statusContext?.value?.status?.pistonPresent} name="Piston Present"/>
                    <StatusBulb state={statusContext?.value?.status?.springPresent} name="Spring Present"/>
                    <StatusBulb state={statusContext?.value?.status?.capPresent} name="Cap Present"/>
                </div>
            </ExpandablePanel>
        </div>
  )
}

export default SimulationPage