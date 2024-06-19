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

  private apiUrl = 'http://localhost:3000/pessoa';

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      map(users => {
        return users.map(user => ({
          ...user,
          photoUrl: user.photoUrl || 'ttps://randomuser.me/api/portraits/men/1'
        }));
      }),
      catchError(() => of(this.stateService.getUsers()))
    );
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
    return this.http.get<any>('https://randomuser.me/api/')
      .pipe(
        map(response => {
          const user = response.results[0];
          return {
            id: user.login.uuid,
            name: `${user.name.first} ${user.name.last}`,
            age: user.dob.age,
            role: 'User',
            photoUrl: user.picture.large,
            email: user.email
          };
        }),
        catchError(error => {
          console.error('Error fetching user data:', error);
          return of(this.getFallbackUser());
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
      email: 'fallback@example.com'
    };
  }
}
