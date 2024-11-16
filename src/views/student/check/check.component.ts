import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.scss']
})
export class CheckComponent {
  classes = [
    { name: 'Toán 12', teacher: 'Cô Lan', subject: 'Toán học' },
    { name: 'Vật Lý 11', teacher: 'Thầy Hải', subject: 'Vật lý' },
  ];

  constructor(private router: Router) {}

  viewMembers(selectedClass: any) {
    this.router.navigate(['/member'], { state: { class: selectedClass } });
  }
  goBack() {
    window.history.back();  // Sử dụng history của trình duyệt để quay lại trang trước
  }
}

