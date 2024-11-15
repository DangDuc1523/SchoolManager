import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MainManagerComponent } from "../main-manager/main-manager.component";

@Component({
  selector: 'app-info-class',
  standalone: true,
  imports: [MainManagerComponent],
  templateUrl: './info-class.component.html',
  styleUrl: './info-class.component.scss'
})
export class InfoClassComponent {
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
