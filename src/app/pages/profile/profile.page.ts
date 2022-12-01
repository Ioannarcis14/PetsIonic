import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Pet } from 'src/app/models/pet.model';
import { AuthService } from 'src/app/services/auth.service';
import { RescueServiceService } from 'src/app/services/rescue-service.service';
import { User } from '../../models/user';
import { LikesService } from '../../services/likes.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private cService: RescueServiceService, private _authService: AuthService, private likeServ: LikesService, public toastController: ToastController) { }

  ngOnInit() {
    this._authService.getUserInfo();
    console.log(this._authService.getUserInfo());

    this.likeServ.buttonLike();
    this.likeServ.getLikes();
  }

  get profilePic(): User[] {
    return this._authService.getUserInfo();
  }

  isSessionStarted(): boolean {
    return this._authService.isSessionStarted();
  }

  get getCats() : Pet[] {
    return this.cService.getCats;
  }

  get getDogs() : Pet[] {
    return this.cService.getDogs;
  }

  ferLike(posId : number) : void {
    this.likeServ.likedPet(posId);
    this.likeServ.buttonLike();
    this.likeServ.getLikes();
    this.likeToast();
  }
  
  ferDislike(posId : number) : void {
    this.likeServ.deletelike(posId);
    this.dislikeToast();
  }

  islike(id_like): boolean {
    for(let i = 0; i <  this.likeServ.getLikes().length; i++) {
      if (id_like == this.likeServ.getLikes()[i].id_pet) {
        return true;
      }
    }
    return false;
  }

  async likeToast() {
    const toast = await this.toastController.create({
      message: 'Has afegit aquesta Mascota a favorits',
      duration: 2000,
      color: 'secondary'
    });
    toast.present();
  }

  async dislikeToast() {
    const toast = await this.toastController.create({
      message: 'Has eliminat aquesta Mascota de favorits',
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }
}
