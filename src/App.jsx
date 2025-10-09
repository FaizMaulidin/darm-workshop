import './App.css'
import {Routes, Route, Link } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Navbar from './components/layout/Navbar'
import SimulationPage from './pages/SimulationPage'
import ModelProvider from './hooks/ModelProvider'
import StatusProvider from './hooks/StatusProvider'
import PLCeditor from './pages/PLCeditor'
import LadderCellProvider from './hooks/LadderCellProvider'

function App() {

  return (
    <>
      <Navbar />
      <StatusProvider>
        <ModelProvider>
          <LadderCellProvider>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/simulation" element={<SimulationPage/>} />
              <Route path="/plc-editor" element={<PLCeditor/>} />
            </Routes>
          </LadderCellProvider>
        </ModelProvider>
      </StatusProvider>
    </>
  )
}

export default App
