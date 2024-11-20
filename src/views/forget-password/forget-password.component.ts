import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { ForgotPasswordService } from '../../services/forgot-password.service';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  constructor(private forgotPasswordService: ForgotPasswordService) {}
  username:string = '';
  resetPassword(): void {
    if (!this.username) {
      alert('Email is required!');
      return;
    }

    this.forgotPasswordService.resetPassword(this.username).subscribe({
      next: (response) => {
        alert('Reset password request sent successfully!');
        console.log(response);
      },
      error: (error) => {
        alert('An error occurred. Please try again.');
        console.error(error);
      }
    });
  }
}
