export interface User {
    Username: string,
    PasswordHash: string,
    Role: string,
    FullName: string,
    DateOfBirth: string,
    Address: string,
    ContactInfo: string,
    Specialty?: string
 }