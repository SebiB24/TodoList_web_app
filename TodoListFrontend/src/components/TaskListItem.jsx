import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle as solidCircle, faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faRotateBack } from "@fortawesome/free-solid-svg-icons";
import { isTaskDueToday, isTaskPastDue } from "../models/Task";
import "./TaskListItem.css"
import { useEffect, useState } from "react";
import ApiService from "../api/apiService";
import { ListTypes } from "./TaskList";


function TaskListItem({ task, setUpdate, listType }) {

    const [taskDueStatus, setTaskDueStatus] = useState(() => {
        if (isTaskDueToday(task)) {
            return 'today';
        }
        if (isTaskPastDue(task)) {
            return 'overdue';
        }
        return 'upcoming';
    });

    const onCompleteTask = async (event) => {
        try {
            await ApiService.completeTask(task.id)
            setUpdate(prev => !prev)
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className="task-item">
            <div className="task-checkbox" onClick={onCompleteTask}>
                {listType != ListTypes.HISTORY ? (
                    <FontAwesomeIcon icon={solidCircle} className="circle-icon" />
                ) : (
                    <FontAwesomeIcon icon={faRotateBack} className="undo-icon" />
                )}
            </div>

            <div className="task-content">
                <span className="task-title">{task.name}</span>
                {listType != ListTypes.HISTORY &&
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
                }
            </div>
        </div>
    )
}

export default TaskListItem