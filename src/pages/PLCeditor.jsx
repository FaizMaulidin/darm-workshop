import React, { useEffect, useRef, useState } from 'react'
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileArrowUp, faDownload, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useLadderDataContext } from '../hooks/LadderDataProvider'
import clsx from 'clsx'
import Button from '../components/ui/Button'

const PLCeditor = () => {
  const ladderCellContext = useLadderCellContext()
  const {contact, coil} = ladderCellContext.value
  const [running, setRunning] = useState(false)
  const ladderDataContext = useLadderDataContext()
  const fileInputRef = useRef(null)
  const [showModal, setShowModal] = useState(false)

  function exportLadder(ladder) {
    const blob = new Blob([JSON.stringify(ladder, null, 2)], {
      type: "application/json",   // Content stays JSON
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ladder.darm";  // your custom extension
    a.click();
    URL.revokeObjectURL(url);
  }

  const importLadder = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        const validateData = typeof data === "object" && Array.isArray(data.horizontal) && Array.isArray(data.vertical)
        if(!validateData) throw new Error("Invalid darm file")
        ladderDataContext.setValue(data);
        localStorage.setItem("ladderData", JSON.stringify(data));
      } catch (err) {
        alert("Invalid darm file");
        console.log(err)
      }
    };

    reader.readAsText(file);
  };

  useEffect(() => {
    fileInputRef.current.value = ""
  }, [ladderDataContext.value])

  const resetLadder = () => {
    const horizontal = ladderDataContext.value.horizontal.map(item => {
      if(item) return null
      return item
    })
    const vertical = ladderDataContext.value.vertical.map(item => {
      if(item) return null
      return item
    })
    ladderDataContext.setValue({horizontal, vertical})
    localStorage.setItem("ladderData", JSON.stringify({horizontal, vertical}));
    setShowModal(false)
  }

  return (
    <DndProvider backend={HTML5Backend}>
        <div className='flex justify-between h-screen w-full max-w-screen items-end'>
            <div className="w-1/2 h-screen">
                <ModelViewer modelPath="./assets/assembly-robot-trial2.glb" mode="editor"/>
            </div>
            <div className="w-5/6 h-[calc(100%-5rem)] bg-cream-primary pb-4 pt-2 gap-2 px-4 flex justify-between flex-col">
              <div className='flex items-center justify-between'>
                <Heading variant="secondary">PLC LADDER EDITOR</Heading>
                <div className='flex gap-2 text-xl text-cream-primary'>
                  <button title='Reset Ladder' onClick={() => setShowModal(true)} className='bg-red-primary px-3 py-1 rounded-sm hover:cursor-pointer hover:bg-red-dark hover:text-white-primary transition-all duration-150'><FontAwesomeIcon icon={faTrash}/></button>
                  <button title='Import from File' onClick={() => fileInputRef.current.click()} className='bg-red-primary px-3 py-1 rounded-sm hover:cursor-pointer hover:bg-red-dark hover:text-white-primary transition-all duration-150'><FontAwesomeIcon icon={faFileArrowUp}/></button>
                  <button title='Download Ladder' onClick={() => exportLadder(ladderDataContext.value)} className='bg-red-primary px-3 py-1 rounded-sm hover:cursor-pointer hover:bg-red-dark hover:text-white-primary transition-all duration-150'><FontAwesomeIcon icon={faDownload}/></button>
                  <input
                    type="file"
                    accept=".darm"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={(e) => importLadder(e)}
                  />
                </div>
              </div>
              <div className='flex flex-grow bg-white-primary w-full flex-col overflow-hidden relative'>
                <div className={clsx('w-full h-full absolute flex justify-center items-center z-40 bg-[rgba(0,0,0,0.5)] ', showModal ? 'visible' : 'invisible')}>
                  <div className='w-80 gap-6 bg-cream-primary flex flex-col items-center justify-between p-4 border-2 border-black-primary font-cascadia text-xs'>
                    <p>Are you sure you want to reset the ladder? Any unsaved progress will be lost.</p>
                    <div className='flex gap-2 text-white-primary pt-2 border-t-1 w-full justify-end border-red-primary'>
                      <button onClick={() => resetLadder()} className='bg-red-primary px-3 py-1 rounded-xs hover:cursor-pointer hover:bg-red-dark transition-all duration-150'>Reset</button>
                      <button onClick={() => setShowModal(false)} className='bg-cream-primary px-3 py-1 rounded-xs text-red-primary hover:cursor-pointer hover:bg-red-dark hover:text-white-primary transition-all duration-150 inset-ring-2 inset-ring-red-primary hover:inset-ring-red-dark'>Cancel</button>
                    </div>
                  </div>
                </div>
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
                    {Array.from({length: 100}).map((_, index) => {
                      return <div key={index} className=' h-[50px] flex justify-center items-center font-cascadia text-xs w-8 border-b-2 border-x-1 border-white-primary bg-peach-primary text-white-primary'>{index + 1}</div>
                    })}
                  </div>
                  <div className='grid grid-cols-6 px-[1px] gap-x-[1px] grid-rows-[repeat(auto-fill,minmax(50px,1fr))] auto-rows-[minmax(50px,1fr)] flex-grow'>
                    {Array.from({length: 600}).map((_, index) => {
                      if(index % 6 === 5) {
                        return <DnDCanvas key={index} running={running} index={index} type="coil"/>
                      }
                      return <DnDCanvas key={index} running={running} index={index}/>
                    })}
                      
                  </div>
                </div>
                <div className='w-full flex items-center bg-red-dark h-20 px-10 py-3 justify-between text-white font-cascadia text-xs'>
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