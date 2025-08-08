import { CategoryType, WalletType } from "../src/generated/prisma";
import { faker } from "@faker-js/faker";

export function fakeUser() {
  return {
    email: faker.internet.email(),
    name: faker.person.fullName(),
    updatedAt: faker.date.anytime(),
  };
}
export function fakeUserComplete() {
  return {
    id: faker.string.uuid(),
    email: faker.internet.email(),
    name: faker.person.fullName(),
    createdAt: new Date(),
    updatedAt: faker.date.anytime(),
  };
}
export function fakeIcon() {
  return {
    code: faker.lorem.words(5),
    updatedAt: faker.date.anytime(),
  };
}
export function fakeIconComplete() {
  return {
    id: faker.string.uuid(),
    code: faker.lorem.words(5),
    idUser: faker.string.uuid(),
    createdAt: new Date(),
    updatedAt: faker.date.anytime(),
  };
}
export function fakeWallet() {
  return {
    name: faker.person.fullName(),
    type: faker.helpers.arrayElement([
      WalletType.Cash,
      WalletType.Debit,
      WalletType.Credit,
      WalletType.Crypto,
    ] as const),
    updatedAt: faker.date.anytime(),
  };
}
export function fakeWalletComplete() {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    initBalance: 0,
    type: faker.helpers.arrayElement([
      WalletType.Cash,
      WalletType.Debit,
      WalletType.Credit,
      WalletType.Crypto,
    ] as const),
    idUser: faker.string.uuid(),
    idIcon: undefined,
    createdAt: new Date(),
    updatedAt: faker.date.anytime(),
  };
}
export function fakeCategory() {
  return {
    name: faker.person.fullName(),
    type: faker.helpers.arrayElement([
      CategoryType.Income,
      CategoryType.Expense,
    ] as const),
    updatedAt: faker.date.anytime(),
  };
}
export function fakeCategoryComplete() {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    idUser: faker.string.uuid(),
    idIcon: undefined,
    idParent: undefined,
    type: faker.helpers.arrayElement([
      CategoryType.Income,
      CategoryType.Expense,
    ] as const),
    createdAt: new Date(),
    updatedAt: faker.date.anytime(),
  };
}
export function fakeTransaction() {
  return {
    amount: faker.number.float(),
    note: undefined,
    updatedAt: faker.date.anytime(),
  };
}
export function fakeTransactionComplete() {
  return {
    id: faker.string.uuid(),
    idUser: faker.string.uuid(),
    idWallet: undefined,
    idCategory: undefined,
    idIcon: undefined,
    amount: faker.number.float(),
    note: undefined,
    date: new Date(),
    createdAt: new Date(),
    updatedAt: faker.date.anytime(),
  };
}
