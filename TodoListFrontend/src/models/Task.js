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
    constructor(name, description, status, priority, daily, dueDate) {
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
