"use server";

import { readFile, writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";

type User = {
  id: string;
  firstName: string;
  lastName: string;
};

export const createUser = async (prevState: any, formData: FormData) => {
  // prevState -> useFormState hook
  "use server";
  console.log(prevState);
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  // const rawData = Object.fromEntries(formData)   second way to access formData
  const newUser: User = { firstName, lastName, id: Date.now().toString() };

  try {
    await saveUser(newUser);
    // la funzione revalidatePath INVALIDA la cache per
    // la route specificata quindi forza l'aggiornamento
    revalidatePath("/actions");
    return "user created successfully..."; // return per useFormState
  } catch (error) {
    console.log(error);
    return "filed to create user";
  }
  // oppure per aggiornare i dati si può
  // scegliere di rappresentare i dati su una pagina
  // diversa in modo da aggiornare i dati durante il redirect
  // però non può stare su trycatch
  // redirect("/");
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

export const deleteUser = async (formData: FormData) => {
  const id = formData.get("id") as string;
  const users = await fetchUsers();
  const updatedUsers = users.filter((user: User) => user.id !== id);
  await writeFile("users.json", JSON.stringify(updatedUsers));
  revalidatePath("/actions");
};

export const removeUser = async (id: string, formData: FormData) => {
  const name = formData.get("name") as string;
  console.log(name);

  const users = await fetchUsers();
  const updatedUsers = users.filter((user) => user.id !== id);
  await writeFile("users.json", JSON.stringify(updatedUsers));
  revalidatePath("/actions");
};
