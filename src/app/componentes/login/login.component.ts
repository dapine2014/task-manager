import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;

   constructor(private fb: FormBuilder, private router: Router) {
     this.loginForm = this.fb.group({
       username: ['', Validators.required],
       password: ['', Validators.required]
     })
   }

    ngOnInit(): void {}

    onSubmit(): void {
      if (this.loginForm.valid) {
        const { username, password } = this.loginForm.value;
        console.log('Usuario:', username);
        console.log('Contraseña:', password);
        this.router.navigate(['/task']);

      }
    }
}
