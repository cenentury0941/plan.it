import { flyTo } from "@/features/places/place-slice";
import { useAppDispatch } from "@/lib/hooks";
import { Place } from "@/lib/types";
import { FileDown, ScanEye } from "lucide-react";
import Image from "next/image";
import "./plan-item-print-only.css";

export default function PlanItem({place, selected}: {place: Place, selected: boolean}){
    
    const dispatch = useAppDispatch();
    const clickHandler = () => {
        dispatch(flyTo(place))
    }
    const url = `https://plan-it-git-main-cenentury0941s-projects.vercel.app/ar?lat=${place.lat}&lon=${place.lng}&text=${encodeURIComponent(
        place.name
      )}&subtext=${encodeURIComponent(place.shortDescription)}`;

    return <div onClick={clickHandler} className={`flex ${selected ? "shadow-lg shadow-[#ffb8ff] from-pink-200 to-purple-200" : "shadow-md shadow-[#8b4cc7] from-pink-300 to-purple-400"} hover:shadow-lg hover:scale-102 active:scale-100 active:shadow-transparent bg-linear-to-br w-[90%] aspect-[2] rounded-2xl p-0.5 cursor-pointer select-none transition duration-50`}>
        <div className="h-full w-full bg-[#000B] rounded-2xl flex flex-col overflow-hidden text-[#ffd6e9] relative">
            <div className="printContent absolute top-2 right-2 h-[5vh] w-[5vh] bg-transparent transition duration-150 hover:bg-linear-to-bl hover:from-pink-300 hover:to-purple-400 rounded-full p-0.5 cursor-pointer">
            <a href={url}>
                <div onClick={()=>{}} className="h-full w-full p-1 transition duration-150 hover:bg-black/80 rounded-full"><ScanEye className='h-full w-full' color='#ffd6e9'/></div>
            </a> 
            </div>
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
            <div className="w-full h-fit text-2xl/6 px-3 py-2">
                <div className="line-clamp-3">
                    {place.shortDescription}
                </div>
            </div>
        </div>
    </div>
}