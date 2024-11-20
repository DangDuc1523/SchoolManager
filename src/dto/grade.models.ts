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
  student: {
    studentId: number;
    userId: number;
    classId: number;
    enrollmentDate: string;
    class: {
      classId: number;
      className: string;
      schedule: string;
      room: string;
      studentCount: number;
    } | null;
    user: User | null; // Liên kết tới User
  };
  subject: {
    subjectId: number;
    subjectName: string;
    description: string;
  };
}

export interface User {
  userId: number;
  username: string;
  passwordHash: string;
  role: string;
  fullName: string;
  dateOfBirth: string;
  address: string;
  contactInfo: string;
  specialty: string;
  classSubjects: any[];
  students: any[];
}
