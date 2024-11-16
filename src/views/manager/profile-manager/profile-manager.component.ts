import { Component, inject } from '@angular/core';
import { MainManagerComponent } from "../main-manager/main-manager.component";
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-profile-manager',
  standalone: true,
  imports: [MainManagerComponent],
  templateUrl: './profile-manager.component.html',
  styleUrl: './profile-manager.component.scss'
  

})
export class ProfileManagerComponent {

  auth: AuthService = inject(AuthService);
  id = this.auth.getId();

}
