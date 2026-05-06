import ApiService from "../api/ApiService";
import { TaskStatus, TaskPriority } from "../models/Task";
import TaskListItem from "./TaskListItem";
import { useState, useEffect } from "react";
import "./TaskList.css"

function TaskList() {
    let status = TaskStatus.TODO;
    let today = false;

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await ApiService.loadTasks({
                    status: status,
                    today: today
                });
                if (response) {
                    setTasks(response);
                }
            } catch (error) {
                console.error("Error fetching tasks:", error);
            };
        };

        fetchTasks();
    }, [status, today]);

    const priority1Tasks = tasks.filter(task => task.priority === TaskPriority.PRIORITY_1);
    const priority2Tasks = tasks.filter(task => task.priority === TaskPriority.PRIORITY_2);
    const priority3Tasks = tasks.filter(task => task.priority === TaskPriority.PRIORITY_3);

    return (
        <div className="task-list-container">
            <h1 className="main-title">TODO</h1>
            {priority1Tasks.length > 0 && (
                <div className="priority-section">
                    <h2 className="priority-header">Priority 1</h2>
                    <div className="task-group">
                        {
                            priority1Tasks.map((task, index) => (
                                <TaskListItem key={index} task={task} />
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
                                <TaskListItem key={index} task={task} />
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
                                <TaskListItem key={index} task={task} />
                            ))
                        }
                    </div>
                </div>
            )}

        </div>
    )
}

export default TaskList