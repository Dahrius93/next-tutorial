// the following HTTP methods are supported: GET, POST, PUT, PATCH, DELETE, HEAD, and OPTIONS.
// If an unsupported method is called, Next.js will return a 405 Method Not Allowed response.

import { NextRequest, NextResponse } from "next/server";
import { fetchUsers, saveUser } from "@/utils/actions";

// export const GET = async () => {
//   const users = await fetchUsers();
//   return Response.json({ users });
// };

// export const GET = async (request: Request) => {
//   const { searchParams } = new URL(request.url);
//   const id = searchParams.get("id");
//   console.log(id);

//   const users = await fetchUsers();
//   return Response.json({ users });
// };

export const GET = async (request: NextRequest) => {
  console.log(request.url);
  console.log(request.nextUrl.searchParams.get("id"));

  const users = await fetchUsers();
  // return NextResponse.redirect(new URL("/", request.url));
  return Response.json({ users });
};

export const POST = async (request: Request) => {
  const user = await request.json();
  const newUser = { ...user, id: Date.now().toString() };
  await saveUser(newUser);
  return Response.json({ msg: "user created" });
};
