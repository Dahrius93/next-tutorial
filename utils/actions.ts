"use server";

export const createUser = async (formData: FormData) => {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const rawData = Object.fromEntries(formData);
  console.log(rawData);
  console.log(firstName, lastName);
};
