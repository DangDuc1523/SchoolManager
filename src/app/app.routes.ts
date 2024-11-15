import { Routes } from '@angular/router';
import { DashboardComponent } from '../views/dashboard/dashboard.component';
import { LoginComponent } from '../views/login/login.component';
import { ListClassComponent } from '../views/list-class/list-class.component';
import { InfoClassComponent } from '../views/info-class/info-class.component';
import { SignupComponent } from '../views/signup/signup.component';
import { ClassInfoComponent } from '../views/teachers/classinfo/classinfo.component';
import { GradeManagementComponent } from '../views/teachers/grademanagement/grademanagement.component';
import { HomeComponent } from '../views/teachers/home/home.component';
import { TeacherProfileComponent } from '../views/teachers/teacherprofile/teacherprofile.component';
import { TeacherScheduleComponent } from '../views/teachers/teacherschedule/teacherschedule.component';
import { StudentComponent } from '../views/student/student/student.component';
import { ClassComponent } from '../views/student/class/class.component';
import { InfoComponent } from '../views/student/info/info.component';
import { CheckComponent } from '../views/student/check/check.component';
import { GradeComponent } from '../views/student/grade/grade.component';
import { MemberComponent } from '../views/student/member/member.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'list-class', component: ListClassComponent },
  { path: 'info-class', component: InfoClassComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Default route to dashboard

  { path: 'home', component: HomeComponent },
  { path: 'class-info', component: ClassInfoComponent },
  { path: 'grade-management', component: GradeManagementComponent },
  { path: 'teacher-profile', component: TeacherProfileComponent },
  { path: 'teacher-schedule', component: TeacherScheduleComponent },

  { path: 'student', component: StudentComponent },
  { path: 'info', component: InfoComponent }, 
  { path: 'class', component: ClassComponent },
  { path: 'check', component: CheckComponent },
  { path: 'grade', component: GradeComponent },
  { path: 'member', component: MemberComponent }
];
