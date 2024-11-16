// import { Component } from '@angular/core';
// import { MainManagerComponent } from "../main-manager/main-manager.component";
// import { User } from '../../../dto/User';

// @Component({
//   selector: 'app-list-teacher',
//   standalone: true,
//   imports: [MainManagerComponent],
//   templateUrl: './list-teacher.component.html',
//   styleUrl: './list-teacher.component.scss'
// })
// export class ListTeacherComponent {
//   listTeacher: User[] = [];

//   constructor(
//     private listTeacherService: ListTeacherService
    
//   ) { }

//   getTimeClasses(classId: string): void {
//     this.listTeacherService.viewDetail(classId).subscribe(
//       (data: User[]) => {
//         if (data && data.length > 0) {
//           this.timeClasses = data; // Lưu toàn bộ dữ liệu trả về vào mảng
//         } else {
//           console.warn('Không có dữ liệu để hiển thị.');
//           this.timeClasses = [];
//         }
//       },
//       (error) => {
//         console.error('Lỗi khi lấy dữ liệu từ API:', error);
//         this.timeClasses = [];
//       }
//     );
//   }
  
// }
