import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCalendar, faFlag, faArrowsRotate, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import "./TaskDetail.css"
import { TaskPriority, TaskStatus } from '../models/Task';
import ApiService from '../api/apiService';
import { useState, useRef } from 'react';
import toast from 'react-hot-toast';

import CustomSwal from '../configs/CustomSwal';

const TaskDetail = ({ task, setdisplayedTask, setUpdate }) => {

    const [editMode, setEditMode] = useState(false)

    const nameRef = useRef(null);
    const descriptionRef = useRef(null);
    const priorityeRef = useRef(null);
    const dueDateRef = useRef(null);
    const dailyRef = useRef(null)

    const onDeleteTask = async () => {
        CustomSwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: 'Yes, delete!'
        }).then( async (result) => {
            if (result.isConfirmed) {

                try {
                    await ApiService.deleteTask(task.id)
                    setUpdate(prev => !prev)
                    setdisplayedTask(null)

                    toast.success(`Deleted: ${task.name}`, {
                        icon: <FontAwesomeIcon icon={faTrash} style={{ color: '#ef4444' }} />,
                    });

                } catch (error) {
                    console.error(error)
                }
            }
        })

    }


    const onCompleteTask = async (event) => {
        event.stopPropagation();
        try {
            await ApiService.completeTask(task.id)
            setUpdate(prev => !prev)
            setdisplayedTask(null)
            toast.success(`${task.name}`)
        } catch (error) {
            console.error("Error completing the task:" + error)
        }
    }

    const onSaveEdit = async () => {
        try {
            const updateTaskDto = {
                name: nameRef.current.value,
                priority: priorityeRef.current.value,
                description: descriptionRef.current.value,
                daily: dailyRef.current.checked,
                dueDate: dueDateRef.current.value
            }
            if (!nameRef.current.value)
                throw error("A task needs to have a name");
            await ApiService.updateTask(task.id, updateTaskDto)
            setUpdate(prev => !prev)
            const updateTask = { ...task, ...updateTaskDto } // spread operator (right overwrites left)
            setdisplayedTask(updateTask)
            setEditMode(false)

            toast.success(`Saved: ${task.name}`, {
                icon: <FontAwesomeIcon icon={faCheck} style={{ color: '#3b82f6' }} />,
            });

        } catch (error) {
            console.error("Error updateing the task:" + error)
            toast.error("Task needs to have a name")
        }
    }

    return (
        <div className="task-detail-card">
            {!editMode ? (
                <div>
                    <div className="detail-header">
                        <h2 className="detail-title">{task.name}</h2>
                    </div>

                    <div className="detail-body">
                        <p className="detail-description">
                            {task.description ? task.description : "No description provided."}
                        </p>

                        <div className="meta-grid">

                            <div className="meta-item">
                                <span className="meta-label"><FontAwesomeIcon icon={faFlag} /> Priority</span>
                                <span className="meta-value">{task.priority.replace('_', ' ')}</span>
                            </div>

                            <div className="meta-item">
                                <span className="meta-label"><FontAwesomeIcon icon={faCalendar} /> Due Date</span>
                                <span className="meta-value">{task.dueDate ? task.dueDate : "None"}</span>
                            </div>

                            <div className="meta-item">
                                <span className="meta-label">Status</span>
                                {task.status == TaskStatus.COMPLETE ?
                                    <span className="meta-value status-badge">{task.status}</span>
                                    :
                                    <span className="meta-value status-badge-todo">{task.status}</span>
                                }
                            </div>

                            {task.daily && (
                                <div className="meta-item">
                                    <span className="daily-badge">
                                        <FontAwesomeIcon icon={faArrowsRotate} /> Daily Recurring
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {task.status !== TaskStatus.COMPLETE &&
                        <div className="detail-actions">
                            <button className="complete-btn" onClick={onCompleteTask}>
                                <FontAwesomeIcon icon={faCheck} /> Check
                            </button>
                            <button className="edit-btn" onClick={() => setEditMode(true)}>Edit</button>
                            <button className="delete-btn" onClick={onDeleteTask}>
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    }
                </div>
            ) : (
                <div>
                    <div className="detail-header">
                        <input
                            type="text"
                            name="name"
                            ref={nameRef}
                            defaultValue={task.name}
                            className="detail-title edit-input"
                        />
                    </div>

                    <div className="detail-body">
                        <textarea
                            name="description"
                            ref={descriptionRef}
                            defaultValue={task.description}
                            className="detail-description edit-input"
                        />

                        <div className="meta-grid">

                            <div className="meta-item">
                                <span className="meta-label"><FontAwesomeIcon icon={faFlag} /> Priority</span>
                                <select name="priority" ref={priorityeRef} defaultValue={task.priority} className="edit-input">
                                    <option value="PRIORITY_1">PRIORITY 1</option>
                                    <option value="PRIORITY_2">PRIORITY 2</option>
                                    <option value="PRIORITY_3">PRIORITY 3</option>
                                    <option value="PRIORITY_4">PRIORITY 4</option>
                                </select>
                            </div>

                            <div className="meta-item">
                                <span className="meta-label"><FontAwesomeIcon icon={faCalendar} /> Due Date</span>
                                <input
                                    type="date"
                                    name="dueDate"
                                    ref={dueDateRef}
                                    defaultValue={task.dueDate}
                                    className="edit-input"
                                />
                            </div>

                            <div className="meta-item">
                                <label className="daily-badge">
                                    <input
                                        type="checkbox"
                                        name="daily"
                                        ref={dailyRef}
                                        defaultChecked={task.daily}
                                    />
                                    <FontAwesomeIcon icon={faArrowsRotate} /> Daily Recurring
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="detail-actions">
                        <button className="edit-btn" onClick={onSaveEdit}>Save</button>
                        <button className="delete-btn" onClick={() => setEditMode(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskDetail