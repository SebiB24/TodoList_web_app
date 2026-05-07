import { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInbox, faClockRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { faUser, faCalendar } from '@fortawesome/free-regular-svg-icons'
import { TaskStatus } from '../models/Task'

import './SideMenu.css'

function SideMenu({ userData, changeFilters, setShowUserProfile }) {
  let userName = userData.name

  const[activeButton, setActiveButton] = useState('all')


  const handleAllTasksClick = () => {
    setActiveButton('all')
    changeFilters({
      status: TaskStatus.TODO,
      today: false
    })
  }

  const handleTodayClick = () => {
    setActiveButton('today')
    changeFilters({
      status: TaskStatus.TODO,
      today: true
    })
  }

  const handleHistoryClick = () => {
    setActiveButton('history')
    changeFilters({
      status: TaskStatus.COMPLETE,
      today: false
    })
  }

  return (

    <div className="sidebar">
      <div className="user-profile" onClick={() => setShowUserProfile(true)}>
        <div className="avatar-container">
          <FontAwesomeIcon icon={faUser} />
        </div>
        <h2 className="user-name">{userName}</h2>
      </div>

      <nav className="nav-menu">
        <label onClick={handleAllTasksClick} className={`menu-item ${activeButton === 'all' ? 'active' : ''}`}>
          <FontAwesomeIcon icon={faInbox} />
          <span className="menu-text">All tasks</span>
        </label>

        <label onClick={handleTodayClick} className={`menu-item ${activeButton === 'today' ? 'active' : ''}`}>
          <FontAwesomeIcon icon={faCalendar} />
          <span className="menu-text">Today</span>
        </label>

        <label onClick={handleHistoryClick} className={`menu-item ${activeButton === 'history' ? 'active' : ''}`}>
          <FontAwesomeIcon icon={faClockRotateLeft} />
          <span className="menu-text">History</span>
        </label>
      </nav>
    </div>
  )
}

export default SideMenu