import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-classinfo',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './classinfo.component.html',
  styleUrls: ['./classinfo.component.scss']
})
export class ClassInfoComponent implements OnInit {
  classForm = new FormGroup({
    className: new FormControl(''),
    teacherID: new FormControl('')
  });

  // Hardcoded student data for demonstration
  students = [
    {
      userID: 1,
      fullName: 'John Doe',
      dateOfBirth: '2005-05-12',
      address: '123 Main St, Citytown',
      contactInfo: '123-456-7890',
      specialty: 'Mathematics'
    },
    {
      userID: 2,
      fullName: 'Jane Smith',
      dateOfBirth: '2006-07-24',
      address: '456 Elm St, Villageville',
      contactInfo: '987-654-3210',
      specialty: 'Science'
    },
    {
      userID: 3,
      fullName: 'Alice Johnson',
      dateOfBirth: '2005-11-02',
      address: '789 Oak St, Metropolis',
      contactInfo: '555-678-1234',
      specialty: 'Literature'
    }
  ];

  constructor() {}

  ngOnInit(): void {}

  onSubmit(): void {
    const classInfo = this.classForm.value;
    console.log('Class Info:', classInfo);
    // Any additional form submission logic can be added here
  }
}
