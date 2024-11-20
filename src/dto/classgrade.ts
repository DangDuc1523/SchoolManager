export interface Grade {
  gradeId: number;
  studentId: number;
  subjectId: number;
  classId: number;
  score: number;
  class: {
    classId: number;
    className: string;
    schedule: string;
    room: string;
    studentCount: number;
  };
  subject: {
    subjectId: number;
    subjectName: string;
    description: string;
  };
}
