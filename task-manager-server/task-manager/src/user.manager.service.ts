import { Injectable } from '@nestjs/common';
import { UserInfo } from './types/user.types';
import { UserManagerRepository } from './user.manager.repository';

@Injectable()
export class UserManagerService {
constructor(private readonly userManagerRepository: UserManagerRepository) {}


  async addUser(user:UserInfo): Promise<void> {
    try {
        const users = await this.getUsers();
        this.userManagerRepository.updateUsers([...users, user]);
    } catch (error) {
        console.log ( `failed to update  users information `,error);
        throw error; 
    }
  
  }


  async getUsers(): Promise <UserInfo[]> {
    try {
        return this.userManagerRepository.getUsers();
    } catch (error) {
        console.log ( `failed to retrieve users information `,error);
        throw error;
    }
    
  }
}