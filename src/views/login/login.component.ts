import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  auth: AuthService = inject(AuthService);
  @Output() loginevent = new EventEmitter<boolean>();

  login() {
    const username = this.loginForm.value.username ?? '';
    const password = this.loginForm.value.password ?? '';
    this.auth.login(username, password);   
    this.loginevent.emit(this.auth.isLoggedIn());
  }

  signup() {
    const username = this.loginForm.value.username ?? '';
    const password = this.loginForm.value.password ?? '';
    this.auth.signup(username, password);
    this.loginevent.emit(this.auth.isLoggedIn());
  }
}
