import { flyTo } from "@/features/places/place-slice";
import { useAppDispatch } from "@/lib/hooks";
import { ChatLog, Place } from "@/lib/types";
import { formatTime24 } from "@/lib/utils";
import { getOrCreateUsername, getUsername } from "@/lib/uuid";
import { Globe, MapPin } from "lucide-react";

export default function ChatMessage({chatLog}:{chatLog:ChatLog}){
    const dispatch = useAppDispatch()

    switch(chatLog.source){
        case "User": 
        if(chatLog.username == getUsername()) {
            return <div className="flex flex-col max-w-[66%] min-w-[33%] w-fit ml-auto my-2">
            <div className="w-fit ml-auto text-white pr-3">{formatTime24(chatLog.ts)}</div>
            <div className="h-full w-full text-xl/5 break-all bg-linear-to-br from-white to-purple-200 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl p-0.5">
            <div className="h-full w-full py-2 px-4 rounded-tl-xl rounded-tr-xl rounded-bl-xl break-normal">{chatLog.message}</div>
            </div>
            </div>
        } else {
            return <div className="flex flex-col max-w-[66%] min-w-[33%] w-fit mr-auto my-2">
            <div className="flex">
                <div className="w-fit pl-3 text-[#ffd6e9] text-lg mt-auto">{chatLog.username}</div>
                <div className="w-fit ml-auto pr-3 text-[#ffd6e9] mt-auto">{formatTime24(chatLog.ts)}</div>
            </div>
            <div className="h-full w-full text-xl/5 break-all bg-linear-to-br from-purple-300 to-purple-400 text-black rounded-tl-2xl rounded-tr-2xl rounded-br-2xl p-0.5">
            <div className="h-full w-full py-2 px-4 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl break-normal">{chatLog.message}</div>
            </div>
            </div>
        }

        case "Bot": return <div className="flex flex-col max-w-[66%] min-w-[33%] w-fit mr-auto my-2">
        <div className="flex">
            <div className="w-fit mx-3 font-semibold bg-linear-to-l from-pink-300 to-purple-400 bg-clip-text text-transparent text-lg mt-auto">Plan.It AI</div>
            <div className="w-fit ml-auto mt-auto pr-3 text-[#ffd6e9]">{formatTime24(chatLog.ts)}</div>
        </div>
        <div className="shadow-lg shadow-[#8b4cc7] text-xl/5 break-all bg-linear-to-bl from-pink-300 to-purple-400 text-white rounded-tl-2xl rounded-tr-2xl  rounded-br-2xl p-0.5">
        <div className="h-full w-full py-2 px-4 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl bg-[#0009] break-normal">{chatLog.message}</div>
        </div>
        </div>

        case "System": {
            const places = Object.values(chatLog.message).slice(0, 3);

            return (
                <div className="flex flex-col max-w-[66%] min-w-[33%] w-fit mr-auto my-2">
                    <div className="flex">
                        <div className="w-fit mx-3 font-semibold bg-linear-to-l from-pink-300 to-purple-400 bg-clip-text text-transparent text-lg mt-auto">
                            FourSquare API
                        </div>
                        <div className="w-fit ml-auto mt-auto pr-3 text-[#ffd6e9]">
                            {formatTime24(chatLog.ts)}
                        </div>
                    </div>

                    <div className="shadow-lg shadow-[#8b4cc7] bg-linear-to-bl from-pink-300 to-purple-400 text-white rounded-tl-2xl rounded-tr-2xl rounded-br-2xl p-0.5">
                        <div className="h-full w-full py-3 px-2 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl bg-[#0009] flex flex-col gap-3">
                            {places.length > 0 ? (
                                places.map((place: any, i: number) => {
                                    const category = place.categories?.[0]?.name || "Unknown";
                                    return (
                                        <div
                                            key={i}
                                            className="flex flex-col gap-2 p-3 rounded-xl bg-[#111A] shadow-md"
                                        >
                                            {/* Label */}
                                            <div className="font-semibold text-lg text-pink-200">
                                                {place.name}
                                            </div>
                                            <div className="text-sm text-gray-300">
                                                {category}
                                            </div>

                                            {/* Buttons */}
                                            <div className="flex gap-2">
                                                {place.website && (
                                                    <a
                                                        href={place.website}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-1 bg-gradient-to-r from-purple-400 to-pink-300 hover:from-pink-400 hover:to-purple-400 text-white font-medium py-1.5 px-3 rounded-lg shadow-md text-sm"
                                                    >
                                                        <Globe size={16} />
                                                        Website
                                                    </a>
                                                )}
                                                <a
                                                    onClick={() => {
                                                        const target: Place = {
                                                            id: place.fsq_place_id || 1024, 
                                                            type: place.categories?.[0]?.name || "Unknown",
                                                            name: place.name,
                                                            lat: place.latitude,
                                                            lng: place.longitude,
                                                            shortDescription:
                                                                place.categories?.[0]?.short_name ||
                                                                place.location?.formatted_address ||
                                                                ""
                                                        };
                                                        dispatch(flyTo(target));
                                                    }}
                                                    className="flex items-center gap-1 bg-gradient-to-r from-purple-400 to-pink-300 hover:from-pink-400 hover:to-purple-400 text-white font-medium py-1.5 px-3 rounded-lg shadow-md text-sm cursor-pointer"
                                                >
                                                    <MapPin size={16} />
                                                    Show on Map
                                                </a>

                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="text-sm text-gray-300">No places found</div>
                            )}
                        </div>
                    </div>
                </div>
            );
        }


    }
}