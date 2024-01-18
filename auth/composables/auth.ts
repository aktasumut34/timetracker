import { z } from "zod";
import { throwZodError } from "../server/utils/zodError";
export const useAuth = () => useNuxtApp().$auth;

export const authLogin = async (email: string, password: string) => {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters"),
  });
  try {
    schema.parse({
      email: email,
      password: password,
    });
  } catch (error) {
    throwZodError(error);
  }
  await $fetch("/api/auth/login", {
    method: "POST",
    body: {
      email: email,
      password: password,
    },
  });
  useAuth().redirectTo.value = null;
  await useAuth().updateSession();
  await navigateTo(useAuth().redirectTo.value || "/");
};

export const authRegister = async (
  email: string,
  password: string,
  name: string
) => {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    name: z.string(),
  });
  try {
    schema.parse({
      email: email,
      password: password,
      name: name,
    });
  } catch (error) {
    throwZodError(error);
  }
  await $fetch("/api/auth/register", {
    method: "POST",
    body: {
      email: email,
      password: password,
      name: name,
    },
  });
  return await authLogin(email, password);
};

export const authLogout = async () => {
  await $fetch("/api/auth/logout", {
    method: "POST",
  });
  await useAuth().updateSession();
};
