import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-manager',
  standalone: true,
  imports: [],
  templateUrl: './main-manager.component.html',
  styleUrl: './main-manager.component.scss'
})
export class MainManagerComponent {

  router = inject(Router)

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
  logout(){
    this.router.navigate(['']);
  }
}
