import { Injectable, inject, EventEmitter } from '@angular/core';
import { ApiService } from '../api/api.service';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router); // Inject Router để điều hướng
  loginEvent = new EventEmitter<string>(); // Thêm EventEmitter để phát sự kiện

  constructor(private apiService: ApiService) {}

  // Kiểm tra xem người dùng có đăng nhập không (token còn hạn)
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
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
        localStorage.setItem('token', response);
        const role = this.getRoles();
        this.loginEvent.emit(role ?? undefined); // Phát sự kiện sau khi đăng nhập thành công
      },
      error: (error) => {
        console.error('Error during login', error);
      }
    });
  }

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
      }
    });
  }

  // Đăng xuất người dùng
  logout() {
    localStorage.clear();
    location.reload();
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
      return decodedToken['UserRole'] || null;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  // Lấy ID người dùng từ token (ví dụ: studentId)
  getStudentId(): number | null {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return null;
    }

    try {
      const decodedToken: any = jwtDecode(token); // Giải mã token
      const studentId = Number(decodedToken['StudentId']); // Chuyển đổi StudentId sang kiểu số
      return isNaN(studentId) ? null : studentId;
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
      return decodedToken['UserId'] || null;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

}
