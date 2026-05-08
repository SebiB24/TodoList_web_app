import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle as solidCircle, faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { isTaskDueToday, isTaskPastDue } from "../models/Task";
import "./TaskListItem.css"
import { useState } from "react";

function TaskListItem({ task }) {

    const [taskDueStatus, setTaskDueStatus] = useState(() => {
        if (isTaskDueToday(task)) {
            return 'today';
        }
        if (isTaskPastDue(task)) {
            return 'overdue';
        }
        return 'upcoming';
    });

    return (
        <div className="task-item">
            <div className="task-checkbox">
                <FontAwesomeIcon icon={solidCircle} className="circle-icon" />
            </div>

            <div className="task-content">
                <span className="task-title">{task.name}</span>

                <div className="task-meta">
                    <span className={`task-date ${taskDueStatus}`}>
                        <p><FontAwesomeIcon icon={faCalendar} /> {taskDueStatus}</p>
                    </span>
                    {task.daily && (
                        <span className="task-recurring">
                            <FontAwesomeIcon icon={faArrowsRotate} />
                            Recurring
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TaskListItem