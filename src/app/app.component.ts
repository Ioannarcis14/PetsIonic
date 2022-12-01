import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private _menu: MenuController, private auth: AuthService) {}

  closeMenu(): void {
    console.log("closing...");
    this._menu.close();
  }

  get AuthSession() {
    return this.auth.isSessionStarted();
  }
}
