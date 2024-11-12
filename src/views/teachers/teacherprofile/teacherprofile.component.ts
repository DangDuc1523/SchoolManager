import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-teacherprofile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teacherprofile.component.html',
  styleUrls: ['./teacherprofile.component.scss']
})
export class TeacherProfileComponent {
  // Sample teacher data for display only
  teacher = {
    fullName: 'John Doe',
    dateOfBirth: new Date(1980, 5, 15),
    address: '123 Main St, Springfield',
    contactInfo: '123-456-7890',
    specialty: 'Mathematics'
  };
}
