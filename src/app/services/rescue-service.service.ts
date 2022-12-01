import { Injectable } from '@angular/core';
import { Pet } from '../models/pet.model';
import { addDoc, collection, collectionData, CollectionReference, doc, docData, DocumentReference, Firestore, updateDoc, where } from '@angular/fire/firestore';
import { deleteDoc, query } from '@firebase/firestore';
import { RescuedPets } from '../models/rescued-pets';

@Injectable({
  providedIn: 'root'
})

export class RescueServiceService {
  
  private _petsCollection: CollectionReference<Pet>;
  private _Rescue: RescuedPets;
  private _dogs: Pet[];
  private _cats: Pet[];

  constructor(private fireService: Firestore) { 
    this._petsCollection = collection(this.fireService, "pets") as CollectionReference<Pet>;
    this._Rescue = new RescuedPets();
    this._dogs = [];
    this._cats = [];
    this.getDataBBDD();
    this.obtenirGats();
    this.obtenirGossos();

  }

  getDataBBDD() : void {
    collectionData(this._petsCollection, {idField: 'id'}).subscribe(
      (dbPets: Pet[]) => {
        this._Rescue.setPet = dbPets;
        console.log(this._Rescue.getPet);
      }
    );
  }

  obtenirGossos() {
    collectionData(query(this._petsCollection, where('type', '==', "dog")), {idField: 'id'}).subscribe(
      (dbDogsGet: Pet[]) => {
        this._dogs = dbDogsGet;
      }
    );
  }

  obtenirGats() {
    collectionData(query(this._petsCollection, where('type', '==', "cat")), {idField: 'id'}).subscribe(
      (dbCats: Pet[]) => {
        this._cats = dbCats;
      }
    );
  }

  get getDogs(): Pet[] {
    return this._dogs;
  }

  get getCats(): Pet[] {
    return this._cats;
  }

  get getPets() : Pet[] {
    return this._Rescue.getPet;
  }

  addPet(pets: Pet): void {
    addDoc(this._petsCollection, pets);
    this.getDataBBDD();
  }

  updatePet(pet: Pet): void {
    const petDocument = doc(this.fireService, "pets", pet.id) as DocumentReference<Pet>;
    updateDoc(petDocument, pet);
  }

  deletePet(id: string): void {
    const dishDocument = doc(this.fireService, "pets", id) as DocumentReference<Pet>;
    deleteDoc(dishDocument);
  }

}

