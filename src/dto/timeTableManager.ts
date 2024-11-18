export interface Subject {
    subjectId: number;
    subjectName: string;
    description: string;
  }
  
  export interface Timetable {
    timetableId: number;
    classId: number;
    subjectId: number;
    dateLearn: string; // Format: "YYYY-MM-DD"
    startTime: string; // Format: "HH:MM:SS"
    endTime: string;
    room: string;
    subject: Subject;
  }
  