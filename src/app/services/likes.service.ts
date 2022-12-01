import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, CollectionReference, Firestore } from '@angular/fire/firestore';
import { Likes } from '../models/likes.model';
import { AuthService } from './auth.service';
import { deleteDoc, doc, DocumentReference, query, setDoc, where } from 'firebase/firestore';
import { user } from 'rxfire/auth';
import { HomePage } from '../home/home.page';

@Injectable({
  providedIn: 'root'
})
export class LikesService {
  private _likesCollection: CollectionReference<Likes>;
  private _likes: Likes[];

  constructor(private _firestore: Firestore, private authServ: AuthService) {
    this._likesCollection = collection(this._firestore, "likes") as CollectionReference<Likes>;
    this._likes = [];
    this.buttonLike();
    this.getLikes();

    if (this.authServ.isSessionStarted()) {
      console.log("session started");
    }
  }

  // Al iniciar agafem els elements amb Like
  ngOnInit(): void {
    this.buttonLike();
    this.getLikes();
  }

  // Afegim al Firebase el animal seleccionat al ngFor i el UUID del usuari
  likedPet(id_pet) {

    const likes = {
      id_pet: id_pet,
      id_user: this.authServ.getUuuid()
    }

    addDoc(this._likesCollection, likes);
  }
  
  // Borrem el Like del pet mitjançant l'id passat del ngFor
  deletelike(id) {
    let varUuid = '0';

    // Si s'ha establert un UUID, assigno la funció a la variable per estalviar codi (fragment reutilitzat d'una consulta de buttonLike())
    if (this.authServ.getUuuid()) {
      varUuid = this.authServ.getUuuid();
    }
    
    /* #############
    * 1- Recorrem l'array de Likes que conté tots els pets que han sigut Likejats amb les dades de "likes"
    * 2- Si l'id del pet = al pet que s'ha clicat i si el id_user = al UUID
    * 3- Del pet en concret agafo sol la segona estructura del JSON; si tenim -> id_pet: '0', es queda sol el '0'.
    * 4- Agafem del array nou de strings que son resultats del JSON, el 3er element (es el ID del document del like en concret).
    */ 

    for (let i = 0; i < this._likes.length; i++) {
      if (this._likes[i].id_pet == id && this._likes[i].id_user == varUuid) {
        var idDoc = Object.entries(this._likes[i]).map(item => item[1]);
        idDoc = idDoc[2];
      }
    }

    console.log(idDoc);
    console.log(id);

    // Borrem les dades amb la referencia del document agafat al bucle anterior
    const likeDocument = doc(this._firestore, "likes", idDoc.toString()) as DocumentReference<Likes>;
    deleteDoc(likeDocument);

    this.buttonLike();
    this.getLikes();
  }

  buttonLike() {
    let varUuid = '0';

    // Si s'ha establert un UUID, assigno la funció a la variable per estalviar codi per la consulta
    if (this.authServ.getUuuid()) {
      varUuid = this.authServ.getUuuid();
    }

    // D'aquesta consulta es important el idField ja que serà la referencia del Document (necessari per borrar)
    collectionData(query(this._likesCollection, where('id_user', '==', varUuid)), {idField: 'id'}).subscribe(
      (dbLikes: Likes[]) => {
        this._likes = dbLikes;
      }
    );

  } 

  // Aqui passo el query del collectionData
  getLikes() {
    return this._likes;
  }
}

  


