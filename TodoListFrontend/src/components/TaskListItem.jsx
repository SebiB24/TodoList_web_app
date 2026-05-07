import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle as solidCircle, faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { isTaskDueToday } from "../models/Task";
import "./TaskListItem.css"

function TaskListItem({ task }) {
    return (
        <div className="task-item">
            <div className="task-checkbox">
                <FontAwesomeIcon icon={solidCircle} className="circle-icon" />
            </div>

            <div className="task-content">
                <span className="task-title">{task.name}</span>

                <div className="task-meta">
                    <span className="task-date">

                        {isTaskDueToday(task) ?
                            <p style={{ "color": "#4ec62a" }}> <FontAwesomeIcon icon={faCalendar} />Today</p>
                            : <p><FontAwesomeIcon icon={faCalendar} /> {task.dueDate}</p>
                        }
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