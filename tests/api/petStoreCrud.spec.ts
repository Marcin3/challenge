import { expect, test } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { StatusCodes } from "http-status-codes";
import { PetApiSandbox } from "../../domains/petstore/pet";
import { Pet } from "../../domains/petstore/pet/petModels/petModels";

test("Pet Crud", async ({ request }) => {
  const petId = faker.datatype.number({ min: 1000000 });
  const petName = faker.name.firstName();
  const updatedPetName = faker.name.firstName();
  let createdPet: Pet;
  const petApiSandbox = new PetApiSandbox(request);

  await test.step(`Create Pet with name ${petName}`, async () => {
    const response = await petApiSandbox.addNewPetToTheStore(petId, petName);
    expect(
      response.status(),
      `response status should be ${StatusCodes.OK}`
    ).toBe(StatusCodes.OK);
  });

  await test.step(`Read created pet`, async () => {
    const response = await petApiSandbox.findPetById(petId);
    expect(
      response.status(),
      `response status should be ${StatusCodes.OK}`
    ).toBe(StatusCodes.OK);
    createdPet = await response.json();
    expect(createdPet.name).toBe(petName);
  });

  await test.step(`Update name of pet to ${updatedPetName}`, async () => {
    const response = await petApiSandbox.updatePetName(
      createdPet,
      updatedPetName
    );

    expect(
      response.status(),
      `response status should be ${StatusCodes.OK}`
    ).toBe(StatusCodes.OK);
  });

  await test.step(`Read updated pet`, async () => {
    const response = await petApiSandbox.findPetById(petId);
    expect(
      response.status(),
      `response status should be ${StatusCodes.OK}`
    ).toBe(StatusCodes.OK);
    const updatedPet = await response.json();
    expect(updatedPet.name).toBe(updatedPetName);
  });

  await test.step(`Delete pet`, async () => {
    const response = await petApiSandbox.deletePet(petId);
    expect(
      response.status(),
      `response status should be ${StatusCodes.OK}`
    ).toBe(StatusCodes.OK);
  });

  await test.step(`Check if pet was deleted properly`, async () => {
    const response = await petApiSandbox.findPetById(petId);
    expect(
      response.status(),
      `response status should be ${StatusCodes.NOT_FOUND}`
    ).toBe(StatusCodes.NOT_FOUND);
  });
});
