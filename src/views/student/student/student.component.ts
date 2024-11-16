import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  username: string | null = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // Lấy tên người dùng từ localStorage
    this.username = localStorage.getItem('username') || 'Guest';
  }

  navigateTo(section: string) {
    this.router.navigate([`/${section}`]);
  }

  logout() {
    // Xóa dữ liệu người dùng và điều hướng đến trang đăng nhập
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
