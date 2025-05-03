import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import { Route, Router, Routes } from 'react-router-dom'
import MoodPage from './pages/MoodPage'
import TrackerPage from './pages/TrackerPage'
import ReflectionPage from './pages/ReflectionPage'
function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mood" element={<MoodPage />} />
        <Route path="/tracker" element={<TrackerPage />} />
        <Route path="/reflection" element={<ReflectionPage />} />
      </Routes>
    </Router>
  )
}

export default App
