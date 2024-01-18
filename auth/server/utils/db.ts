import { randomUUID } from "uncrypto";
import prisma from "./prisma";
import { type User } from "@prisma/client";

export async function findUserByEmail(email: string): Promise<User> {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user!;
}

export async function createUser(user: Partial<User>) {
  const existingUser = await findUserByEmail(user.email!);
  if (existingUser) {
    throw createError({
      message: "User already exists",
      statusCode: 409,
    });
  }
  const password = await hash(user.password!);
  const newUser = await prisma.user.create({
    data: {
      id: randomUUID(),
      email: user.email!,
      password,
      name: user.name!,
    },
  });
  return newUser;
}

export async function updateUserByEmail(email: string, updates: Partial<User>) {
  const updatedUser = await prisma.user.update({
    where: {
      email,
    },
    data: updates,
  });
  return updatedUser;
}
