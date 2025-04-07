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
    const responseBody = await response.json() as Pet;
    expect(responseBody).toEqual(petSandbox.expectPet(petId, petName));
  });

  await test.step(`Read created pet`, async () => {
      await expect(async () => {
          const response = await petSandbox.findPetById(petId);
          expect(response.status()).toBe(StatusCodes.OK);
          createdPet = await response.json();
          expect(createdPet.name).toBe(petName);
      }).toPass();
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
    const responseBody: Pet = await response.json() as Pet;
    expect(responseBody).toEqual(petSandbox.expectPet(petId, updatedPetName));
  });

  await test.step(`Read updated pet`, async () => {
      await expect(async () => {
          const response = await petSandbox.findPetById(petId);
          expect(response.status()).toBe(StatusCodes.OK);
          const updatedPet = await response.json();
          expect(updatedPet.name).toBe(updatedPetName);
      }).toPass();
  });

  await test.step(`Delete pet`, async () => {
    const response = await petSandbox.deletePet(petId);
    expect(
      response.status(),
      `response status should be ${StatusCodes.OK}`
    ).toBe(StatusCodes.OK);
  });

  await test.step(`Check if pet was deleted properly`, async () => {
     await expect.poll(async () => {
      const response = await petSandbox.findPetById(petId);
      return response.status();
    }).toBe(StatusCodes.NOT_FOUND);
  });
});
