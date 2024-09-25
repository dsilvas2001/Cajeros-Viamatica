import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styles: ``,
})
export class NotificationsComponent {
  @Input() statusnotification: boolean = true;
  @Input() title: string = 'Notificación';
  @Input() message: string = 'Este es un mensaje de notificación.';
  @Input() type: string = 'success';

  ngOnInit(): void {
    if (this.statusnotification) {
      setTimeout(() => {
        this.statusnotification = false;
      }, 3000);
    }
  }
}
