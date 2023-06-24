import { UserInfo } from './types/user.types';
import { readFile, writeFile } from 'fs/promises';

export class UserManagerRepository {
  async updateUsers(users:UserInfo[]): Promise<void> {
    try{
      await writeFile('./src/data/users.txt', JSON.stringify(users));

    }catch(e)
    {
     console.error(`Failed to update users in file `, e);
     throw e;
    }
  }


  async getUsers(): Promise <UserInfo[]> {
    try{
      const fileContent = await readFile('./src/data/users.txt', 'utf8');
      if (!fileContent.trim()) {
        return [];
      }
      return JSON.parse(fileContent);
    }catch(e)
    {
     console.error(`Failed to retrieve users content from file` , e);
     throw e;
    }
  }


}