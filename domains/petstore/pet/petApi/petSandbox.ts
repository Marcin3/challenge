import {APIRequestContext} from "@playwright/test";
import {PetApi} from "./petApi";
import {Pet} from "../petModels/petModels";
import {PetBuilder} from "../petModels/petBuilder";

export class PetSandbox {
    private petApi: PetApi;

    constructor(request: APIRequestContext) {
        this.petApi = new PetApi(request);
    }

    async addNewPetToTheStore(id: number, name: string) {
        const pet: Pet = new PetBuilder().withId(id).withName(name).build();

        return await this.petApi.addNewPetToTheStore(pet);
    }

    expectPet = (id: number, name: string): Pet => {
        return new PetBuilder().withId(id).withName(name).build();
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
