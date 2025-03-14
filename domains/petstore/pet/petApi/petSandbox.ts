import { APIRequestContext } from "@playwright/test";
import { PetApi } from "./petApi";
import { Pet } from "../petModels/petModels";

export class PetSandbox {
  private petApi: PetApi;

  constructor(request: APIRequestContext) {
    this.petApi = new PetApi(request);
  }

  async addNewPetToTheStore(id: number, name: string) {
    const pet: Pet = {
      id,
      name,
      photoUrls: ["magicLink"],
      status: "available",
    };

    return await this.petApi.addNewPetToTheStore(pet);
  }

  async expectPet(id: number, name: string): Promise<Pet> {
    const expectedPet: Pet = {
      id,
      name,
      photoUrls: ["magicLink"],
      tags: [],
      status: "available"
    };

    return expectedPet;
  }

  async findPetById(petId: number) {
    return this.petApi.findPetById(petId);
  }

  async deletePet(petId: number) {
    return this.petApi.deletePet(petId);
  }

  async updatePet(pet: Pet) {  
    return await this.petApi.updatePet(pet);
  }
}
