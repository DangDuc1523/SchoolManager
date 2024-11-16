@echo off
@echo This cmd file creates a Data API Builder configuration based on the chosen database objects.
@echo To run the cmd, create an .env file with the following contents:
@echo dab-connection-string=your connection string
@echo ** Make sure to exclude the .env file from source control **
@echo **
dotnet tool install -g Microsoft.DataApiBuilder
dab init -c dab-config.json --database-type mssql --connection-string "@env('dab-connection-string')" --host-mode Development
@echo Adding tables
dab add "ClassSubject" --source "[dbo].[Class_Subjects]" --fields.include "ClassSubjectID,ClassID,SubjectID,TeacherID" --permissions "anonymous:*" 
dab add "Class" --source "[dbo].[Classes]" --fields.include "ClassID,ClassName,Schedule,Room,StudentCount" --permissions "anonymous:*" 
dab add "Grade" --source "[dbo].[Grades]" --fields.include "GradeID,StudentID,SubjectID,ClassID,Score" --permissions "anonymous:*" 
dab add "Student" --source "[dbo].[Students]" --fields.include "StudentID,UserID,ClassID,EnrollmentDate" --permissions "anonymous:*" 
dab add "Subject" --source "[dbo].[Subjects]" --fields.include "SubjectID,SubjectName,Description" --permissions "anonymous:*" 
dab add "Timetable" --source "[dbo].[Timetables]" --fields.include "TimetableID,ClassID,SubjectID,DateLearn,StartTime,EndTime,Room" --permissions "anonymous:*" 
dab add "User" --source "[dbo].[Users]" --fields.include "UserID,Username,PasswordHash,Role,FullName,DateOfBirth,Address,ContactInfo,Specialty" --permissions "anonymous:*" 
@echo Adding views and tables without primary key
@echo Adding relationships
dab update ClassSubject --relationship Class --target.entity Class --cardinality one
dab update Class --relationship ClassSubject --target.entity ClassSubject --cardinality many
dab update ClassSubject --relationship Subject --target.entity Subject --cardinality one
dab update Subject --relationship ClassSubject --target.entity ClassSubject --cardinality many
dab update ClassSubject --relationship User --target.entity User --cardinality one
dab update User --relationship ClassSubject --target.entity ClassSubject --cardinality many
dab update Grade --relationship Class --target.entity Class --cardinality one
dab update Class --relationship Grade --target.entity Grade --cardinality many
dab update Grade --relationship Student --target.entity Student --cardinality one
dab update Student --relationship Grade --target.entity Grade --cardinality many
dab update Grade --relationship Subject --target.entity Subject --cardinality one
dab update Subject --relationship Grade --target.entity Grade --cardinality many
dab update Student --relationship Class --target.entity Class --cardinality one
dab update Class --relationship Student --target.entity Student --cardinality many
dab update Student --relationship User --target.entity User --cardinality one
dab update User --relationship Student --target.entity Student --cardinality many
dab update Timetable --relationship Class --target.entity Class --cardinality one
dab update Class --relationship Timetable --target.entity Timetable --cardinality many
dab update Timetable --relationship Subject --target.entity Subject --cardinality one
dab update Subject --relationship Timetable --target.entity Timetable --cardinality many
@echo Adding stored procedures
@echo **
@echo ** run 'dab validate' to validate your configuration **
@echo ** run 'dab start' to start the development API host **
