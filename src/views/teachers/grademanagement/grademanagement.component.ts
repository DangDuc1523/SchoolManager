import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Student {
  studentID: string;
  fullName: string;
  currentScore: number;
  newScore?: number; // This field is used for entering a new score
}

@Component({
  selector: 'app-grademanagement',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './grademanagement.component.html',
  styleUrls: ['./grademanagement.component.scss']
})
export class GradeManagementComponent {
  students: Student[] = [
    { studentID: 'S001', fullName: 'John Doe', currentScore: 8 },
    { studentID: 'S002', fullName: 'Jane Smith', currentScore: 7 },
    { studentID: 'S003', fullName: 'Mike Johnson', currentScore: 9 },
    { studentID: 'S004', fullName: 'Emily Brown', currentScore: 6 },
    { studentID: 'S005', fullName: 'Chris Evans', currentScore: 7 },
    { studentID: 'S006', fullName: 'Sarah Connor', currentScore: 5 },
    { studentID: 'S007', fullName: 'Tom Hardy', currentScore: 8 },
    { studentID: 'S008', fullName: 'Olivia Wilde', currentScore: 9 },
    { studentID: 'S009', fullName: 'Jake Gyllenhaal', currentScore: 6 },
    { studentID: 'S010', fullName: 'Emma Stone', currentScore: 7 },
  ];

  updateScore(index: number) {
    const student = this.students[index];
    if (student.newScore !== undefined) {
      student.currentScore = student.newScore; // Update the current score with the new score
      console.log(`Updated score for ${student.fullName}: ${student.newScore}`);
      student.newScore = undefined; // Clear the newScore field after updating
    } else {
      console.log(`No new score entered for ${student.fullName}`);
    }
  }
}
