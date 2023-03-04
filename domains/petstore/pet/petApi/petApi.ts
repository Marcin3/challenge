import { APIRequestContext } from "@playwright/test";

export class PetApi {
  constructor(private readonly request: APIRequestContext) {}

  async addNewPetToTheStore(data) {
    const url = process.env.PET_STORE_URL;
    return this.request.post(url!, { data });
  }

  async deletePet(petId: number) {
    const url = `${process.env.PET_STORE_URL}/${petId}`;
    return this.request.delete(url);
  }

  async findPetById(petId: number) {
    const url = `${process.env.PET_STORE_URL}/${petId}`;
    return this.request.get(url);
  }

  async updatePet(data) {
    const url = process.env.PET_STORE_URL;
    return this.request.put(url!, { data });
  }
}
