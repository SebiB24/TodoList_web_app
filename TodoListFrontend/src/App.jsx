import { useState } from 'react'
import SideMenu from './components/SideMenu'
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'


function App() {
  const [userData, setUserData] = useState(() => {
    const storedUserData = localStorage.getItem('userData')
    if (storedUserData) {
      return JSON.parse(storedUserData)
    }
    return {
      name: '',
      email: '',
      type: '',
      score: 0
    }
  })
  
  return (
    <div className="App-layout">
      <Routes>
        <Route path="/" element={<LoginPage onloginSuccess={setUserData}/>} />
        <Route path="/login" element={<LoginPage onloginSuccess={setUserData}/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/home" element={<HomePage userData={userData} />} />
      </Routes>
    </div>
  )
}


export default App
