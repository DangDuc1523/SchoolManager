import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] 
})
export class LoginComponent {
  msg: string = "Hello world";
  number: number = 2;
  isBool: boolean = true;
  fnVoid: Array<string> = ["abc", "bcd"];
  varAny: any = "1";


  router = inject(Router);

  signup() {
    this.router.navigate(['signup']);
  }

  backToMain() {
    this.router.navigate(['dashboard']);
  }
}
