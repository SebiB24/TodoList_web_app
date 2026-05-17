import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faRotateBack, faRotateLeft, faCheck } from "@fortawesome/free-solid-svg-icons";
import { isTaskDueToday, isTaskPastDue } from "../models/Task";
import "./TaskListItem.css"
import { useEffect, useState } from "react";
import ApiService from "../api/apiService";
import { ListTypes } from "./TaskList";
import toast from "react-hot-toast";


function TaskListItem({ task, setUpdate, listType, setdisplayedTask }) {

    const [taskDueStatus, setTaskDueStatus] = useState()

    useEffect(() => {
        const TaskDueStatus = () => {
            if (isTaskDueToday(task)) {
                return 'today';
            }
            if (isTaskPastDue(task)) {
                return 'overdue';
            }
            return 'upcoming';
        }
        setTaskDueStatus(TaskDueStatus)
    }, [task])

    const onCompleteTask = async (event) => {
        event.stopPropagation();
        try {
            await ApiService.completeTask(task.id)
            setUpdate(prev => !prev)
            toast.success(`${task.name}`)
        } catch (error) {
            console.error("Error completing the task:" + error)
        }

    }

    const onUndoTask = async (event) => {
        event.stopPropagation();

        try {
            await ApiService.undoTask(task.id)
            setUpdate(prev => !prev)

            // toast
            toast.success(`Restored: ${task.name}`, {
                icon: <FontAwesomeIcon icon={faRotateLeft} style={{ color: 'rgb(137, 26, 26)' }} />,
            });

        } catch (error) {
            console.error("Error undoing task complete:" + error)
        }

    }

    const onListItemClick = (event) => {
        setdisplayedTask(task);
    }

    return (
        <div className="task-item" onClick={onListItemClick}>
            {listType != ListTypes.HISTORY ? (
                <div className="task-checkbox-check" onClick={onCompleteTask}>
                    <FontAwesomeIcon icon={faCheck} className="check-icon"></FontAwesomeIcon>
                </div>

            ) : (
                <div className="task-checkbox-undo" onClick={onUndoTask}>
                    <FontAwesomeIcon icon={faRotateBack} className="undo-icon" />
                </div>
            )}

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