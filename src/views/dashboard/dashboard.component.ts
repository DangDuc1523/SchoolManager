import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { Router } from '@angular/router';
import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,  // Đánh dấu là Standalone Component
  imports: [RouterOutlet, CommonModule, RouterModule],  // Import Router để sử dụng điều hướng
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  

  router = inject(Router)

  navigate(){
    this.router.navigate(['login']);
  }

  navigate2(){
    this.router.navigate(['signup']);
  }
  navigate3(){
    this.router.navigate(['listClass']);
  }
  navigate4(){
    this.router.navigate(['infoClass']);
  }
  navigate5(){
    this.router.navigate(['home']);
  }
  navigate6(){
    this.router.navigate(['student']);
  }
}