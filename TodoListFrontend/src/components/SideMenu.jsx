import { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInbox, faClockRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { faUser, faCalendar } from '@fortawesome/free-regular-svg-icons'

import './SideMenu.css'

function SideMenu({ userData }) {
  let userName = userData.name

  return (
    
    <div className="sidebar">
      <div className="user-profile">
        <div className="avatar-container">
          <FontAwesomeIcon icon={faUser} />
        </div>
        <h2 className="user-name">{userName}</h2>
      </div>

      <nav className="nav-menu">
        <a href="#" className="menu-item active">
          <FontAwesomeIcon icon={faInbox} />
          <span className="menu-text">All tasks</span>
        </a>

        <a href="#" className="menu-item">
          <FontAwesomeIcon icon={faCalendar} />
          <span className="menu-text">Today</span>
        </a>

        <a href="#" className="menu-item">
          <FontAwesomeIcon icon={faClockRotateLeft} />
          <span className="menu-text">History</span>
        </a>
      </nav>
    </div>
  )
}

export default SideMenu