-- Tạo cơ sở dữ liệu
CREATE DATABASE SchoolData;
GO

--Drop database SchoolData

USE SchoolData;
GO

-- Bảng Users
CREATE TABLE Users (
    UserID INT PRIMARY KEY IDENTITY,
    Username NVARCHAR(50) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(255) NOT NULL,
    Role NVARCHAR(20) CHECK (Role IN (N'Admin', N'Teacher', N'Student')),
    FullName NVARCHAR(100) NOT NULL,
    DateOfBirth DATE,
    Address NVARCHAR(255),
    ContactInfo NVARCHAR(100),
    Specialty NVARCHAR(50),
	EmailConfirmed bit default 0,
	OtpCode varchar(6)
);
GO

-- Bảng Classes
CREATE TABLE Classes (
    ClassID INT PRIMARY KEY IDENTITY,
    ClassName NVARCHAR(50) NOT NULL,
    Schedule NVARCHAR(255),
    Room NVARCHAR(50),
    StudentCount INT DEFAULT 0,
);

GO

-- Bảng Students
CREATE TABLE Students (
    StudentID INT PRIMARY KEY IDENTITY,
    UserID INT NOT NULL,
    ClassID INT NOT NULL,
    EnrollmentDate DATE DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (ClassID) REFERENCES Classes(ClassID)
);
GO

-- Bảng Subjects
CREATE TABLE Subjects (
    SubjectID INT PRIMARY KEY IDENTITY,
    SubjectName NVARCHAR(50) NOT NULL,
    Description NVARCHAR(255)
);
GO

-- Bảng Class_Subjects
CREATE TABLE Class_Subjects (
    ClassSubjectID INT PRIMARY KEY IDENTITY,
    ClassID INT NOT NULL,
    SubjectID INT NOT NULL,
    TeacherID INT NOT NULL,
    FOREIGN KEY (ClassID) REFERENCES Classes(ClassID),
    FOREIGN KEY (SubjectID) REFERENCES Subjects(SubjectID),
    FOREIGN KEY (TeacherID) REFERENCES Users(UserID)
);
GO

-- Bảng Grades
CREATE TABLE Grades (
    GradeID INT PRIMARY KEY IDENTITY,
    StudentID INT NOT NULL,
    SubjectID INT NOT NULL,
    ClassID INT NOT NULL,
    Score FLOAT CHECK (Score >= 0 AND Score <= 10),
    FOREIGN KEY (StudentID) REFERENCES Students(StudentID),
    FOREIGN KEY (SubjectID) REFERENCES Subjects(SubjectID),
    FOREIGN KEY (ClassID) REFERENCES Classes(ClassID)
);
GO

