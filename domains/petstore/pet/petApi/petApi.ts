import { APIRequestContext } from "@playwright/test";

export class PetApi {
  // TODO use env do środowisk
  constructor(private readonly request: APIRequestContext) {}

  async addNewPetToTheStore(data) {
    const url = `https://petstore.swagger.io/v2/pet`;
    return this.request.post(url, { data });
  }

  async deletePet(petId: number) {
    const url = `https://petstore.swagger.io/v2/pet/${petId}`;
    return this.request.delete(url);
  }

  async findPetById(petId: number) {
    const url = `https://petstore.swagger.io/v2/pet/${petId}`;
    return this.request.get(url);
  }

  async updatePet(data) {
    const url = `https://petstore.swagger.io/v2/pet`;
    return this.request.put(url, { data });
  }
}
