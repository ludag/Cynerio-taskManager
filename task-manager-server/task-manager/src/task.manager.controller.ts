import { Controller, Get, Post , Body} from '@nestjs/common';
import { TaskManagerService } from './task.manager.service';
import { TaskInfo, TaskList, UserTaskDTO } from './types/task.types';

@Controller(`/tasks`)
export class TaskManagerController {
  constructor(private readonly taskManagerService: TaskManagerService) {}

  @Get()
  async getTaskList(): Promise<TaskList[]> {
    return await this.taskManagerService.getUserTasks();
  }

  @Post(`/checkout`)
  checkin(@Body('userId') userId:string): Promise<void> {
    return this.taskManagerService.checkout(userId);
  }

  @Post(`/checkin`)
  checkout(@Body() taskInfo:TaskInfo):Promise<void>{
    return this.taskManagerService.checkinTask(taskInfo);
  }

  @Post(`/newUserChekout`)
  addNewUserTask(@Body() userTask:UserTaskDTO):Promise<void>{
    return this.taskManagerService.addNewUserTask(userTask);
  }

}
