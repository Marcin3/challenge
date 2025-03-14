import { expect, test } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { StatusCodes } from "http-status-codes";
import { PetSandbox } from "../../domains/petstore/pet";
import { Pet } from "../../domains/petstore/pet/petModels/petModels";

test("Pet Crud", async ({ request }) => {
  const petId = faker.datatype.number({ min: 1000000 });
  const petName = faker.name.firstName();
  const updatedPetName = faker.name.firstName();
  let createdPet: Pet;
  const petSandbox = new PetSandbox(request);

  await test.step(`Create Pet with name ${petName}`, async () => {
    const response = await petSandbox.addNewPetToTheStore(petId, petName);
    expect(
      response.status(),
      `response status should be ${StatusCodes.OK}`
    ).toBe(StatusCodes.OK);
     const responseBody = await response.json();

    expect(responseBody).toEqual(await petSandbox.expectPet(petId, petName));
  });

  await test.step(`Read created pet`, async () => {
    let response;
    let attempts = 0;
    const maxAttempts = 3;
    
    while (attempts < maxAttempts) {
      response = await petSandbox.findPetById(petId);
      if (response.status() === StatusCodes.OK) {
        break;
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
      attempts++;
    }

    expect(
      response.status(),
      `response status should be ${StatusCodes.OK}`
    ).toBe(StatusCodes.OK);
    createdPet = await response.json();
    expect(createdPet.name).toBe(petName);
  });

  await test.step(`Update name of pet to ${updatedPetName}`, async () => {
    const updatedPetData: Pet = {
      ...createdPet,
      name: updatedPetName
    };
    const response = await petSandbox.updatePet(updatedPetData);

    expect(
      response.status(),
      `response status should be ${StatusCodes.OK}`
    ).toBe(StatusCodes.OK);
    const responseBody = await response.json();
    expect(responseBody).toEqual(await petSandbox.expectPet(petId, updatedPetName));
  });

  await test.step(`Read updated pet`, async () => {
    let response;
    let attempts = 0;
    const maxAttempts = 5;
    
    while (attempts < maxAttempts) {
      response = await petSandbox.findPetById(petId);
      const updatedPet = await response.json();
      if (response.status() === StatusCodes.OK && updatedPet.name === updatedPetName) {
        break;
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
      attempts++;
    }

    expect(
      response.status(),
      `response status should be ${StatusCodes.OK}`
    ).toBe(StatusCodes.OK);
    const updatedPet = await response.json();
    expect(updatedPet.name).toBe(updatedPetName);
  });

  await test.step(`Delete pet`, async () => {
    const response = await petSandbox.deletePet(petId);
    expect(
      response.status(),
      `response status should be ${StatusCodes.OK}`
    ).toBe(StatusCodes.OK);
  });

  await test.step(`Check if pet was deleted properly`, async () => {
    const response = await petSandbox.findPetById(petId);
    expect(
      response.status(),
      `response status should be ${StatusCodes.NOT_FOUND}`
    ).toBe(StatusCodes.NOT_FOUND);
  });
});
