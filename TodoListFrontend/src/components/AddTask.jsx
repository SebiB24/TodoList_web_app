import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import "./AddTask.css"
import { TaskPriority } from "../models/Task"
import ApiService from "../api/ApiService"
import { CreateTaskDTO } from "../models/Task"

export const AddTaskButton = ({ onClick }) => {
    return (
        <button className="add-task-button" onClick={onClick}>
            <FontAwesomeIcon icon={faPlus} />
        </button>
    )
}

export const AddTaskForm = ({ setShowCreateTaskForm, setUpdate }) => {

    const createTask = async (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const taskData = new CreateTaskDTO(
            formData.get("name"),
            formData.get("description"),
            formData.get("priority"),
            formData.get("dueDate"),
            formData.get("daily") == "on" ? true : false
        )
        await ApiService.createTask(taskData)
        setShowCreateTaskForm(false)
        setUpdate(prev => !prev)
    }

    return (
        <div className="add-task-container">
            <h2 className="form-title">Create New Task</h2>

            <form className="add-task-form" onSubmit={createTask}>
                <div className="form-group">
                    <input
                        name="name"
                        type="text"
                        className="form-input"
                        placeholder="What do you need to do?"
                        required
                    />
                </div>

                <div className="form-group">
                    <textarea
                        name="description"
                        className="form-input form-textarea"
                        placeholder="Add some details..."
                        rows="3"
                    ></textarea>
                </div>

                <div className="form-row">
                    <div className="form-group half-width">
                        <label className="form-label">Priority</label>
                        <select name="priority" className="form-input">
                            <option value={TaskPriority.PRIORITY_1}>Priority 1</option>
                            <option value={TaskPriority.PRIORITY_2}>Priority 2</option>
                            <option value={TaskPriority.PRIORITY_3}>Priority 3</option>
                        </select>
                    </div>

                    <div className="form-group half-width">
                        <label className="form-label">Due Date</label>
                        <input name="dueDate" type="date" className="form-input" />
                    </div>
                </div>

                <div className="form-group checkbox-group">
                    <label className="checkbox-label">
                        <input name="daily" type="checkbox" className="custom-checkbox" />
                        Make this a daily recurring task
                    </label>
                </div>

                <button type="submit" className="submit-btn">
                    Add Task
                </button>
            </form>
        </div>
    )
}