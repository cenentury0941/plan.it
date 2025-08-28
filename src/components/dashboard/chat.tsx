import { BotMessageSquare, Send, UserPlus } from "lucide-react";
import ChatMessage from "./chat-message";
import { useEffect, useRef, useState } from "react";
import { generateRandomSource } from "@/lib/debug";
import { canScrollCallback } from "@/lib/utils";
import { getOrCreateChatUUID, getOrCreateUsername, getUsername } from "@/lib/uuid";
import { postMessage, setupMessageListener } from "@/lib/firebase";
import { ChatLog, Place } from "@/lib/types";
import { mapChatLogsToMessages, sendChat } from "@/api/openai";
import { useAppSelector } from "@/lib/hooks";

export default function Chat(){

    const places = useAppSelector((state)=>{return state.places.places}) as Place[]
    const [messages, setMessages] = useState<ChatLog[]>([])
    const [inputMessage, setInputMessage] = useState("")
    const [ canScroll , setCanScroll ] = useState<"NONE"|"BOTH"|"UP"|"DOWN">("NONE")
    const latestMessagesRef = useRef(messages);
    var lastMessage = "";

    const postMessageHandler = () => {
        lastMessage = inputMessage;
        postMessage({source: "User", message: lastMessage, username: getUsername(), ts: Date.now()}, getOrCreateChatUUID())
        setInputMessage("");
    }

    function submit(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            postMessageHandler()
        }
      }

    const invokeAI = async (msg: ChatLog[]) => {
        var chatResponse = await sendChat(mapChatLogsToMessages(messages, places));
        if(chatResponse != null)
        {
            postMessage(chatResponse.msg, getOrCreateChatUUID())
            if(chatResponse.rec)
            {
                postMessage({source: "System", message: chatResponse.rec, username: "TOOL CALL RESPONSE", ts: Date.now()}, getOrCreateChatUUID())
            }
        }
    }

    useEffect( () => {
        latestMessagesRef.current = messages;
        console.log(`Messages Updates | ${getUsername()}`)
        if(messages.length == 0 || messages.at(0).username != getUsername())
        {
            return;
        }
        setTimeout( () => {
            console.log("Pinging AI")
            invokeAI(latestMessagesRef.current);  
        } , 1000 )
    }, [messages] )

    useEffect( () => {
        canScrollCallback("chat-messages-container" , setCanScroll, true)
        setupMessageListener(getOrCreateChatUUID(), setMessages)
    } , [] )

    const [copied, setCopied] = useState(false);

    const copyModifiedUrl = async (): Promise<string> => {
      const currentUrl = new URL(window.location.href);
  
      // Build new URL with root path but keep the query params
      const newUrl = `${currentUrl.origin}/${currentUrl.search}`;
  
      try {
        await navigator.clipboard.writeText(newUrl);
        console.log("Copied to clipboard:", newUrl);
        setCopied(true);
  
        // Hide after 3 seconds
        setTimeout(() => setCopied(false), 3000);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
  
      return newUrl;
    };

    return <div className="pointer-events-auto absolute right-0 h-full w-[28%] pl-0.75 bg-linear-to-br to-[#733da5] from-[#9d78ff] shadow-[-10px_5px_20px_rgba(14,5,23,0.39)] reveal-right">
        <div className="h-full w-full bg-black/60 pt-[2%]">
            <div className='relative flex px-[5%] flex-row h-[calc(100%-93vh)] w-full place-content-center place-items-center gap-2'>
                <BotMessageSquare className='h-[3vh] w-[3vh]' color='#ffd6e9'/>
                <p className='shrink-0 grow-0 mr-auto text-[4vh] pt-[5px] text-[#ffd6e9]'>AI Chat</p>
          
                {copied && (
                    <p className='shrink-0 grow-0 ml-auto text-[2.5vh] pt-[5px] text-[#ffd6e9]'>Link Copied!</p>
                )}

                <div className="h-[3.9vh] w-[3.9vh] bg-transparent transition duration-150 hover:bg-linear-to-bl hover:from-pink-300 hover:to-purple-400 rounded-full p-0.5 cursor-pointer"><div className="h-full w-full p-1 transition duration-150 hover:bg-black/80 rounded-full">
                <UserPlus onClick={copyModifiedUrl} className='h-full w-full' color='#dac4ff'/></div></div>
                <div className='absolute bottom-0 h-[1px] w-[90%] bg-[#ffd6e9aa]' />
            </div>
            <div className="relative h-[calc(100%-12vh)] grow-0">
                <div className={`absolute h-[4vh] w-full bg-linear-to-t to-[#000A] from-[#0000] top-0 transition duration-150 opacity-0 ${(canScroll == "UP" || canScroll == "BOTH") && "opacity-100"}`}/>
                <div className={`absolute h-[4vh] w-full bg-linear-to-b to-[#000A] from-[#0000] bottom-0 transition duration-150 opacity-0 ${(canScroll == "DOWN" || canScroll == "BOTH") && "opacity-100"}`}/>
                <div id="chat-messages-container" className="w-full h-full grow-0 overflow-scroll px-2 flex flex-col-reverse pt-10 pb-5">
                {messages.map( (item) => {return <ChatMessage key={item.ts} chatLog={item} />} )}
                </div>
            </div>
            <div className="flex h-[calc(100%-94vh)] px-[3%] gap-1">
                <div className="h-full w-full rounded-full bg-linear-to-br to-[#733da5] from-[#9d78ff] p-0.5">
                <input onKeyDown={submit} value={inputMessage} onChange={(target)=>{setInputMessage(target.currentTarget.value)}} className="w-full h-full bg-[#000C] rounded-full px-[5%] text-white text-2xl" placeholder="Enter messages to chat" type="text"/>
                </div>
                <div className="aspect-square h-full rounded-full bg-linear-to-br to-[#733da5] from-[#9d78ff] p-0.5">
                    <button onClick={postMessageHandler} className="cursor-pointer flex rounded-full h-full w-full bg-[#000C] shrink-0 place-items-center place-content-center pt-[2px] pr-[2px]">
                        <Send color="#dac4ff"/>
                    </button>
                </div>
            </div>
        </div>
    </div>
}