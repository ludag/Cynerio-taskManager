export type TaskInfo = {
    userId:string, 
    taskId:string,
    taskName :string ,
    startTime:string , 
    endTime:string, 
}

export type UserTaskList = {
    userId :string ,
    userName?: string,
    activeTask :boolean , 
    children:TaskInfo [], 
}

