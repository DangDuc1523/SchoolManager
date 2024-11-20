import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { response } from 'express';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  router = inject(Router)
  signupForm = new FormGroup({
    username : new FormControl(''),
    password : new FormControl(''),
    fullname: new FormControl(''),
    dob: new FormControl(''),
    address: new FormControl(''),
    phone: new FormControl(''),
    specialty: new FormControl('')
  });
  constructor(private authService: AuthService) {}
  Signup() {
    const username = this.signupForm.value.username?? '';
    const password = this.signupForm.value.password?? '';
    const fullname = this.signupForm.value.fullname?? '';
    const dob = this.signupForm.value.dob?? '';
    const address = this.signupForm.value.address?? '';
    const phone = this.signupForm.value.phone?? '';
    const specialty = this.signupForm.value.specialty?? '';

    this.authService.signup(username, password, fullname, dob, address, phone, specialty)
  .subscribe(
    (response: any) => {
      console.log('Phản hồi từ server:', response);
      // Hiển thị thông báo thành công
      alert(response);
      const signupBtn = document.querySelector("label.signup") as HTMLElement;
      const signupText = document.querySelector(".title-text .signup") as HTMLElement;
    const signupForm = document.querySelector("form.signup") as HTMLElement;
      signupBtn.onclick = () => {
        signupForm.style.marginLeft = "0%";
        signupText.style.marginLeft = "0%";
      };
    },
    // (error) => {
    //   console.error('Lỗi khi đăng ký:', error);
    //   // Hiển thị thông báo lỗi
    //   alert('Có lỗi xảy ra. Vui lòng thử lại.');
    // }
  );
  }
  // OTP : string = '';
  // username: string = '';
  // Confirm() {
  //   const otp = this.OTP?? '';
  //   const username = this.username?? '';
  //   this.authService.confirm(username,otp).subscribe(
  //     (respone: any) => {
  //       console.log('Phản hồi từ server:', response);
  //     // Hiển thị thông báo thành công
  //     alert(response);
  //     window.location.reload;
  //     }
  //   )

  // }

  signin(){
    this.router.navigate(['signin'])
  }
  ngOninit() {
    const signupText = document.querySelector(".title-text .signup") as HTMLElement;
    const signupForm = document.querySelector("form.signup") as HTMLElement;
    const signupBtn = document.querySelector("label.signup") as HTMLElement;
    const confirmBtn = document.querySelector("label.confirm") as HTMLElement;
    const confirmLink = document.querySelector("form .confirm-link a") as HTMLElement;

    confirmBtn.onclick = () => {
      signupForm.style.marginLeft = "-50%";
      signupText.style.marginLeft = "-50%";
    };

    signupBtn.onclick = () => {
      signupForm.style.marginLeft = "0%";
      signupText.style.marginLeft = "0%";
    };

    confirmLink.onclick = () => {
      confirmBtn.click();
      return false;
    };
  }

}