export interface Task {
    _id: string,
    projectId: string,
    title: string,
    description: string,
    priority: string,
    dueDate: Date,
    isCompleted: Boolean
}
