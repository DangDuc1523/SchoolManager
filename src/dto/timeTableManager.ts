export interface Timetable {
  timetableId: number;
  classId: number;
  subjectId: number;
  dateLearn: string;
  startTime: string;
  endTime: string;
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
