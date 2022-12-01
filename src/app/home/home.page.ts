import { Component } from '@angular/core';
import { Pet } from '../models/pet.model';
import { RescueServiceService } from '../services/rescue-service.service';
import companyInfo from '../assets/data/general_data.json';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public company = companyInfo.RescueHouse;

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {}



  isSessionStarted(): boolean {
    return this._authService.isSessionStarted();
  }

  logout(): void {
    this._authService.logout();
  }
}
