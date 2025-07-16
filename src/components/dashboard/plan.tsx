import { FileDown, Plane } from 'lucide-react'
import './dashboard.css'
import PlanItem from './plan-item'
import { useEffect, useState } from 'react'
import { canScrollCallback } from '@/lib/utils'
import { Place } from '@/lib/types'
import { debug_places } from '@/lib/debug'

export default function Plan(){

    const Items : Place[] = debug_places;
    const [ canScroll , setCanScroll ] = useState<"NONE"|"BOTH"|"UP"|"DOWN">("NONE");
    
    useEffect( () => {
        canScrollCallback("plan-items-container" , setCanScroll)
    } , [] )

    return <div className="pointer-events-auto absolute left-0 h-full w-[28%] pr-0.75 bg-linear-to-br to-[#9d78ff] from-[#f79ec8] shadow-[10px_5px_20px_rgba(14,5,23,0.39)] reveal-left">
        <div className="h-full w-full bg-black/60 pt-[2%]">
            <div className='relative flex px-[5%] flex-row h-[calc(100%-93vh)] w-full place-content-center place-items-center gap-2'>
                <Plane className='h-[3vh] w-[3vh]' color='#ffd6e9'/>
                <p className='shrink-0 grow-0 mr-auto text-[4vh] pt-[5px] text-[#ffd6e9]'>Your Plan</p>
                <div className="h-[3.9vh] w-[3.9vh] bg-transparent transition duration-150 hover:bg-linear-to-bl hover:from-pink-300 hover:to-purple-400 rounded-full p-0.5 cursor-pointer"><div className="h-full w-full p-1 transition duration-150 hover:bg-black/80 rounded-full"><FileDown className='h-full w-full' color='#dac4ff'/></div></div>
                <div className='absolute bottom-0 h-[1px] w-[90%] bg-[#ffd6e9aa]' />
            </div>
            <div className="relative h-[calc(100%-6vh)] grow-0">
                <div className={`absolute h-[4vh] w-full bg-linear-to-t to-[#000A] from-[#0000] top-0 transition duration-150 opacity-0 ${(canScroll == "UP" || canScroll == "BOTH") && "opacity-100"}`}/>
                <div className={`absolute h-[4vh] w-full bg-linear-to-b to-[#000A] from-[#0000] bottom-0 transition duration-150 opacity-0 ${(canScroll == "DOWN" || canScroll == "BOTH") && "opacity-100"}`}/>
                <div id="plan-items-container" className="w-full h-full grow-0 overflow-scroll py-8 flex flex-col gap-4 place-items-center">
                {Items.map( (item) => {return <PlanItem key={item.id} place={item}/>} )}
                {Items.length == 0 && <p className='text-[#ffd6e9] text-2xl select-none place-self-center my-auto'>Your itinerary is empty :(</p> }
                </div>
            </div> 
        </div>
    </div>
}