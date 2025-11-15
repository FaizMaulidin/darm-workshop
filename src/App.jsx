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

function App() {

  return (
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
  )
}

export default App
