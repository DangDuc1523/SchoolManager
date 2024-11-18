import { User } from './user.model';

export interface Student {
  studentId: number;
  userId: number;
  classID: number;
  enrollmentDate: string;
  user?: User; 
}
