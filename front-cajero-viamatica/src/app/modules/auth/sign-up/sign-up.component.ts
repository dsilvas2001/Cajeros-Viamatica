import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styles: ``,
})
export class SignUpComponent implements OnInit {
  registerForm: FormGroup;
  statusnotification: boolean = false;
  notificationTitle: string = '';
  notificationMessage: string = '';
  notificationType: string = '';

  courses: any[] = [];

  constructor(private formbuilder: FormBuilder, private router: Router) {
    this.registerForm = this.formbuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        names: ['', [Validators.required]],
        courseName: ['', Validators.required],
        password: ['', [Validators.required]],
        passwordvalited: ['', [Validators.required]],
      },
      {
        validator: this.passwordMatchValidator,
      }
    );
  }
  passwordMatchValidator(formGroup: FormGroup): null | object {
    const password = formGroup.get('password')?.value;
    const passwordvalited = formGroup.get('passwordvalited')?.value;

    if (password === passwordvalited) {
      return null;
    } else {
      return { passwordMismatch: true };
    }
  }
  ngOnInit(): void {
    // this.authServices.getAllCourses().subscribe(
    //   (data: any[]) => {
    //     this.courses = data;
    //     console.log(this.courses);
    //   },
    //   (error) => {
    //     console.error('Error fetching courses:', error);
    //   }
    // );
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const userDto = {
        name: this.registerForm.get('names')?.value,
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value,
        roles: 'Student',
        courseName: this.registerForm.get('courseName')?.value,
      };

      // this.authServices.registerUser(userDto).subscribe(
      //   (response) => {
      //     console.log('Usuario registrado con éxito:', response);
      //     this.router.navigate(['/Auth/login']);
      //   },
      //   (error: HttpErrorResponse) => {
      //     console.log('Error capturado al registrar usuario:', error);

      //     if (typeof error.error === 'object') {
      //       console.log('Error objeto:', error.error);
      //       this.showNotification('Error', error.error.error, 'error');
      //     }
      //   }
      // );
    } else {
      console.log('Formulario inválido:', this.registerForm);
    }
  }

  sesionActive() {
    localStorage.setItem('prueba', 'true');
  }

  showNotification(title: string, message: string, type: string) {
    this.statusnotification = true;
    this.notificationTitle = title;
    this.notificationMessage = message;
    this.notificationType = type;

    setTimeout(() => {
      this.statusnotification = false;
    }, 3000);
  }
}
