import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pet } from 'src/app/models/pet.model';
import { RescueServiceService } from 'src/app/services/rescue-service.service';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.page.html',
  styleUrls: ['./pet.page.scss'],
})
export class PetPage implements OnInit {
  public animal_id : any;
  public animal : any;
  public edat : any;
  public biografia : any;
  public vacunes : any;
  public malalties : any;
  public dataNaixement : any;

  constructor(private route: ActivatedRoute, private cService: RescueServiceService, private router: Router) {
    
  }

  ngOnInit(): void {
    //primer obtenim la id
    this.animal_id = this.route.snapshot.queryParams.id;

    //despres diferenciem entre si es un gat o un gos
    if (this.router.url.includes("dogs")) this.animal = this.getDogs[this.animal_id];
    else this.animal = this.getCats[this.animal_id];

    //agafem totes les propietats i tots els atributs
    this.biografia = this.animal.biography;
    this.vacunes = this.animal.vaccines;

    if (this.vacunes == "") this.vacunes = "NO";
    this.malalties = this.animal.diseases;

    if (this.malalties == "") this.malalties = "NO";

    this.edat = this.calcularEdat(new Date(this.animal.birthdate));

    this.dataNaixement = this.convertDate(this.animal.birthdate);
  }

  //GETS
  get getDogs() : Pet[] {
    return this.cService.getDogs;
  }

  get getCats() : Pet[] {
    return this.cService.getCats;
  }

  //DATA FORMAT CATALÀ
  convertDate(inputFormat : any) : any {
    var d = new Date(inputFormat)
    return [this.pad(d.getDate()), this.pad(d.getMonth()+1), d.getFullYear()].join('/')
  }
  pad(s:any) : String { return (s < 10) ? '0' + s : s; }

  //CALCULAR EDAT A PARTIR D'UNA DATA
  calcularEdat(fecha : Date) : number {
    var avui = new Date();
    var aniversari = new Date(fecha);
    var edat = avui.getFullYear() - aniversari.getFullYear();
    var m = avui.getMonth() - aniversari.getMonth();
    if (m < 0 || (m === 0 && avui.getDate() < aniversari.getDate())) edat--;
    return edat;
  }
}
