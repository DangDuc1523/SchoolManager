import { Component } from '@angular/core';
import { MainManagerComponent } from "../main-manager/main-manager.component";

@Component({
  selector: 'app-time-table',
  standalone: true,
  imports: [MainManagerComponent],
  templateUrl: './time-table.component.html',
  styleUrl: './time-table.component.scss'
})
export class TimeTableComponent {

}
