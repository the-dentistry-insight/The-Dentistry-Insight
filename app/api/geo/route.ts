export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const countryCode = request.headers.get("x-vercel-ip-country");

  return Response.json(
    { country_code: countryCode },
    { headers: { "Cache-Control": "no-store" } }
  );
}
