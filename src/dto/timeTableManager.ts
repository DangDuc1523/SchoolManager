// timeTableManager.ts
export interface Timetable {
  timetableId: number;
  classId: number;
  subjectId: number;
  dateLearn: string; // ISO format: "YYYY-MM-DD"
  startTime: string; // Format: "HH:mm:ss"
  endTime: string; // Format: "HH:mm:ss"
  room: string;
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

