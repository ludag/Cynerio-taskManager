import { Console, timeStamp } from "console";
import { readFile, writeFile } from "fs/promises";
import { TaskInfo, TaskList } from "./types/task.types";


export class TaskManagerRepository{
  async getTasks(): Promise<TaskList[]> {

    try{
    const fileContent = await readFile('./src/data/taskList.txt', 'utf8');
    if (!fileContent.trim()) {
      return [];
    }
    return JSON.parse(fileContent);
    }catch(e)
    {
     console.error(`Failed to retrieve tasks content from file` , e);
     throw e;
    }
  }


  async updateTasks(taskFullList:TaskList[]): Promise<void> {
    try{
      await writeFile('./src/data/taskList.txt', JSON.stringify(taskFullList));

    }catch(e)
    {
     console.error(`Failed to update tasks`, e);
     throw e;
    }
  }
}
