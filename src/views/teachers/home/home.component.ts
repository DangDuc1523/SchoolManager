import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  
  router = inject(Router)

  auth : AuthService = inject(AuthService);

  classinfo(){
    this.router.navigate(['class-info']);
  }
  gradeManagement(){
    this.router.navigate(['grade-management']);
  }
  teacherProfile(){
    this.router.navigate(['teacher-profile']);
  }
  teacherSchdule(){
    this.router.navigate(['teacher-schedule']);
  }
  logout(){
      this.auth.logout();
      this.router.navigate(['/login']); 
  }
}
