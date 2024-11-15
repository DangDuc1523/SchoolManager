import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from '../views/login/login.component';
import { DashboardComponent } from '../views/dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    RouterModule,
    HttpClientModule, 
    DashboardComponent,
    LoginComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = "School Manager";

  constructor(private router: Router) {}

  navigate() {
    this.router.navigate(['login']);
  }

  navigate2() {
    this.router.navigate(['dashboard']);
  }
}
