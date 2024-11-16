import { Component } from '@angular/core';
import { MainManagerComponent } from "../main-manager/main-manager.component";

@Component({
  selector: 'app-list-teacher',
  standalone: true,
  imports: [MainManagerComponent],
  templateUrl: './list-teacher.component.html',
  styleUrl: './list-teacher.component.scss'
})
export class ListTeacherComponent {

}
