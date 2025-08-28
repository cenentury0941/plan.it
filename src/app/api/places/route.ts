import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const long = searchParams.get("long");
  const query = searchParams.get("query");

  if (!lat || !long || !query) {
    return NextResponse.json({ error: "Missing lat, long, or query" }, { status: 400 });
  }

  const apiKey = process.env.FSQ_API_KEY!;
  const url = `https://places-api.foursquare.com/places/search?query=${encodeURIComponent(
    query
  )}&ll=${lat},${long}&radius=1000`;

  try {
    const response = await fetch(url, {
      headers: {
        accept: "application/json",
        authorization: `Bearer ${apiKey}`,
        "X-Places-Api-Version": "2025-06-17",
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Foursquare API error" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data.results.slice(0, 3));
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch places" }, { status: 500 });
  }
}
