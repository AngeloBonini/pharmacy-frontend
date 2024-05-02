// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

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
