import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const allowRoutesWithoutLogin = ['dashboard', 'signup']; // Các route không cần kiểm tra token
    const currentPath = route.routeConfig?.path;

    // Nếu route hiện tại thuộc danh sách không cần login, cho phép truy cập
    if (currentPath && allowRoutesWithoutLogin.includes(currentPath)) {
      return true;
    }

    // Kiểm tra token cho các route khác
    if (this.auth.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']); // Nếu chưa đăng nhập, chuyển đến login
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.getRoles() === 'Admin') {
      return true; // Admin được phép truy cập
    } else {
      this.redirectByRole(this.auth.getRoles()); // Điều hướng về home tương ứng
      return false;
    }
  }

  private redirectByRole(role: string | null) {
    switch (role) {
      case 'Teacher':
        this.router.navigate(['/home']); // Teacher về home
        break;
      case 'Student':
        this.router.navigate(['/student']); // Student về student
        break;
      default:
        this.router.navigate(['/login']); // Không xác định vai trò, về login
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class TeacherGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.getRoles() === 'Teacher') {
      return true; // Teacher được phép truy cập
    } else {
      this.redirectByRole(this.auth.getRoles()); // Điều hướng về home tương ứng
      return false;
    }
  }

  private redirectByRole(role: string | null) {
    switch (role) {
      case 'Admin':
        this.router.navigate(['/mainManager']); // Admin về mainManager
        break;
      case 'Student':
        this.router.navigate(['/student']); // Student về student
        break;
      default:
        this.router.navigate(['/login']); // Không xác định vai trò, về login
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class StudentGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.getRoles() === 'Student') {
      return true; // Student được phép truy cập
    } else {
      this.redirectByRole(this.auth.getRoles()); // Điều hướng về home tương ứng
      return false;
    }
  }

  private redirectByRole(role: string | null) {
    switch (role) {
      case 'Admin':
        this.router.navigate(['/mainManager']); // Admin về mainManager
        break;
      case 'Teacher':
        this.router.navigate(['/home']); // Teacher về home
        break;
      default:
        this.router.navigate(['/login']); // Không xác định vai trò, về login
    }
  }
}