-- Bảng Timetables
CREATE TABLE Timetables (
    TimetableID INT PRIMARY KEY IDENTITY,
    ClassID INT NOT NULL,
    SubjectID INT NOT NULL,
    DayOfWeek NVARCHAR(10) CHECK (DayOfWeek IN ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')),
    StartTime TIME NOT NULL,
    EndTime TIME NOT NULL,
    Room NVARCHAR(50),
    FOREIGN KEY (ClassID) REFERENCES Classes(ClassID),
    FOREIGN KEY (SubjectID) REFERENCES Subjects(SubjectID)
);
GO





-- Thêm dữ liệu mẫu cho bảng Users
INSERT INTO Users (Username, PasswordHash, Role, FullName, DateOfBirth, Address, ContactInfo, Specialty)
VALUES 
('admin1', 'hashed_password_1', 'Admin', N'Nguyễn Văn A', '1980-01-01', N'123 Đường ABC, Quận 1', '0123456789', N'Marketing'),
('teacher1', 'hashed_password_2', N'Teacher', N'Tran Thi B', '1985-02-15', N'456 Đường DEF, Quận 2', '0987654321', N'IT'),
('teacher2', 'hashed_password_3', N'Teacher', N'Lê Văn C', '1978-03-10', N'789 Đường GHI, Quận 3', '0345678901', N'Bussiness'),
('student1', 'hashed_password_4', N'Student', N'Nguyễn Văn D', '2005-04-20', N'101 Đường JKL, Quận 4', '0789012345', N'IT'),
('student2', 'hashed_password_5', N'Student', N'Phạm Thị E', '2006-05-25', N'202 Đường MNO, Quận 5', '0678901234', N'IT'),
('student3', 'hashed_password_6', N'Student', N'Tran Van F', '2007-06-30', N'303 Đường PQR, Quận 6', '0567890123', N'IT'),
('student4', 'hashed_password_7', N'Student', N'Lê Thị G', '2006-07-15', N'404 Đường STU, Quận 7', '0456789012', N'Marketing'),
('student5', 'hashed_password_8', N'Student', N'Hoàng Văn H', '2005-08-05', N'505 Đường VWX, Quận 8', '0345678901', N'Bussiness'),
('student6', 'hashed_password_9', N'Student', N'Trịnh Thị I', '2007-09-10', N'606 Đường YZ, Quận 9', '0234567890', N'Marketing'),
('teacher3', 'hashed_password_10', N'Teacher', N'Nguyen Thi J', '1983-10-12', N'707 Đường ABC, Quận 10', '0123456781', N'Bussiness');

-- Thêm dữ liệu mẫu cho bảng Classes
INSERT INTO Classes (ClassName, Schedule, Room)
VALUES 
('Class A', 'Mon-Fri, 08:00-10:00', 'Room 101'),
('Class B', 'Mon-Fri, 10:00-12:00', 'Room 102'),
('Class C', 'Mon-Fri, 13:00-15:00', 'Room 103'),
('Class D', 'Mon-Fri, 15:00-17:00', 'Room 104'),
('Class E', 'Tue-Thu, 08:00-10:00', 'Room 105'),
('Class F', 'Tue-Thu, 10:00-12:00', 'Room 106'),
('Class G', 'Wed-Fri, 13:00-15:00', 'Room 107'),
('Class H', 'Wed-Fri, 15:00-17:00', 'Room 108'),
('Class I', 'Mon-Wed, 08:00-10:00', 'Room 109'),
('Class J', 'Mon-Wed, 10:00-12:00', 'Room 110');

-- Thêm dữ liệu mẫu cho bảng Students
INSERT INTO Students (UserID, ClassID)
VALUES 
(4, 1),
(5, 1),
(6, 2),
(7, 2),
(8, 3),
(9, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7);

-- Thêm dữ liệu mẫu cho bảng Subjects
INSERT INTO Subjects (SubjectName, Description)
VALUES 
(N'Bussiness', N'Kinh tế'),
(N'IT', N'Công nghệ thông tin'),
(N'Marketing', N'Marketing');


-- Thêm dữ liệu mẫu cho bảng Class_Subjects
INSERT INTO Class_Subjects (ClassID, SubjectID, TeacherID)
VALUES 
(1, 1, 2),
(1, 2, 4),
(2, 3, 3),
(2, 1, 3),
(3, 2, 2),
(3, 3, 5);


-- Thêm dữ liệu mẫu cho bảng Grades
INSERT INTO Grades (StudentID, SubjectID, ClassID, Score)
VALUES 
(1, 1, 1, 8.5),
(2, 2, 1, 7.0),
(3, 3, 2, 6.5),
(1, 1, 2, 9.0),
(2, 2, 3, 8.0),
(3, 3, 3, 7.5),
(1, 1, 4, 8.5),
(2, 2, 4, 9.5),
(3, 3, 5, 6.0);

-- Thêm dữ liệu mẫu cho bảng Timetables
INSERT INTO Timetables (ClassID, SubjectID, DayOfWeek, StartTime, EndTime, Room)
VALUES 
(1, 1, 'Monday', '08:00', '09:30', 'Room 101'),
(1, 2, 'Tuesday', '08:00', '09:30', 'Room 102'),
(2, 3, 'Wednesday', '10:00', '11:30', 'Room 103'),
(2, 1, 'Thursday', '10:00', '11:30', 'Room 104'),
(3, 2, 'Friday', '13:00', '14:30', 'Room 105'),
(3, 3, 'Saturday', '13:00', '14:30', 'Room 106'),
(4, 1, 'Sunday', '15:00', '16:30', 'Room 107'),
(4, 2, 'Monday', '15:00', '16:30', 'Room 108'),
(5, 3, 'Tuesday', '08:00', '09:30', 'Room 109');


GO
UPDATE Classes
SET StudentCount = (
    SELECT COUNT(*)
    FROM Students
    WHERE Students.ClassID = Classes.ClassID
);