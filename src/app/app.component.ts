import { Component, inject, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Import RouterModule để sử dụng router-outlet

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterModule, CommonModule], // Đảm bảo RouterModule có trong danh sách imports
})
export class AppComponent implements OnInit {
  title = 'AngularT';
  auth: AuthService = inject(AuthService);
  router: Router = inject(Router);

  isloggedin = this.auth.isLoggedIn();
  isPublicRoute = false;

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isPublicRoute = this.checkIfPublicRoute(event.urlAfterRedirects);
      }
    });

    this.auth.loginEvent.subscribe(() => {
      this.isloggedin = this.auth.isLoggedIn();
    });
  }

  checkIfPublicRoute(url: string): boolean {
    const publicRoutes = ['/dashboard', '/signup'];
    return publicRoutes.includes(url);
  }

  handleLogin(loggedin: boolean) {
    this.isloggedin = loggedin;
    if (loggedin) {
      const role = this.auth.getRoles();
      this.handleRoleNavigation(role);
    }
  }

  handleRoleNavigation(role: string | null) {
    if (this.isPublicRoute) {
      return;
    }

    if (role === 'Admin') {
      this.router.navigate(['mainManager']);
    } else if (role === 'Teacher') {
      this.router.navigate(['home']);
    } else if (role === 'Student') {
      this.router.navigate(['student']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
