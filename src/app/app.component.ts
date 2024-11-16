
import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { RouterModule, Router } from '@angular/router';
import { LoginComponent } from '../views/login/login.component';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from '../views/dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [RouterModule, LoginComponent, CommonModule, DashboardComponent],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  title = 'AngularT';
  auth: AuthService = inject(AuthService);
  router: Router = inject(Router);
  isloggedin = this.auth.isLoggedIn();

  ngOnInit() {
    // Lắng nghe sự kiện đăng nhập thành công và điều hướng dựa trên vai trò
    this.auth.loginEvent.subscribe((role) => {
      if (this.isloggedin) {
        this.handleRoleNavigation(role);
      }
    });
  }

  handleLogin(loggedin: boolean) {
    this.isloggedin = loggedin;
    if (loggedin) {
      // Điều hướng tới trang mặc định hoặc dựa trên vai trò sau khi đăng nhập
      const role = this.auth.getRoles();
      this.handleRoleNavigation(role);
    }

  }

  handleRoleNavigation(role: string | null) {
    if (role === 'Admin') {
      this.router.navigate(['mainManager']);
    } else if (role === 'Teacher') {
      this.router.navigate(['home']);
    }
      else if (role === 'Student') {
        this.router.navigate(['student']);
    } else {
      this.router.navigate(['']); // Điều hướng mặc định nếu vai trò không xác định
    }
  }

  // logout() {
  //   this.auth.logout();
  //   this.isloggedin = false;
  //   this.router.navigate(['/login']); // Điều hướng đến trang đăng nhập khi đăng xuất
  // }
}
