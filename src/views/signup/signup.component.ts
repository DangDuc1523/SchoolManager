import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  router = inject(Router)

  signin(){
    this.router.navigate(['signin'])
  }
  
  ngOnInit() {
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
