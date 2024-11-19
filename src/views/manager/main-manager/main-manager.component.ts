import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-main-manager',
  standalone: true,
  imports: [],
  templateUrl: './main-manager.component.html',
  styleUrl: './main-manager.component.scss'
})
export class MainManagerComponent {

  router = inject(Router)

  auth : AuthService = inject(AuthService);

  mainManager(){
    this.router.navigate(['mainManager']);
  }

  listAllClass(){
    this.router.navigate(['listClassManager']);
  }
  timeTable(){
    this.router.navigate(['timeTableManager']);
  }
  listAllTeacher(){
    this.router.navigate(['listTeacherManager']);
  }
  profileManager(){
    this.router.navigate(['profileManager']);
  }

  ScoreManager() {
    this.router.navigate(['scoreTable']);
    }
    


  logout(){
      this.auth.logout();
      this.router.navigate(['/login']); // Điều hướng đến trang đăng nhập khi đăng xuất
  }
}
