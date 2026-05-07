import SideMenu from "../components/SideMenu"
import TaskList from "../components/TaskList"
import "./HomePage.css"
import { useState, useEffect, useRef } from "react"
import { Task, TaskStatus } from "../models/Task"
import { AddTaskButton, AddTaskForm } from "../components/AddTask"


function HomePage({ userData }) {

  const [listFilters, setListFilters] = useState({
    status: TaskStatus.TODO,
    today: false
  })

  const [showCreateTaskForm, setShowCreateTaskForm] = useState(false)

  const [update, setUpdate] = useState(false)

  const formRef = useRef(null)

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

  return (
    <div className="home-page-layout">
      <SideMenu userData={userData} changeFilters={setListFilters} />
      <div className="main-content">
        <TaskList filters={listFilters} update={update} />
      </div>
      {!showCreateTaskForm && <AddTaskButton onClick={() => setShowCreateTaskForm(true)} />}
      {showCreateTaskForm &&
        <div className="popup-overlay" ref={formRef} >
          <AddTaskForm setShowCreateTaskForm={setShowCreateTaskForm} setUpdate={setUpdate} />
        </div>
      }
    </div>
  )
}

export default HomePage