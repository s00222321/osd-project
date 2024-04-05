export interface Task {
    _id: string;
    title: string;
    description: string;
    priority: string;
    isCompleted: boolean;
    dueDate: string;
  }

export interface Project {
    _id: string;
    userId: string;
    title: string;
    description: string;
    dueDate: string;
    dateMade: string;
    tasks: Task[];
  }


