import { Component } from '@angular/core';
import {MatCard} from '@angular/material/card';
import {FormsModule} from '@angular/forms';
import {MatFormField} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';

@Component({
  selector: 'app-create-tasks',
  templateUrl: './create-tasks.component.html',
  styleUrl: './create-tasks.component.css',
  standalone: true,
  imports: [
    MatCard,
    FormsModule,
    MatFormField,
    MatSelect,
    MatOption
  ]
})
export class CreateTasksComponent {

}
