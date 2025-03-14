import { APIRequestContext } from "@playwright/test";
import { Pet } from "../petModels/petModels";

export class PetApi {
  private readonly baseUrl: string;

  constructor(
    private readonly request: APIRequestContext,
    baseUrl: string = process.env.PET_STORE_URL!
  ) {
    if (!baseUrl) {
      throw new Error('PET_STORE_URL environment variable is required');
    }
    this.baseUrl = baseUrl;
  }

  async addNewPetToTheStore(data: Pet) {
    return this.request.post(this.baseUrl, { data });
  }

  async deletePet(petId: number) {
    return this.request.delete(`${this.baseUrl}/${petId}`);
  }

  async findPetById(petId: number) {
    return this.request.get(`${this.baseUrl}/${petId}`);
  }

  async updatePet(data: Pet) {
    return this.request.put(this.baseUrl, { data });
  }
}
