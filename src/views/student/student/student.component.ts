import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent {
  constructor(private router: Router) {}

  navigateTo(section: string) {
    this.router.navigate([`/${section}`]);
  }
}
