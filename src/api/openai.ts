import { getOrCreateChatUUID, getUsername } from "@/lib/uuid";
import { openai } from "../lib/openAIClient";
import { ChatLog, ContentResponse, Place } from "@/lib/types";
import { decodeBase64 } from "@/components/util/string-codec";
import { SYSTEM_MESSAGE } from "@/constants/strings";
import { updateItinerary } from "@/lib/firebase";
import { fetchTop3Places } from "./foursquare";

export type ChatMessage = {
  role: "system" | "user" | "assistant" | "system";
  content: string;
};

export function mapChatLogsToMessages(logs: ChatLog[], places: Place[]): ChatMessage[] {
    var mappedMessages : ChatMessage[] = logs.map((log) => {
        const username = getUsername();
    
        return {
          role: log.source === "User" ? "user" : "assistant", // adapt if you have other sources
          content: JSON.stringify({
            username,
            message: log.message,
          }),
        };
      })
    mappedMessages = [
      {role: "system", content: decodeBase64(SYSTEM_MESSAGE)} , 
      ...mappedMessages.reverse(), 
      {role: "system", content: `Current Itinerary : ${JSON.stringify(places)}`}
    ]
    
    return mappedMessages;
  }

export async function sendChat(
  messages: ChatMessage[],
  model: string = "gpt-4.1"
): Promise<{ msg: ChatLog, rec: any }> {
  const completion = await openai.chat.completions.create({
    model,
    messages,
  });

  const reply = completion.choices[0].message;
  if (!reply) {
    throw new Error("No reply received from OpenAI");
  }

  const parsedContent = JSON.parse(reply.content);
  const message = parsedContent.response;
  const updatedItinerary = parsedContent.updatedItinerary;
  const query = parsedContent.queryParams;
  const latitude = parsedContent.latitude;
  const longitude = parsedContent.longitude;
  var recommendations = null;

  if(updatedItinerary != null && updatedItinerary != undefined)
  {
    updateItinerary(mapContentToPlaces(reply.content), getOrCreateChatUUID())
  }

  if(query != undefined && query != null)
  {
    const res = await fetch(`/api/places?lat=${latitude}&long=${longitude}&query=${query}`);
    recommendations = await res.json();
    // console.log("Recommendations : " , fetchTop3Places(latitude, longitude, query))
    console.log("Recommendations : " , recommendations)
  }

  const aiResponse = {
    source: "Bot",
    message: message ? message : "Error in Fetching AI Response :/" ,
    username: "Bot",
    ts: Date.now(),
  }

  console.log("RESPONSE : " , aiResponse)

  return { msg: aiResponse, rec: recommendations };
}

function mapContentToPlaces(content: string): Place[] {
  try {
    const parsed: ContentResponse = JSON.parse(content);

    return parsed.updatedItinerary.map((item, index) => ({
      id: index,
      name: item.name,
      type: item.type,
      shortDescription: item.shortDescription,
      lat: parseFloat(item.latitude),
      lng: parseFloat(item.longitude),
    }));
  } catch (err) {
    console.error("Invalid content JSON", err);
    return [];
  }
}
