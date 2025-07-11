import { BotMessageSquare, Send, SendHorizonal, UserPlus } from "lucide-react";

export default function Chat(){
    return <div className="absolute right-0 h-full w-[28%] pl-0.75 bg-linear-to-br to-[#733da5] from-[#9d78ff] shadow-[-10px_5px_20px_rgba(14,5,23,0.39)] reveal-right">
        <div className="h-full w-full bg-black/60 pt-[2%]">
            <div className='relative flex px-[5%] flex-row h-[calc(100%-93vh)] w-full place-content-center place-items-center gap-2'>
                <BotMessageSquare className='h-[3vh] w-[3vh]' color='#ffd6e9'/>
                <p className='shrink-0 grow-0 mr-auto text-[4vh] pt-[5px] text-[#ffd6e9]'>AI Chat</p>
                <UserPlus className='h-[3vh] w-[3vh]' color='#dac4ff'/>
                <div className='absolute bottom-0 h-[1px] w-[90%] bg-[#ffd6e9aa]' />
            </div>
            <div className="h-[calc(100%-12vh)]">
                .
            </div>
            <div className="flex h-[calc(100%-94vh)] px-[3%] gap-1">
                <div className="h-full w-full rounded-full bg-linear-to-br to-[#733da5] from-[#9d78ff] p-0.5">
                <input className="w-full h-full bg-[#000C] rounded-full px-[5%] text-white text-2xl" placeholder="Enter messages to chat" type="text"/>
                </div>
                <div className="aspect-square h-full rounded-full bg-linear-to-br to-[#733da5] from-[#9d78ff] p-0.5">
                    <button className="cursor-pointer flex rounded-full h-full w-full bg-[#000C] shrink-0 place-items-center place-content-center pt-[2px] pr-[2px]">
                        <Send color="white"/>
                    </button>
                </div>
            </div>
        </div>
    </div>
}