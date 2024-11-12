import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginComponent } from '../views/login/login.component';
import { DashboardComponent } from '../views/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,  // Đánh dấu là Standalone Component
  imports: [RouterOutlet, CommonModule, RouterModule, DashboardComponent],  // Import các component và RouterModule
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
title =""

constructor(private router: Router) {}

  navigate(){
    this.router.navigate(['login']);
  }

  navigate2(){
    this.router.navigate(['dashboard']);
  }
}
