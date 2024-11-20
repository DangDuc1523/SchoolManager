import { Injectable, inject, EventEmitter } from '@angular/core';
import { ApiService } from '../api/api.service';
import { jwtDecode} from 'jwt-decode'; 
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router); 
  loginEvent = new EventEmitter<string | null>(); 

  constructor(private apiService: ApiService,private http:HttpClient) {}

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        return decodedToken.exp && decodedToken.exp > currentTime;
      } catch (error) {
        console.error('Error decoding token:', error);
        this.logout(); // Xóa token không hợp lệ
      }
    }
    return false; // Trả về false nếu không có token
  }
  

  
  login(username: string, password: string): void {
    this.apiService.login(username, password).subscribe({
      next: (response: string) => {
        localStorage.setItem('token', response); 
        const role = this.getRoles(); 
        this.loginEvent.emit(role); 
        this.handleRoleNavigation(role);
      },
      error: (error) => {
        console.error('Error during login:', error);
      }
    });
  }
  

  logout(): void {
    localStorage.clear(); // Xóa tất cả dữ liệu trong localStorage
    this.router.navigate(['/login']); // Điều hướng về trang đăng nhập
  }

  
  getRoles(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token); // Giải mã token
        return decodedToken['UserRole'] || null; // Trả về UserRole nếu có
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }
  

 
  getId(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        return decodedToken['UserId'] || null; // Trả về UserId nếu có
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }

  getStudentId(): number | null {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const studentId = Number(decodedToken['StudentId']);
        return isNaN(studentId) ? null : studentId; // Kiểm tra và trả về StudentId nếu hợp lệ
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }


  private handleRoleNavigation(role: string | null): void {
    const currentUrl = this.router.url;
  
    // Không điều hướng nếu đang ở Dashboard hoặc Signup
    if (currentUrl === '/dashboard' || currentUrl === '/signup') {
      return;
    }
  
    // Điều hướng dựa trên vai trò
    if (role === 'Admin') {
      this.router.navigate(['/mainManager']);
    } else if (role === 'Teacher') {
      this.router.navigate(['/home']);
    } else if (role === 'Student') {
      this.router.navigate(['/student']);
    } else {
      this.router.navigate(['/login']);
    }
  }
  
  private apiUrl = 'https://localhost:44344/api/Auth/register';
 
  signup(
    username: string,
    password: string,
    fullname: string,
    dob: string,
    address: string,
    phone: string,
    specialty: string
  ): Observable<any> {
    // Tạo object DTO (Data Transfer Object)
    const registerDTO = {
      username: username,
      password: password,
      fullName: fullname,
      dateOfBirth: dob, // Đảm bảo chuỗi ngày sinh ở định dạng ISO (yyyy-MM-dd)
      address: address,
      contactInfo: phone,
      specialty: specialty
    };

    // Gửi request POST đến API
    return this.http.post<any>(this.apiUrl, registerDTO);
  }

}
