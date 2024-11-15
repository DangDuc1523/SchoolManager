export type UserRole = 'Admin' | 'Teacher' | 'Student';

export interface User {
  userID: number;
  username: string;
  passwordHash?: string;
  role: UserRole;
  fullName: string;
  dateOfBirth: string;
  address: string;
  contactInfo: string;
}

export interface Teacher extends User {
  specialty: string;
}

export interface Student extends User {
  classID: number;
  enrollmentDate: string;
}

export interface Admin extends User {
  permissions?: string[];
}
