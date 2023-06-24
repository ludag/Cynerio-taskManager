import { Test, TestingModule } from '@nestjs/testing';
import { TaskManagerController } from './task.manager.controller';
import { TaskManagerService } from './task.manager.service';
import { TaskManagerRepository } from './task.manager.repository';
import { UserManagerService } from './user.manager.service';
import { taskListMock, userListMock, usersTasksMock } from './testData/mockData';
import { UserManagerRepository } from './user.manager.repository';

describe('TaskManagerService', () => {
  let userManagerService: UserManagerService;
  let taskManagerService: TaskManagerService;
  let taskManagerRepository: TaskManagerRepository; 
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TaskManagerController],
      providers: [TaskManagerService,TaskManagerRepository,UserManagerService, UserManagerRepository],
    }).compile();

    taskManagerService = app.get<TaskManagerService>(TaskManagerService);
    userManagerService = app.get<UserManagerService>(UserManagerService);
    taskManagerRepository = app.get<TaskManagerRepository>(TaskManagerRepository);
   
  });

  describe('getUserTasks', () => {
  it('should retrieve the full user task inforamation', async () => {
    jest.spyOn(taskManagerService, 'getTasks').mockResolvedValueOnce(taskListMock);

    jest.spyOn(userManagerService, 'getUsers').mockResolvedValueOnce(userListMock);
    const result = await taskManagerService.getUserTasks();
    expect(result).toEqual(usersTasksMock);
  });

  it('should throw an error if retrieving user tasks fails', async () => {
    jest.spyOn(taskManagerService, 'getTasks').mockRejectedValueOnce(new Error('Failed to retrieve tasks'));
    await expect(taskManagerService.getUserTasks()).rejects.toThrow('Failed to retrieve tasks');
  });
});


describe('checkout', () => {
  it('should checkout the task for a user', async () => {
    jest.spyOn(taskManagerService, 'getTasks').mockResolvedValueOnce(taskListMock);
    const updateTasksMock = jest.spyOn(taskManagerRepository, 'updateTasks').mockResolvedValue();

    await taskManagerService.checkout("e0ea4154-3b37-4379-839f-fc9af249a63c");
    expect(updateTasksMock).toHaveBeenCalled(); 
  });

  it('should throw an error if checkin  task fails', async () => {
    jest.spyOn(taskManagerService, 'getTasks').mockRejectedValueOnce(new Error('Failed to checkin tasks'));
    await expect(taskManagerService.checkout("e0ea4154-3b37-4379-839f-fc9af249a63c")).rejects.toThrow('Failed to checkin tasks');
  });
});


});
