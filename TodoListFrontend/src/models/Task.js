export const TaskStatus = Object.freeze({
    TODO: 'TODO',
    COMPLETE: 'COMPLETE'
});

export const TaskPriority = Object.freeze({
    PRIORITY_1: 'PRIORITY_1',
    PRIORITY_2: 'PRIORITY_2',
    PRIORITY_3: 'PRIORITY_3'
});

export class Task {
    constructor(id, name, description, status, priority, daily, dueDate) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.status = status;
        this.priority = priority;
        this.daily = daily;
        this.dueDate = dueDate;
    }
}

export class CreateTaskDTO {
    constructor(name, description, priority, dueDate, daily) {
        this.name = name;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;
        this.daily = daily;
    }
}

export const isTaskDueToday = (task) => {
    const dueDateString = task.dueDate;
    if (!dueDateString) return false;

    const today = new Date();

    const [year, month, day] = dueDateString.split('-');

    const taskDate = new Date(year, month - 1, day);

    return today.toDateString() === taskDate.toDateString();
}

export const isTaskPastDue = (task) => {
    const dueDateString = task.dueDate;
    if (!dueDateString) return false;

    const today = new Date();

    const [year, month, day] = dueDateString.split('-');

    const taskDate = new Date(year, month - 1, day);

    return today > taskDate;
}
