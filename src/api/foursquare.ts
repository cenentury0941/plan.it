
export async function fetchTop3Places(
    lat: number,
    long: number,
    query: string
  ): Promise<any[]> {
    const apiKey = "HDT4EJTNNSLE1DD52CCA0KPFHQBZMPGOV4G4KAWQDWM5NYL3"; 
    const url = `https://places-api.foursquare.com/places/search?query=${encodeURIComponent(
      query
    )}&ll=${lat}%2C${long}&radius=1000`;
  
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          accept: "application/json",
          authorization: `Bearer ${apiKey}`,
          "X-Places-Api-Version": "2025-06-17",
        },
      });
  
      if (!res.ok) {
        throw new Error(`API error: ${res.status} ${res.statusText}`);
      }
  
      const data = await res.json();
  
      if (!data.results || !Array.isArray(data.results)) {
        throw new Error("Unexpected API response format");
      }
  
      return data.results.slice(0, 3);
    } catch (err) {
      console.error("fetchTop3Places failed:", err);
      return [];
    }
  }