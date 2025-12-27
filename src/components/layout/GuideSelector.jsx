import React from 'react'
import GuideButton from '../ui/GuideButton'

const GuideSelector = ({selected, setSelected}) => {
  return (
    <div className='w-80 bg-black-primary h-full px-4 py-5 flex flex-col gap-3 fixed'>
        <GuideButton href="#overview" selected={selected === "Overview"} onClick={() => setSelected("Overview")}>Overview</GuideButton>
        <GuideButton href="#simulation" selected={selected === "Simulation Mode"} onClick={() => setSelected("Simulation Mode")}>Simulation Mode</GuideButton>
        <GuideButton href="#explore" selected={selected === "Explore Mode"} onClick={() => setSelected("Explore Mode")}>Explore Mode</GuideButton>
        <GuideButton href="#plc-editor" selected={selected === "PLC Editor"} onClick={() => setSelected("PLC Editor")}>PLC Editor</GuideButton>
    </div>
  )
}

export default GuideSelector