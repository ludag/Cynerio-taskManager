import { Module } from '@nestjs/common';
import { TaskManagerModule } from './task.manager.module';
import { TaskManagerController } from './task.manager.controller';


@Module({
  imports: [TaskManagerModule],
  controllers: [],
  providers: [TaskManagerModule],
})
export class AppModule {}
