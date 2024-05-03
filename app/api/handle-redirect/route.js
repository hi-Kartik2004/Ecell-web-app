import { redirect } from "next/navigation";

export async function GET(req) {
  //   const redirectUrl = await req.json();
  const url = new URL(req.url);
  const redirectUrl = url.searchParams.get("redirectUrl");

  redirect("/" + redirectUrl);
  return Response.json({
    redirectUrl: redirectUrl,
  });
}
