import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainManagerComponent } from '../main-manager/main-manager.component';
import { IClass } from '../../../dto/IClass';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../../api/api.service';
import { ClassManagerService } from '../../../service/Manager/class-manager.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject } from '../../../dto/subject.model';


@Component({
  selector: 'app-score-table',
  standalone: true,
  imports: [CommonModule, MainManagerComponent],
  templateUrl: './score-table.component.html',
  styleUrl: './score-table.component.scss'
})
export class ScoreTableComponent implements OnInit {

  classData: IClass[] = []; // Danh sách lớp học
  checkId : string = '';
  subjects: Subject[] = [];
  // FormGroup cho việc thêm lớp


  // Inject Router
  router = inject(Router);

  constructor(private apiService: ApiService, private classManager: ClassManagerService) {}

  ngOnInit(): void {
    // Gọi API để lấy danh sách lớp học
    this.classManager.getClassManager().subscribe({
      next: (data: IClass[]) => {
        this.classData = data; // Gán dữ liệu vào biến classData
        console.log('Classes loaded:', data);
      },
      error: (error: any) => {
        console.error('Error fetching class data:', error);
      },
      complete: () => {
        console.log('Class data fetch complete.');
      },
    });
  }

  // Xem chi tiết thời khóa biểu của lớp
  viewSubject(classId: string): void {
      this.checkId = classId;
      this.classManager.getSubject(classId).subscribe((data: Subject[]) => {
        this.subjects = data;
        console.log(this.subjects); // Kiểm tra dữ liệu trả về
      });
    
    
  }

  // Xem danh sách học sinh của lớp
  viewListStudent(classId: string): void {
    this.classManager.setClassId(classId);
    this.router.navigate(['/infoClassManager']);
  }


  ImportScore(subjectId: number, classId: string){
    this.classManager.setClassId(classId);
    this.classManager.setSubjectId(subjectId);
    this.router.navigate(['/importGrade']);
  }


  ImportData(): void {
 
  }

}
