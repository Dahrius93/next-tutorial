"use server";

import { readFile, writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type User = {
  id: string;
  firstName: string;
  lastName: string;
};

export const createUser = async (formData: FormData) => {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  // const rawData = Object.fromEntries(formData)   second way to access formData
  const newUser: User = { firstName, lastName, id: Date.now().toString() };
  await saveUser(newUser);

  // la funzione revalidatePath INVALIDA la cache per
  // la route specificata quindi forza l'aggiornamento
  // revalidatePath("/actions");

  // oppure per aggiornare i dati si può
  // scegliere di rappresentare i dati su una pagina
  // diversa in modo da aggiornare i dati durante il redirect
  redirect("/");
};

export const fetchUsers = async (): Promise<User[]> => {
  const result = await readFile("users.json", { encoding: "utf8" });
  const users = result ? JSON.parse(result) : [];
  return users;
};

const saveUser = async (user: User) => {
  const users = await fetchUsers();
  users.push(user);
  await writeFile("users.json", JSON.stringify(users));
};
