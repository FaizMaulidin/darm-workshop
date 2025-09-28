import './App.css'
import {Routes, Route, Link } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Navbar from './components/layout/Navbar'
import SimulationPage from './pages/SimulationPage'
import ModelProvider from './hooks/ModelProvider'

function App() {

  return (
    <>
      <Navbar />
      <ModelProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/simulation" element={<SimulationPage/>} />
        </Routes>
      </ModelProvider>
    </>
  )
}

export default App
