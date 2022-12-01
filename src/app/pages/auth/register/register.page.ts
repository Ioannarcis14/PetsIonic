import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public name: string;
  public email: string;
  public passwd: string;
  public profile_pic: string;

  constructor(private _authService: AuthService, private _router: Router) {}

  ngOnInit() {}

  register(): void {
    this._authService.register(this.email, this.passwd, this.name, this.profile_pic).then(
      (result: boolean) => {
        console.log(result);
        if(result) {
          console.log("navigation!");
          this._router.navigate(["/home"]);
        }
      }
    );
  }

  back(): void {
    this._router.navigate(["/login"]);
  }


}
