
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
import { TimeTableComponent } from '../views/manager/time-table/time-table.component';
import { ProfileManagerComponent } from '../views/manager/profile-manager/profile-manager.component';

import { InfoClassComponent } from '../views/manager/info-class/info-class.component';

import { TimeClassComponent } from '../views/manager/time-class/time-class.component';


export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },

  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Default route to dashboard

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
  { path: 'member', component: MemberComponent },
  { path: 'profile', component: ProfileComponent},

// Manager
  { path: 'mainManager', component:  MainManagerComponent},
  { path: 'listTeacherManager', component:  ListTeacherComponent},
  { path: 'listClassManager', component:  ListClassManagerComponent},
  { path: 'infoClassManager', component: InfoClassComponent },
  { path: 'timeTableManager', component: TimeTableComponent },

  { path: 'profileManager', component: ProfileManagerComponent },
  { path: 'timeClass', component: TimeClassComponent }
  
];

@NgModule({
  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

