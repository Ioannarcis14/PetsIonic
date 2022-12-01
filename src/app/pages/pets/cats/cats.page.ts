import { Component, OnInit } from '@angular/core';
import { Pet } from 'src/app/models/pet.model';
import { RescueServiceService } from 'src/app/services/rescue-service.service';
import { AuthService } from 'src/app/services/auth.service';
import { Auth } from '@angular/fire/auth';
import { LikesService } from 'src/app/services/likes.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cats',
  templateUrl: './cats.page.html',
  styleUrls: ['./cats.page.scss'],
})
export class CatsPage implements OnInit {
  public liked: boolean;


  constructor(private cService: RescueServiceService, private authServ: AuthService, private likeServ: LikesService, public toastController: ToastController) { 
    this.isSessionStarted();
  }

  ngOnInit(): void {
    this.likeServ.buttonLike();
    
    this.likeServ.getLikes();
    console.log(this.likeServ.buttonLike());
  }

  // Per al ngIf si s'ha iniciat sessió
  isSessionStarted(): boolean {
    return this.authServ.isSessionStarted();
  }

  get getCats() : Pet[] {
    return this.cService.getCats;
  }

  /* 
  *  Comprovació per al ngIf ##
  *  comprova el parametre (bucle ngFor) amb l'id del pet
  */

  islike(id_like): boolean {
    for(let i = 0; i <  this.likeServ.getLikes().length; i++) {
      if (id_like == this.likeServ.getLikes()[i].id_pet) {
        return true;
      }
    }
    return false;
  }

  // El service s'encarrega de fer Like/Dislike
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
