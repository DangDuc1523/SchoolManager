import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {
  user = {
    name: '',
    dateOfBirth: '',
    address: ''
  };
  isEditing = false;

  edit() {
    this.isEditing = !this.isEditing;
  }
}
