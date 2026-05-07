import SideMenu from "../components/SideMenu"
import TaskList from "../components/TaskList"
import "./HomePage.css"
import { useState } from "react"
import { Task, TaskStatus } from "../models/Task"

function HomePage({ userData }) {

  const [listFilters, setListFilters] = useState({
    status: TaskStatus.TODO,
    today: false
  })

  return (
    <div className="home-page-layout">
      <SideMenu userData={userData} changeFilters={setListFilters} />
      <div className="main-content">
        <TaskList filters={listFilters} />
      </div>

    </div>
  )
}

export default HomePage