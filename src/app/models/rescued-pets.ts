import { Pet } from '../models/pet.model';

export class RescuedPets {
  private _pets: Pet[];

    constructor() {
        this._pets = [];
    }

    get getPet(): Pet[] {
        return this._pets;
    }

    set setPet(pets: Pet[]) {
        this._pets = pets;
    }
}