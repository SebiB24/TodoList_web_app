import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCalendar, faFlag, faRotateRight, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import "./TaskDetail.css"
import { TaskStatus } from '../models/Task';
import ApiService from '../api/apiService';

const TaskDetail = ({ task, setdisplayedTask, setUpdate }) => {

    const onDeleteTask = async () => {
        try {
            await ApiService.deleteTask(task.id)
            setUpdate(prev => !prev)
            setdisplayedTask(null)

        } catch(error) {
            console.error(error)
        }
    }

    
    const onCompleteTask = async (event) => {
        event.stopPropagation();
        try {
            await ApiService.completeTask(task.id)
            setUpdate(prev => !prev)
            setdisplayedTask(null)
        } catch (error) {
            console.error("Error completing the task:" + error)
        }

    }


    return (

        <div className="task-detail-card">

            <div className="detail-header">
                <h2 className="detail-title">{task.name}</h2>
            </div>

            <div className="detail-body">
                <p className="detail-description">
                    {task.description ? task.description : "No description provided."}
                </p>

                <div className="meta-grid">
                    <div className="meta-item">
                        <span className="meta-label">Status</span>
                        <span className="meta-value status-badge">{task.status.replace('_', ' ')}</span>
                    </div>

                    <div className="meta-item">
                        <span className="meta-label"><FontAwesomeIcon icon={faFlag} /> Priority</span>
                        <span className="meta-value">{task.priority.replace('_', ' ')}</span>
                    </div>

                    <div className="meta-item">
                        <span className="meta-label"><FontAwesomeIcon icon={faCalendar} /> Due Date</span>
                        <span className="meta-value">{task.dueDate ? task.dueDate : "None"}</span>
                    </div>

                    {task.daily && (
                        <div className="meta-item">
                            <span className="daily-badge">
                                <FontAwesomeIcon icon={faRotateRight} /> Daily Recurring
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {task.status != TaskStatus.COMPLETE &&
                <div className="detail-actions">
                    <button className="complete-btn" onClick={onCompleteTask}> <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon> Check</button>
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn" onClick={onDeleteTask}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button>
                </div>
            }

        </div>
    )
}

export default TaskDetail