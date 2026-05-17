import SideMenu from "../components/SideMenu"
import TaskList from "../components/TaskList"
import "./HomePage.css"
import { useState, useEffect, useRef } from "react"
import { Task, TaskStatus } from "../models/Task"
import { AddTaskButton, AddTaskForm } from "../components/AddTask"
import UserProfile from "../components/UserProfile"
import { UserList } from "../components/UserList"

function HomePage({ userData, setUserData }) {

  const [listFilters, setListFilters] = useState({
    status: TaskStatus.TODO,
    today: false
  })
  const [showCreateTaskForm, setShowCreateTaskForm] = useState(false)
  const [showUserProfile, setShowUserProfile] = useState(false)
  const [update, setUpdate] = useState(false)
  const [showAdmin, setShowAdmin] = useState(false)


  const formRef = useRef(null)
  const profileRef = useRef(null)


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowCreateTaskForm(false)
      }
    }
    if (showCreateTaskForm) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showCreateTaskForm])


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowUserProfile(false)
      }
    }
    if (showUserProfile) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showUserProfile])


  return (
    <div className="home-page-layout">
      <SideMenu userData={userData} setUserData={setUserData} changeFilters={setListFilters} setShowUserProfile={setShowUserProfile} setShowAdmin={setShowAdmin} />
      <div className="main-content">
        {showAdmin ? (
          <UserList></UserList>
        ) : (
          <>
            <TaskList filters={listFilters} update={update} setUpdate={setUpdate} />
            {!showCreateTaskForm &&
              <AddTaskButton onClick={() => setShowCreateTaskForm(true)} />
            }
          </>
        )
        }
      </div>
      {showCreateTaskForm &&
        <div className="popup-overlay" ref={formRef} >
          <AddTaskForm setShowCreateTaskForm={setShowCreateTaskForm} setUpdate={setUpdate} />
        </div>
      }

      {showUserProfile &&

        <div className="profile-popup-overlay" >
          <div ref={profileRef} >
            <UserProfile userData={userData} />
          </div>
        </div>
      }
    </div>
  )
}

export default HomePage