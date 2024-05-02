// src/app/user/user-page/user-page.component.ts
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  user$!: Observable<User>;
  editMode = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.user$ = this.userService.getCurrentUser();
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }
}
