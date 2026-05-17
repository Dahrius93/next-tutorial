// esempio middleware
// il middleware gira prima della pagina e si può
// usare per cose come
// auth, redirect, ab/testing, gocalizzazione

// in questo esempio, se si naviga su "/about"
// il middleware intercetta la route enzichè mostrare
// la pagina "/about" mostra un json con scritto "hello there"

export function middleware(request) {
  return Response.json({ msg: "hello there" });
}

export const config = {
  matcher: "/about",
};
