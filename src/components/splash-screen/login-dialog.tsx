'use client';

import getSplashText, { getLoginButtonText, ID_URL_PARAM } from "@/constants/strings"
import { useRouter } from "next/navigation";
import { useState } from "react"
import "./splash-screen.css";
import { getOrCreateChatUUID, getOrCreateUsername, setUsername } from "@/lib/uuid";

export default function LoginDialog() {

    const [splashText] = useState(getSplashText());
    const router = useRouter();
    const buttonText = getLoginButtonText();
    const [userName, setUserName] = useState(getOrCreateUsername())

    return <div className="h-[256px] w-[39vw] min-w-[640px] rounded-2xl">
        <div className="flex flex-col place-content-center place-items-center h-[100%] w-[100%] rounded-2xl px-[50px] gap-5 text-white font-semi-bold">
            <p className="text-3xl text-center fade-in-2sec">{splashText}</p>
            <input value={userName} onChange={(target)=>{setUserName(target.currentTarget.value)}} className="w-fit h-fit bg-linear-to-tr from-[#28021a] to-[#1a0427] fade-in-3sec rounded-full px-[5%] py-[2%] text-white text-2xl" placeholder="Enter Username" type="text"/>
            <button onClick={()=>{
                if(userName == "" || userName == null)
                {
                    return;
                }
                setUsername(userName)
                router.push(`/dashboard?${ID_URL_PARAM}=${getOrCreateChatUUID()
                }`)}} className="text-3xl relative w-fit h-fit cursor-pointer fade-in-3sec">
                <div className="w-full top-0 rounded-full  bg-linear-to-tr from-pink-600/90 to-purple-700/90 p-0.5">
                    <div className="rounded-full px-[39px] py-[10px] bg-[#000C]">{buttonText}</div>
                </div>
                <div className="absolute w-full rounded-full top-0 bg-linear-to-br from-pink-400 to-purple-400 p-0.5 text-black opacity-0 hover:opacity-100 transition duration-150 shadow-lg shadow-pink-500/50">
                    <div className="rounded-full px-[39px] py-[10px] bg-[#000D]">
                        <div className="bg-linear-to-r from-pink-400 to-purple-300 bg-clip-text text-transparent">{buttonText}</div>
                    </div>
                </div>
            </button>
        </div>
    </div>
}