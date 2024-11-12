import { Component, inject } from '@angular/core';
import { User } from '../../dto/User';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  msg: string = "Hello world"
  number: number = 2
  isBool: boolean = true
  fnVoid: Array<string> = ["abc","bcd"]
  varAny: any = "1"
  user: {name: string, age: number} = {name: "DucHD" , age: 21}

  constructor(){
    let user = new User("duchd", 22)
    console.log(user.toString())
    // let user1: User = {name: "duchh", age: 23}
    // console.log(user1)
  }

  router = inject(Router)

  signup(){
    this.router.navigate(['signup'])
  }

  backToMain(){
    this.router.navigate(['dashboard'])
  }
}
