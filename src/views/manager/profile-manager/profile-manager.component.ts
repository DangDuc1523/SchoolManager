import { Component } from '@angular/core';
import { MainManagerComponent } from "../main-manager/main-manager.component";

@Component({
  selector: 'app-profile-manager',
  standalone: true,
  imports: [MainManagerComponent],
  templateUrl: './profile-manager.component.html',
  styleUrl: './profile-manager.component.scss'
})
export class ProfileManagerComponent {

}
