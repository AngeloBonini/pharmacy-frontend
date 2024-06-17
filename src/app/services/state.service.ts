import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private users: User[] = [];

  constructor() { }

  setUsers(users: User[]): void {
    this.users = users;
  }

  getUsers(): User[] {
    return this.users;
  }

  addUser(user: User): void {
    this.users.push(user);
  }

  updateUser(updatedUser: User): void {
    const index = this.users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser;
    }
  }

  deleteUser(userId: string): void {
    this.users = this.users.filter(user => user.id !== userId);
  }
}
