import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:44344/api/Auth/register'; // URL của API

  constructor(private http: HttpClient) {}

  /**
   * Hàm thực hiện đăng ký người dùng mới
   * @param username Tên đăng nhập
   * @param password Mật khẩu
   * @param fullname Họ và tên
   * @param dob Ngày sinh (định dạng yyyy-MM-dd)
   * @param address Địa chỉ
   * @param phone Số điện thoại
   * @param specialty Chuyên ngành
   * @returns Observable chứa phản hồi từ API
   */
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