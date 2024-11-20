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

  constructor(private apiService: ApiService) {}

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
  

<<<<<<< HEAD
  // Đăng ký người dùng mới
  signup(Username: string, Password: string, Fullname:string, Dob:string, Address:string, Phone:string, Specialty:string){
    const newRegisterDTO = { 
      username : Username,
      password : Password,
      fullname : Fullname,
      dob : Dob,
      address:Address,
      phone:Phone,
      specialty :Specialty
    };
    console.log(newRegisterDTO)
    this.apiService.signup(newRegisterDTO).subscribe({
      next: (response: string) => {
        alert("thanh cong") // Phát sự kiện sau khi đăng nhập thành công
      },
      error: (error) => {
        console.error('Error during login', error);
=======

  signup(username: string, password: string, fullname: string, dob: Date, address: string, phone: string, specialty: string): void {
    const payload = { username, password, fullname, dob, address, phone, specialty };
    this.apiService.signup(payload).subscribe({
      next: () => {
        alert('Signup successful');
        this.router.navigate(['/login']); 
      },
      error: (error) => {
        console.error('Error during signup:', error);
>>>>>>> 15cf1ac6554ce828e36536d3e953347d765826b7
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
<<<<<<< HEAD
=======

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
  
>>>>>>> 15cf1ac6554ce828e36536d3e953347d765826b7
}
