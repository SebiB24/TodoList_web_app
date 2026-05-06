import SideMenu from "../components/SideMenu"
import TaskList from "../components/TaskList"
import "./HomePage.css"

function HomePage({ userData }) {

  return (
    <div className="home-page-layout">
      <SideMenu userData={userData}/>
      <div className="main-content">
        <TaskList />
      </div>

    </div>
  )
}

export default HomePage