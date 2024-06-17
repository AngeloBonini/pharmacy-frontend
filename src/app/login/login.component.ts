import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void { }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  hasError(controlName: string, errorName: string): boolean | undefined {
    const control = this.loginForm.get(controlName);
    return control?.touched && control.hasError(errorName);
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      // Perform login logic here, e.g., call a login service
      console.log('Login successful');
      this.router.navigate(['/']); // Redirect to home or dashboard
    }
  }
}
