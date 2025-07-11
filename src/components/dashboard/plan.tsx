import { FileDown, Plane } from 'lucide-react'
import './dashboard.css'

export default function Plan(){
    return <div className="absolute left-0 h-full w-[28%] pr-0.75 bg-linear-to-br to-[#9d78ff] from-[#f79ec8] shadow-[10px_5px_20px_rgba(14,5,23,0.39)] reveal-left">
        <div className="h-full w-full bg-black/60 pt-[2%]">
            <div className='relative flex px-[5%] flex-row h-[calc(100%-93vh)] w-full place-content-center place-items-center gap-2'>
                <Plane className='h-[3vh] w-[3vh]' color='#ffd6e9'/>
                <p className='shrink-0 grow-0 mr-auto text-[4vh] pt-[5px] text-[#ffd6e9]'>Your Plan</p>
                <FileDown className='h-[3vh] w-[3vh]' color='#dac4ff'/>
                <div className='absolute bottom-0 h-[1px] w-[90%] bg-[#ffd6e9aa]' />
            </div>
            <div className='h-[calc(100%-7vh)] w-full place-content-center place-items-center'>
                <p className='text-[#ffd6e9] text-2xl select-none'>Your itinerary is empty :(</p>
            </div>
        </div>
    </div>
}