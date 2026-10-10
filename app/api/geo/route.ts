export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const country = request.headers.get("x-vercel-ip-country");
  return Response.json(
    { country_code: country || null },
    { headers: { "Cache-Control": "no-store" } }
  );
}
