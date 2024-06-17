import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  displayedColumns: string[] = ['photo', 'name', 'age', 'role', 'email', 'actions'];
  dataSource = new MatTableDataSource<User>(this.users);
  userForm: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18)]],
      role: ['', Validators.required],
      photoUrl: ['', Validators.required],
      email: ['', [Validators.email]]
    });
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
      this.dataSource.data = this.users;
    });
  }

  addUser(): void {
    if (this.userForm.valid) {
      const newUser: User = {
        id: (this.users.length + 1).toString(),
        ...this.userForm.value
      };
      this.userService.addUser(newUser);
      this.dataSource.data = [...this.users, newUser];
      this.userForm.reset();
    }
  }

  editUser(user: User): void {
    // Implement edit functionality here
  }
  selectUser(row: any){
    console.log(row)
  }
  deleteUser(user: User): void {
    this.userService.deleteUser(user.id);
    this.dataSource.data = this.users.filter(u => u.id !== user.id);
  }
}
