import { useState } from 'react'
import SideMenu from './components/SideMenu'
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App-layout">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </div>
  )
}


export default App
