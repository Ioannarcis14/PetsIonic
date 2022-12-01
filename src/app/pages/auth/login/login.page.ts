import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public email: string;
  public passwd: string;

  constructor(private _authService: AuthService, private _router: Router) {}

  ngOnInit() {}

  login(): void {
    this._authService.login(this.email, this.passwd).then(
      (result: boolean) => {
        if(result) this._router.navigate(["/home"]);
      }
    );
  }

  back(): void {
    this._router.navigate(["/home"]);
  }

}
