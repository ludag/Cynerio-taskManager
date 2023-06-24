import { Module } from '@nestjs/common';
import { TaskManagerController } from './task.manager.controller';
import { TaskManagerService } from './task.manager.service';
import { UserManagerService } from './user.manager.service';
import { TaskManagerRepository } from './task.manager.repository';
import { UserManagerRepository } from './user.manager.repository';

@Module({
  imports: [],
  controllers: [TaskManagerController],
  providers: [TaskManagerService,UserManagerService, TaskManagerRepository,UserManagerRepository],
})
export class TaskManagerModule {}
