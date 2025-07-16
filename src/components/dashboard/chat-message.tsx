import { ChatLog } from "@/lib/types";
import { formatTime24 } from "@/lib/utils";

export default function ChatMessage({chatLog}:{chatLog:ChatLog}){
    switch(chatLog.source){
        case "User": return <div className="flex flex-col max-w-[66%] min-w-[33%] w-fit ml-auto my-2">
        <div className="w-fit ml-auto text-white pr-3">{formatTime24(chatLog.ts)}</div>
        <div className="h-full w-full text-xl/5 break-all bg-linear-to-br from-white to-purple-200 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl p-0.5">
        <div className="h-full w-full py-2 px-4 rounded-tl-xl rounded-tr-xl rounded-bl-xl">{chatLog.message}</div>
        </div>
        </div>

        case "Other" : return <div className="flex flex-col max-w-[66%] min-w-[33%] w-fit mr-auto my-2">
        <div className="flex">
            <div className="w-fit pl-3 text-[#ffd6e9] text-lg">{chatLog.username}</div>
            <div className="w-fit ml-auto pr-3 text-[#ffd6e9] mt-auto">{formatTime24(chatLog.ts)}</div>
        </div>
        <div className="h-full w-full text-xl/5 break-all bg-linear-to-br from-purple-300 to-purple-400 text-black rounded-tl-2xl rounded-tr-2xl rounded-br-2xl p-0.5">
        <div className="h-full w-full py-2 px-4 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl">{chatLog.message}</div>
        </div>
        </div>

        case "Bot": return <div className="flex flex-col max-w-[66%] min-w-[33%] w-fit mr-auto my-2">
        <div className="flex">
            <div className="w-fit mx-3 font-semibold bg-linear-to-l from-pink-300 to-purple-400 bg-clip-text text-transparent text-lg">Plan.It AI</div>
            <div className="w-fit ml-auto mt-auto pr-3 text-[#ffd6e9]">{formatTime24(chatLog.ts)}</div>
        </div>
        <div className="shadow-lg shadow-[#8b4cc7] text-xl/5 break-all bg-linear-to-bl from-pink-300 to-purple-400 text-white rounded-tl-2xl rounded-tr-2xl  rounded-br-2xl p-0.5">
        <div className="h-full w-full py-2 px-4 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl bg-[#0009]">{chatLog.message}</div>
        </div>
        </div>
    }
}