import { Subject } from '../dto/subject.model';
import { Class } from '../dto/class.model';

export interface Timetable {
  timetableID: number;
  classID: number;
  subjectID: number;
  dateLearn: string;
  startTime: string;
  endTime: string;
  room: string;

  className: string;  // Tên lớp học
  subjectName: string; // Tên môn học

  class?: Class;
  subject?: Subject;

}
