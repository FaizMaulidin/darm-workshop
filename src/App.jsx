import './App.css'
import {Routes, Route, Link } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Navbar from './components/layout/Navbar'
import SimulationPage from './pages/SimulationPage'
import ModelProvider from './hooks/ModelProvider'
import StatusProvider from './hooks/StatusProvider'
import PLCeditor from './pages/PLCeditor'
import LadderCellProvider from './hooks/LadderCellProvider'
import LadderDataProvider from './hooks/LadderDataProvider'
import { useState, useEffect } from 'react'

function useMinWidth(breakpoint = 1200) {
  const [isWide, setIsWide] = useState(window.innerWidth >= breakpoint);

  useEffect(() => {
    const handleResize = () => {
      setIsWide(window.innerWidth >= breakpoint);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isWide;
}

function App() {

  const isWideEnough = useMinWidth(1024);

  return isWideEnough ? (
    <>
      <Navbar />
      <StatusProvider>
        <ModelProvider>
          <LadderDataProvider>
            <LadderCellProvider>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/simulation" element={<SimulationPage/>} />
                <Route path="/plc-editor" element={<PLCeditor/>} />
              </Routes>
            </LadderCellProvider>
          </LadderDataProvider>
        </ModelProvider>
      </StatusProvider>
    </>
  ) : (
    <div className='w-full h-[100vh] flex justify-center items-center bg-black-primary text-red-primary'>
      <p className='text-lg font-cascadia text-center w-3/4'>This app is only available on desktop screens (≥1024px).  
        <br/>Please use a wider screen to continue.</p>
    </div>
  )
}

export default App
