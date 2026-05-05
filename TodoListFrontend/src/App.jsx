import { useState } from 'react'
import SideMenu from './components/SideMenu'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <SideMenu />
    </div>
  )
}


export default App
