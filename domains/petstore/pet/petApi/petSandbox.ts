import { APIRequestContext } from "@playwright/test";
import { PetApi } from "./petApi";
import { Pet, PetStatus } from "../petModels/petModels";

export class PetApiSandbox {
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

  async findPetById(petId: number) {
    return this.petApi.findPetById(petId);
  }

  async deletePet(petId: number) {
    return this.petApi.deletePet(petId);
  }

  async updatePetName(pet: Pet, petName: string) {
    pet.name = petName;
    return await this.petApi.updatePet(pet);
  }
}
