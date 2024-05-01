// src/app/navbar/navbar.component.ts
import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {


  constructor() {
    console.log('Navbar Component Loaded');
  }
}
