import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { inject } from '@angular/core';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  username: string | null = '';
  auth: AuthService = inject(AuthService);

  // Ép kiểu từ string | null sang number | null
  id: number | null = this.auth.getId() ? Number(this.auth.getId()) : null;
  constructor(private router: Router) {}

  ngOnInit() {
    // Lấy tên người dùng từ localStorage
    this.username = localStorage.getItem('username') || 'Guest';
  }

  navigateTo(path: string): void {
    if (path === 'grade') {
     
      this.router.navigate([`grade`]);  // Điều hướng tới trang grades với studentId
    } 

  }
  navigateTo1() {
    this.router.navigate([`info`])
  }
  navigateTo2() {
    this.router.navigate([`class`])
  }
  navigateTo3() {
    this.router.navigate([`check`])
  }
  logout() {
    // Xóa dữ liệu người dùng và điều hướng đến trang đăng nhập
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
