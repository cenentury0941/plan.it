import { Place } from "@/lib/types";
import Image from "next/image";

export default function PlanItem({place}: {place: Place}){
    
    return <div className="flex shadow-md shadow-[#8b4cc7] bg-linear-to-br from-pink-300 to-purple-400 w-[90%] aspect-[2] rounded-2xl p-0.5">
        <div className="h-full w-full bg-[#000B] rounded-2xl flex flex-col overflow-hidden text-[#ffd6e9]">
            <div className="w-full h-fit flex px-2 py-2">
                <div className="h-full aspect-[1] grow-0 p-0.5 bg-linear-to-br from-purple-300 to-purple-400 rounded-xl">
                <Image
                    className="aspect-square h-full rounded-xl"
                    src="/fuji1_square.jpg"
                    alt="Plan.it logo"
                    width={90}
                    height={90}
                    priority
                />
                </div>
                <div className="h-full w-full flex flex-col px-2">
                    <div className="text-3xl/7 line-clamp-1 mt-auto">{place.name}</div>
                    <div className="text-xl/6 line-clamp-1">{place.type}</div>
                </div>
            </div>
            <div className="w-full flex h-[1%] px-2">
                <div className='place-self-center mx-auto h-[1px] w-full bg-[#ffd6e9aa]'/>
            </div>
            <div className="w-full h-fit text-2xl px-3 py-2">
                <div className="line-clamp-3">
                    {place.description}
                </div>
            </div>
        </div>
    </div>
}