import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styles: ``,
})
export class WelcomeComponent implements OnInit {
  statusnotification: boolean = false;
  courses: unknown = 4;
  count_user: unknown = 5;
  notificationTitle: string = '';
  notificationMessage: string = '';
  notificationType: string = '';
  userEmail: unknown = 'email';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log('No ingresa');
    if (localStorage.getItem('prueba') === 'true') {
      console.log('ingresa');
      this.statusnotification = true;
      this.showNotification(
        `Bienvenido, ${this.userEmail}`,
        'Has iniciado sesión correctamente. ¡Nos alegra verte de nuevo!',
        'success'
      );

      localStorage.setItem('prueba', 'false');
    }
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
