import React, { useState } from 'react'
import ModelViewer from '../components/layout/ModelViewer'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Heading from '../components/ui/Heading'
import LadderTH from '../components/ui/LadderTH'
import DnDCanvas from '../components/layout/DnDCanvas'
import DraggableItem from '../components/ui/DraggableItem'
import TBExpandable from '../components/layout/TBExpandable'
import ToolBoxCell from '../components/ui/ToolBoxCell'
import { useLadderCellContext } from '../hooks/LadderCellProvider'
import RunSimulation from '../components/ui/RunSimulation'

const PLCeditor = () => {
  const ladderCellContext = useLadderCellContext()
  const {contact, coil} = ladderCellContext.value
  const [running, setRunning] = useState(false)

  return (
    <DndProvider backend={HTML5Backend}>
        <div className='flex justify-between h-screen w-full max-w-screen items-end'>
            <div className="w-1/2 h-screen">
                <ModelViewer modelPath="./assets/assembly-robot-trial2.glb" mode="editor"/>
            </div>
            <div className="w-5/6 h-[calc(100%-5rem)] bg-cream-primary pb-4 pt-2 gap-2 px-4 flex justify-between flex-col">
              <Heading variant="secondary">PLC LADDER EDITOR</Heading>
              <div className='flex flex-grow bg-white-primary w-full flex-col overflow-hidden'>
                <div className='w-full flex pr-[6px]'>
                  <div className=' font-cascadia text-xs flex justify-center items-center w-8 py-1 bg-peach-primary border-1 border-white-primary text-white-primary'>
                    No
                  </div>
                  <div className='w-full grid h-5 grid-cols-6'>
                    <LadderTH>Contact 1</LadderTH>
                    <LadderTH>Contact 2</LadderTH>
                    <LadderTH>Contact 3</LadderTH>
                    <LadderTH>Contact 4</LadderTH>
                    <LadderTH>Contact 5</LadderTH>
                    <LadderTH type="coil">Coil</LadderTH>
                  </div>
                </div>
                <div className='w-full flex-grow bg-white-primary overflow-y-auto flex'>
                  <div className='grid grid-cols-1 grid-rows-[repeat(auto-fill,minmax(50px,1fr))] auto-rows-[minmax(50px,1fr)]'>
                    {Array.from({length: 20}).map((_, index) => {
                      return <div key={index} className=' h-[50px] flex justify-center items-center font-cascadia text-xs w-8 border-b-2 border-x-1 border-white-primary bg-peach-primary text-white-primary'>{index + 1}</div>
                    })}
                  </div>
                  <div className='grid grid-cols-6 px-[1px] gap-x-[1px] grid-rows-[repeat(auto-fill,minmax(50px,1fr))] auto-rows-[minmax(50px,1fr)] flex-grow'>
                    {Array.from({length: 120}).map((_, index) => {
                      if(index % 6 === 5) {
                        return <DnDCanvas key={index} running={running} index={index} type="coil"/>
                      }
                      return <DnDCanvas key={index} running={running} index={index}/>
                    })}
                  </div>
                </div>
                <div className='w-full flex items-center bg-red-dark h-20 px-10 justify-between text-white font-cascadia text-xs'>
                  <div className='flex gap-3 items-center'>
                    <div>Toolbox: </div>
                    <TBExpandable title="Inputs">
                      <ToolBoxCell color='black'>No</ToolBoxCell>
                      <ToolBoxCell color='red'></ToolBoxCell>
                      <ToolBoxCell color='black'>Notes</ToolBoxCell>
                      <ToolBoxCell>01</ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={contact.inputs.I1}>I1</DraggableItem></ToolBoxCell>
                      <ToolBoxCell justify='start'>Arm Busy</ToolBoxCell>
                      <ToolBoxCell>02</ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={contact.inputs.I2}>I2</DraggableItem></ToolBoxCell>
                      <ToolBoxCell justify='start'>Gripper Opened</ToolBoxCell>
                      <ToolBoxCell>03</ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={contact.inputs.I3}>I3</DraggableItem></ToolBoxCell>
                      <ToolBoxCell justify='start'>Body Present</ToolBoxCell>
                      <ToolBoxCell>04</ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={contact.inputs.I4}>I4</DraggableItem></ToolBoxCell>
                      <ToolBoxCell justify='start'>Piston Present</ToolBoxCell>
                      <ToolBoxCell>05</ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={contact.inputs.I5}>I5</DraggableItem></ToolBoxCell>
                      <ToolBoxCell justify='start'>Spring Present</ToolBoxCell>
                      <ToolBoxCell>06</ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={contact.inputs.I6}>I6</DraggableItem></ToolBoxCell>
                      <ToolBoxCell justify='start'>Cap Present</ToolBoxCell>
                    </TBExpandable>
                    <TBExpandable title="Outputs">
                      <ToolBoxCell color='black'>No</ToolBoxCell>
                      <ToolBoxCell color='red'></ToolBoxCell>
                      <ToolBoxCell color='blue'></ToolBoxCell>
                      <ToolBoxCell color='blue'></ToolBoxCell>
                      <ToolBoxCell color='black'>Notes</ToolBoxCell>
                      <ToolBoxCell>01</ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={contact.outputs.Q1}>Q1</DraggableItem></ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={coil.outputs.Q1}>{"["}</DraggableItem></ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={coil.outputs.RQ1}>R</DraggableItem></ToolBoxCell>
                      <ToolBoxCell justify='start'>Arm Movements_Q0</ToolBoxCell>
                      <ToolBoxCell>02</ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={contact.outputs.Q2}>Q2</DraggableItem></ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={coil.outputs.Q2}>{"["}</DraggableItem></ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={coil.outputs.RQ2}>R</DraggableItem></ToolBoxCell>
                      <ToolBoxCell justify='start'>Arm Movements_Q1</ToolBoxCell>
                      <ToolBoxCell>03</ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={contact.outputs.Q3}>Q3</DraggableItem></ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={coil.outputs.Q3}>{"["}</DraggableItem></ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={coil.outputs.RQ3}>R</DraggableItem></ToolBoxCell>
                      <ToolBoxCell justify='start'>Arm Movements_Q2</ToolBoxCell>
                      <ToolBoxCell>04</ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={contact.outputs.Q4}>Q4</DraggableItem></ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={coil.outputs.Q4}>{"["}</DraggableItem></ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={coil.outputs.RQ4}>R</DraggableItem></ToolBoxCell>
                      <ToolBoxCell justify='start'>Gripper</ToolBoxCell>
                      <ToolBoxCell>05</ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={contact.outputs.Q5}>Q5</DraggableItem></ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={coil.outputs.Q5}>{"["}</DraggableItem></ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={coil.outputs.RQ5}>R</DraggableItem></ToolBoxCell>
                      <ToolBoxCell justify='start'>Spring Mag Extend</ToolBoxCell>
                      <ToolBoxCell>06</ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={contact.outputs.Q6}>Q6</DraggableItem></ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={coil.outputs.Q6}>{"["}</DraggableItem></ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={coil.outputs.RQ6}>R</DraggableItem></ToolBoxCell>
                      <ToolBoxCell justify='start'>Spring Mag Retract</ToolBoxCell>
                      <ToolBoxCell>07</ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={contact.outputs.Q7}>Q7</DraggableItem></ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={coil.outputs.Q7}>{"["}</DraggableItem></ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={coil.outputs.RQ7}>R</DraggableItem></ToolBoxCell>
                      <ToolBoxCell justify='start'>Feed Cap</ToolBoxCell>
                    </TBExpandable>
                    <TBExpandable title="Memory">
                      <ToolBoxCell color='black'>No</ToolBoxCell>
                      <ToolBoxCell color='red'></ToolBoxCell>
                      <ToolBoxCell color='blue'></ToolBoxCell>
                      <ToolBoxCell color='blue'></ToolBoxCell>
                      <ToolBoxCell>01</ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={contact.memory.M1}>M1</DraggableItem></ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={coil.memory.M1}>{"["}</DraggableItem></ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={coil.memory.RM1}>R</DraggableItem></ToolBoxCell>
                      <ToolBoxCell>02</ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={contact.memory.M2}>M2</DraggableItem></ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={coil.memory.M2}>{"["}</DraggableItem></ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={coil.memory.RM2}>R</DraggableItem></ToolBoxCell>
                      <ToolBoxCell>03</ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={contact.memory.M3}>M3</DraggableItem></ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={coil.memory.M3}>{"["}</DraggableItem></ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={coil.memory.RM3}>R</DraggableItem></ToolBoxCell>
                      <ToolBoxCell>04</ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={contact.memory.M4}>M4</DraggableItem></ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={coil.memory.M4}>{"["}</DraggableItem></ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={coil.memory.RM4}>R</DraggableItem></ToolBoxCell>
                      <ToolBoxCell>05</ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={contact.memory.M5}>M5</DraggableItem></ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={coil.memory.M5}>{"["}</DraggableItem></ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={coil.memory.RM5}>R</DraggableItem></ToolBoxCell>
                      <ToolBoxCell>06</ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={contact.memory.M6}>M6</DraggableItem></ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={coil.memory.M6}>{"["}</DraggableItem></ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={coil.memory.RM6}>R</DraggableItem></ToolBoxCell>
                      <ToolBoxCell>07</ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={contact.memory.M7}>M7</DraggableItem></ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={coil.memory.M7}>{"["}</DraggableItem></ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={coil.memory.RM7}>R</DraggableItem></ToolBoxCell>
                      <ToolBoxCell>08</ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={contact.memory.M8}>M8</DraggableItem></ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={coil.memory.M8}>{"["}</DraggableItem></ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={coil.memory.RM8}>R</DraggableItem></ToolBoxCell>
                      <ToolBoxCell>09</ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={contact.memory.M9}>M9</DraggableItem></ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={coil.memory.M9}>{"["}</DraggableItem></ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={coil.memory.RM9}>R</DraggableItem></ToolBoxCell>
                      <ToolBoxCell>10</ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={contact.memory.MA}>MA</DraggableItem></ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={coil.memory.MA}>{"["}</DraggableItem></ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={coil.memory.RMA}>R</DraggableItem></ToolBoxCell>
                      <ToolBoxCell>11</ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={contact.memory.MB}>MB</DraggableItem></ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={coil.memory.MB}>{"["}</DraggableItem></ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={coil.memory.RMB}>R</DraggableItem></ToolBoxCell>
                      <ToolBoxCell>12</ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={contact.memory.MC}>MC</DraggableItem></ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={coil.memory.MC}>{"["}</DraggableItem></ToolBoxCell>
                      <ToolBoxCell><DraggableItem ladderCell={coil.memory.RMC}>R</DraggableItem></ToolBoxCell>
                    </TBExpandable>
                  </div>
                  <RunSimulation running={running} setRunning={setRunning}/>
                </div>
              </div>
            </div>
        </div>
    </DndProvider>
  )
}

export default PLCeditor