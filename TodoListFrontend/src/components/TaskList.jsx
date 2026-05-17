import ApiService from "../api/ApiService";
import { TaskStatus, TaskPriority } from "../models/Task";
import TaskListItem from "./TaskListItem";
import { useState, useEffect, useRef } from "react";
import "./TaskList.css"
import TaskDetail from "./TaskDetail";

export const ListTypes = Object.freeze({
    ALL: "ALL",
    TODAY: "TODAY",
    HISTORY: "HISTORY"
});

function TaskList({ filters, update, setUpdate }) {

    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("All Tasks");
    const [listType, setListType] = useState(ListTypes.ALL);
    const [displayedTask, setdisplayedTask] = useState(null);

    const detailRef = useRef(null)


    useEffect(() => {

        const fetchTasks = async () => {
            try {
                const response = await ApiService.loadTasks({
                    status: filters.status,
                    today: filters.today
                });
                if (response) {
                    setTasks(response);
                    setTitle(getTitle());
                    setListType(getListType());
                }
            } catch (error) {
                console.error("Error fetching tasks:", error);
            };
        };

        fetchTasks();
    }, [filters, update]);


    useEffect(() => {
        const handleClickOutside = (event) => {
            const isClickInsideSwal = event.target.closest('.swal2-container');
            if (detailRef.current && !detailRef.current.contains(event.target) && !isClickInsideSwal) {
                setdisplayedTask(null)
            }
        }
        if (setdisplayedTask) {
            document.addEventListener("mousedown", handleClickOutside)
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [setdisplayedTask])


    const priority1Tasks = tasks.filter(task => task.priority === TaskPriority.PRIORITY_1);
    const priority2Tasks = tasks.filter(task => task.priority === TaskPriority.PRIORITY_2);
    const priority3Tasks = tasks.filter(task => task.priority === TaskPriority.PRIORITY_3);

    const getTitle = () => {
        if (filters.status === TaskStatus.COMPLETE) {
            return "Task History";
        }
        if (filters.today === true) {
            return "Today's Tasks";
        }
        return "All Tasks";
    }

    const getListType = () => {
        if (filters.status === TaskStatus.COMPLETE) {
            return ListTypes.HISTORY;
        }
        if (filters.today === true) {
            return ListTypes.TODAY;
        }
        return ListTypes.ALL;
    }

    return (

        <div className="task-list-container">

            {displayedTask && (
                <div className="detail-popup-overlay">
                    <div ref={detailRef}>
                        <TaskDetail task={displayedTask} setdisplayedTask={setdisplayedTask} setUpdate={setUpdate}></TaskDetail>
                    </div>
                </div>
            )}

            <h1 className="main-title">{title}</h1>
            {priority1Tasks.length > 0 && (
                <div className="priority-section">
                    <h2 className="priority-header">Priority 1</h2>
                    <div className="task-group">
                        {
                            priority1Tasks.map((task, index) => (
                                <TaskListItem key={task.id} task={task} listType={listType} setUpdate={setUpdate} setdisplayedTask={setdisplayedTask} />
                            ))
                        }
                    </div>
                </div>
            )}
            {priority2Tasks.length > 0 && (
                <div className="priority-section">
                    <h2 className="priority-header">Priority 2</h2>
                    <div className="task-group">
                        {
                            priority2Tasks.map((task, index) => (
                                <TaskListItem key={index} task={task} listType={listType} setUpdate={setUpdate} setdisplayedTask={setdisplayedTask} />
                            ))
                        }
                    </div>
                </div>
            )}
            {priority3Tasks.length > 0 && (
                <div className="priority-section">
                    <h2 className="priority-header">Priority 3</h2>
                    <div className="task-group">
                        {
                            priority3Tasks.map((task, index) => (
                                <TaskListItem key={index} task={task} listType={listType} setUpdate={setUpdate} setdisplayedTask={setdisplayedTask} />
                            ))
                        }
                    </div>
                </div>
            )}

        </div>
    )
}

export default TaskList