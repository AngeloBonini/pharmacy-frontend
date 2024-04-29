// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './products/products-list/products-list.component';
import { UsersListComponent } from './user/users-list/users-list.component';
import { UserPageComponent } from './user/user-page/user-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'products' },
  { path: 'products', component: ProductListComponent, title: 'Product List' },
  { path: 'users', component: UsersListComponent, title: 'Users List' },
  { path: 'user', component: UserPageComponent, title: 'Users page' },
  // Other routes can be added here
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
