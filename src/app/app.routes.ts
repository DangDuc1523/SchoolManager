import { DashboardComponent } from '../views/dashboard/dashboard.component';
import { LoginComponent } from '../views/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
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
import { ProfileComponent } from '../views/student/profile/profile.component';

import { MainManagerComponent } from '../views/manager/main-manager/main-manager.component';
import { ListTeacherComponent } from '../views/manager/list-teacher/list-teacher.component';
import { ListClassManagerComponent } from '../views/manager/list-class-manager/list-class-manager.component';
import { TimetableComponent } from '../views/manager/time-table/time-table.component';
import { ProfileManagerComponent } from '../views/manager/profile-manager/profile-manager.component';
import { ListStudentComponent } from '../views/manager/list-student/list-student.component';
import { InfoClassComponent } from '../views/manager/info-class/info-class.component';

import { TimeClassComponent } from '../views/manager/time-class/time-class.component';

// Guards
import { AdminGuard } from '../service/roleGuard';
import { TeacherGuard } from '../service/roleGuard';
import { StudentGuard } from '../service/roleGuard';

export const routes: Routes = [
  // Các route không cần phân quyền
  { path: 'dashboard', component: DashboardComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Default route

  // Teacher routes (yêu cầu guard)

  { path: 'home', component: HomeComponent, canActivate: [TeacherGuard] },
  { path: 'class-info', component: ClassInfoComponent, canActivate: [TeacherGuard] },
  { path: 'grade-management', component: GradeManagementComponent, canActivate: [TeacherGuard] },
  { path: 'teacher-profile', component: TeacherProfileComponent, canActivate: [TeacherGuard] },
  { path: 'teacher-schedule', component: TeacherScheduleComponent, canActivate: [TeacherGuard] },

  // Student routes (yêu cầu guard)
  { path: 'student', component: StudentComponent, canActivate: [StudentGuard] },
  { path: 'info', component: InfoComponent, canActivate: [StudentGuard] }, 
  { path: 'class', component: ClassComponent, canActivate: [StudentGuard] },
  { path: 'check', component: CheckComponent, canActivate: [StudentGuard] },
  { path: 'grade', component: GradeComponent, canActivate: [StudentGuard] },
  { path: 'member', component: MemberComponent, canActivate: [StudentGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [StudentGuard] },

  // Manager routes (yêu cầu guard)
  { path: 'mainManager', component: MainManagerComponent, canActivate: [AdminGuard] },
  { path: 'listTeacherManager', component: ListTeacherComponent, canActivate: [AdminGuard] },
  { path: 'listClassManager', component: ListClassManagerComponent, canActivate: [AdminGuard] },
  { path: 'infoClassManager', component: InfoClassComponent, canActivate: [AdminGuard] },
  { path: 'timeTableManager', component: TimetableComponent, canActivate: [AdminGuard] },
  { path: 'profileManager', component: ProfileManagerComponent, canActivate: [AdminGuard] },
  { path: 'timeClass', component: TimeClassComponent, canActivate: [AdminGuard] },
  { path: 'listStudent', component: ListStudentComponent, canActivate: [AdminGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
