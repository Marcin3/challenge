import {Pet} from "./petModels";

export class PetBuilder {

    private pet: Pet = {
        id: 1,
        name: "DefaultPet",
        photoUrls: ["magicLink"],
        status: "available",
        tags: []
    };

    withId(id: number): PetBuilder {
        this.pet.id = id;
        return this;
    }

    withName(name: string): PetBuilder {
        this.pet.name = name;
        return this;
    }

    build(): Pet {
        return {...this.pet};
    }

}