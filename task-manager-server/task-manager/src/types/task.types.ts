import { IsNotEmpty, Matches } from 'class-validator';

export type TaskInfo = {
    userId:string, 
    taskId:string,
    taskName :string ,
    startTime:string , 
    endTime?:string, 
}

export type TaskList = {
    userId :string ,
    userName?: string,
    activeTask :boolean , 
    children:TaskInfo [], 
}



 
export class UserTaskDTO {
    @Matches('[a-z0-9\-]+') 
    @IsNotEmpty()
    userName:string ;
    @Matches('[a-z0-9\-]+') 
    @IsNotEmpty()
    taskName :string ;
}

export class TaskInfoDTO {
    @IsNotEmpty()
    userId:string ;
    @Matches('[a-z0-9\-]+') 
    @IsNotEmpty()
    taskName :string ;
}

