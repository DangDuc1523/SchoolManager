import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-class-manager',
  standalone: true,
  imports: [],
  templateUrl: './list-class-manager.component.html',
  styleUrl: './list-class-manager.component.scss'
})
export class ListClassManagerComponent {
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
