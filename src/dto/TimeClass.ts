export interface Subject {
  subjectId: number;
  subjectName: string;
  description: string;
  classSubjects: any[];  // Bạn có thể tùy chỉnh nếu cần thêm thông tin
  grades: any[];         // Bạn có thể tùy chỉnh nếu cần thêm thông tin
}

export interface TimeClass {
  timetableId: number;
  classId: number;
  subjectId: number;
  dateLearn: string;
  startTime: string;
  endTime: string;
  room: string;
  subject: Subject;  // Sử dụng kiểu Subject thay vì any
}
