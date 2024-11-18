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