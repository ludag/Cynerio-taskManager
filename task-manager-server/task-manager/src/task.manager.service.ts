import { Injectable } from '@nestjs/common';
import { TaskManagerRepository } from './task.manager.repository';
import { TaskInfo, TaskList, UserTaskDTO } from './types/task.types';
import { UserManagerService } from './user.manager.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TaskManagerService {
  constructor(private readonly taskManagerRepository: TaskManagerRepository,private readonly userManagerService: UserManagerService ) {}
   
  async getUserTasks(): Promise<TaskList[]> {
    try {
       const taskList = await this.getTasks();
       const users = await this.userManagerService.getUsers();
       for (let userTask of taskList) {
        const userInfo =  users.find((user => user.userId === userTask.userId))
        userTask.userName = userInfo.userName; 
       }
       return taskList;
    } catch (e) {
      console.error(`Failed to retrieve tasks` , e);
      throw e;
    }
   
  }


  async getTasks(): Promise<TaskList[]> {
    try {
      return await this.taskManagerRepository.getTasks();
    } catch (e) {
      console.error(`Failed to retrieve tasks` , e);
      throw e;
    }
   
  }



  async checkout(userId:string): Promise<void> {
    try{
      const taskFullList =  await this.getTasks();
      const index = taskFullList.findIndex((userTask) => userTask.userId === userId ); 
      const userTasks = taskFullList[index].children; 
      for (let task of userTasks) {
          if( !task.endTime) {
            task.endTime = new Date().toUTCString();
            taskFullList[index].activeTask= false;
            break;
        }
      }
      await this.taskManagerRepository.updateTasks(taskFullList);
    }catch(e)
    {
     console.error(`Failed to check in task for user ${userId}`, e);
     throw e;
    }
  }

  async checkinTask(taskInfo:TaskInfo): Promise<void> {
    try{
      const taskFullList =  await this.getTasks();
      taskInfo.startTime = new Date().toUTCString();
      taskInfo.taskId = uuidv4();
      const index = taskFullList.findIndex((userTask) => userTask.userId === taskInfo.userId ); 
      const userTasks = taskFullList[index].children; 
      if(userTasks && userTasks.length> 0) {
        userTasks.unshift(taskInfo);
        taskFullList[index].children = userTasks; 
      }
      else{
        userTasks.push(taskInfo); 
        taskFullList[index].children = userTasks; 
      }
      taskFullList[index].activeTask= true;
      await this.taskManagerRepository.updateTasks(taskFullList);
    }catch(e)
    {
     console.error(`Failed to add new task to a file for user ${taskInfo.userId}` , e);
     throw e;
    }
  }


  async addNewUserTask(newUserTaskInfo:UserTaskDTO): Promise<void> {
    try{
      const taskFullList =  await this.getTasks();
      const {userName, taskName} = newUserTaskInfo;
      const userId = uuidv4();
      this.userManagerService.addUser({userId, userName})
      const taskInfo:TaskInfo = {
        userId: userId,
        taskId: uuidv4(),
        taskName: taskName, 
        startTime:new Date().toUTCString()
      } 

      const userTaskInfo: TaskList = {
        userId:userId, 
        activeTask:true, 
        children:[taskInfo],
      }
      taskFullList.push(userTaskInfo);
      await this.taskManagerRepository.updateTasks(taskFullList);
    }catch(e)
    {
     console.error(`Failed to add user and tasks` , e);
     throw e;
    }
  }
  
}
