
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] 
})
export class LoginComponent {

  singupCheck = false;

  router = inject(Router);

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  auth: AuthService = inject(AuthService);
  @Output() loginevent = new EventEmitter<boolean>();

  // Thêm EventEmitter cho sự kiện đăng ký
  @Output() signupEvent = new EventEmitter<void>();

  login() {
    const username = this.loginForm.value.username ?? '';
    const password = this.loginForm.value.password ?? '';
    
    // Đăng nhập thông qua AuthService
    this.auth.login(username, password);
  
    // Lắng nghe sự kiện đăng nhập thành công
    this.auth.loginEvent.subscribe((role) => {
      if (role === 'Admin') {
        this.router.navigate(['/mainManager']);
      } else if (role === 'Teacher') {
        this.router.navigate(['/home']);
      } else if (role === 'Student') {
        this.router.navigate(['/student']);
      } else {
        this.router.navigate(['/']);
      }
    });
  }
  


  signup() {
    // Phát sự kiện đăng ký khi nhấn vào nút SIGN UP
    this.router.navigate(['/signup'])
    //this.signupEvent.emit();
  }
}
