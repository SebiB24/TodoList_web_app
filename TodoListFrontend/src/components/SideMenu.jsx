import { useEffect, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInbox, faClockRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { faUser, faCalendar } from '@fortawesome/free-regular-svg-icons'
import { TaskStatus } from '../models/Task'

import './SideMenu.css'
import ApiService from '../api/ApiService'
import { UserType } from '../models/User'
import { User } from '../models/User'

function SideMenu({ userData, setUserData, changeFilters, setShowUserProfile, setShowAdmin }) {

  const [activeButton, setActiveButton] = useState('all')

  const handleAllTasksClick = () => {
    setShowAdmin(false);
    setActiveButton('all')
    changeFilters({
      status: TaskStatus.TODO,
      today: false
    })
  }

  const handleTodayClick = () => {
    setShowAdmin(false);
    setActiveButton('today')
    changeFilters({
      status: TaskStatus.TODO,
      today: true
    })
  }

  const handleHistoryClick = () => {
    setShowAdmin(false);
    setActiveButton('history')
    changeFilters({
      status: TaskStatus.COMPLETE,
      today: false
    })
  }

  const handleProfileClick = async () => {
    try {
      const response = await ApiService.updateUserData();
      const newData = new User(
        response.name,
        response.email,
        response.userType,
        response.score
      )
      setUserData(newData);
      setShowUserProfile(true);
    } catch (error) {
      console.error("Update user data error:" + error)
    }
  }

  const handleUsersClick = () => {
    setActiveButton('users');
    setShowAdmin(true);
  }

  return (

    <div className="sidebar">
      <div className="user-profile" onClick={handleProfileClick}>
        <div className="avatar-container">
          <FontAwesomeIcon icon={faUser} />
        </div>
        <h2 className="user-name">{userData.name}</h2>
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

        {userData.type == UserType.ADMIN &&
          <label onClick={handleUsersClick} className={`menu-item ${activeButton === 'users' ? 'active' : ''}`}>
            <FontAwesomeIcon icon={faUser} />
            <span className="menu-text">Users</span>
          </label>
        }
      </nav>
    </div>
  )
}

export default SideMenu