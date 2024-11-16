import { Injectable, inject, EventEmitter  } from '@angular/core';
import { ApiService } from '../api/api.service';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private router = inject(Router); // Inject Router để điều hướng
    loginEvent = new EventEmitter<string>(); // Thêm EventEmitter để phát sự kiện

  constructor(private apiService: ApiService) {}

  // Kiểm tra xem người dùng có đăng nhập không (token còn hạn)
  isLoggedIn(): boolean {
    const token = localStorage.getItem("token");
    if (token) {
        const decodedToken: any = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedToken.exp && decodedToken.exp > currentTime) {
            return true;
        } else {
            this.logout();
        }
    }
    return false;
  }

  // Thực hiện đăng nhập và điều hướng dựa trên vai trò
  login(username: string, password: string) {
    this.apiService.login(username, password).subscribe({
        next: (response: string) => {
            localStorage.setItem("token", response);
            const role = this.getRoles();
            this.loginEvent.emit(role ?? undefined); // Phát sự kiện sau khi đăng nhập thành công
        },
        error: (error) => {
            console.error('Error during login', error);
        }
    });
  }

  // Đăng ký người dùng mới
  signup(username: string, password: string) {
      const payload = { username, password };
      this.apiService.signup(payload).subscribe({
          next: (response: any) => {
              localStorage.setItem("token", response.token);
              this.router.navigate(['mainManager']); // Điều hướng sau khi đăng ký
          },
          error: (error) => {
              console.error('Error during signup', error);
          }
      });
  }

  // Đăng xuất người dùng
  logout() {
    localStorage.clear();
    location.reload()
}

  // Giải mã token và lấy vai trò người dùng từ token
  getRoles(): string | null {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found');
        return null;
    }
    
    try {
        const decodedToken: any = jwtDecode(token); // Giải mã token
        console.log('Token đã giải mã là:', decodedToken);
        // Lấy role từ trường có trong token (có thể thay đổi nếu cấu trúc token khác)
        return decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || null;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
  }
  getId(): string | null {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found');
        return null;
    }
    
    try {
        const decodedToken: any = jwtDecode(token); // Giải mã token
        // Lấy role từ trường có trong token (có thể thay đổi nếu cấu trúc token khác)
        return decodedToken['UserId'] || null;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
  }
}
