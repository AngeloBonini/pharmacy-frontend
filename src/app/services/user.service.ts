// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private stateService: StateService, private http: HttpClient) { }
  private users: User[] = [
    { id: '1', name: 'John Doe', age: 30, role: 'Manager', photoUrl: 'https://randomuser.me/api/portraits/men/1.jpg', email: 'john.doe@example.com' },
    { id: '2', name: 'Jane Smith', age: 25, role: 'Developer', photoUrl: 'https://randomuser.me/api/portraits/women/2.jpg', email: 'jane.smith@example.com' },
    { id: '3', name: 'Alice Johnson', age: 28, role: 'Designer', photoUrl: 'https://randomuser.me/api/portraits/women/3.jpg', email: 'alice.johnson@example.com' },
    { id: '4', name: 'Bob Brown', age: 35, role: 'Sales', photoUrl: 'https://randomuser.me/api/portraits/men/4.jpg', email: 'bob.brown@example.com' },
    { id: '5', name: 'Charlie Black', age: 40, role: 'HR', photoUrl: 'https://randomuser.me/api/portraits/men/5.jpg', email: 'charlie.black@example.com' },
    { id: '6', name: 'Daisy White', age: 32, role: 'Marketing', photoUrl: 'https://randomuser.me/api/portraits/women/6.jpg', email: 'daisy.white@example.com' },
    { id: '7', name: 'Eve Green', age: 27, role: 'Support', photoUrl: 'https://randomuser.me/api/portraits/women/7.jpg', email: 'eve.green@example.com' },
    { id: '8', name: 'Frank Blue', age: 29, role: 'Developer', photoUrl: 'https://randomuser.me/api/portraits/men/8.jpg', email: 'frank.blue@example.com' },
    { id: '9', name: 'Grace Purple', age: 24, role: 'Intern', photoUrl: 'https://randomuser.me/api/portraits/women/9.jpg', email: 'grace.purple@example.com' },
    { id: '10', name: 'Hank Orange', age: 45, role: 'CEO', photoUrl: 'https://randomuser.me/api/portraits/men/10.jpg', email: 'hank.orange@example.com' }
  ];


  getUsers(): Observable<User[]> {
    if (this.stateService.getUsers().length === 0) {
      this.stateService.setUsers(this.users);
    }
    return of(this.stateService.getUsers());
  }

  addUser(user: User): void {
    this.stateService.addUser(user);
  }

  updateUser(user: User): void {
    this.stateService.updateUser(user);
  }

  deleteUser(userId: string): void {
    this.stateService.deleteUser(userId);
  }
  getCurrentUser(): Observable<User> {
    // Fetching a random user
    return this.http.get<any>('https://randomuser.me/api/')
      .pipe(
        map(response => {
          const user = response.results[0];
          return {
            id: user.login.uuid,
            name: `${user.name.first} ${user.name.last}`,
            age: user.dob.age,
            role: 'User',  // Assuming a default role
            photoUrl: user.picture.large,
            shoppingList: ['Aspirin', 'Band-Aids', 'Antibiotic']
          };
        }),
        catchError(error => {
          console.error('Error fetching user data:', error);
          return of(this.getFallbackUser());  // Fallback user if API fails
        })
      );
  }



  private getFallbackUser(): User {
    return {
      id: 'fallback',
      name: 'Fallback User',
      age: 30,
      role: 'Pharmacist',
      photoUrl: 'assets/images/default-user.png',
      shoppingList: ['Aspirin', 'Band-Aids', 'Antibiotic']
    };
  }
}
