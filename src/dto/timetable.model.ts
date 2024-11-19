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
  class?: Class;
  subject?: Subject;
}
