import Image from "next/image";
import './dashboard.css';

export default function LogoBanner(){
    return <div className="flex place-content-center absolute top-0 w-full">
       <div className="bg-linear-to-br to-[#9d78ff] from-[#f79ec8] rounded-br-2xl rounded-bl-2xl pt-0 p-0.5 shadow-[0px_5px_20px_rgba(14,5,23,0.5)] reveal-top">
       <div className="flex flex-row py-0 place-items-center place-content-center bg-black/70 px-[50px] gap-1 rounded-br-2xl rounded-bl-2xl">
            <Image
                className="w-[4vh] h-[4vh]"
                src="/earth_logo.png"
                alt="Plan.it logo"
                width={512}
                height={512}
                priority
            />
            <div className="pt-[0.5vh] text-white text-[4vh] font-semibold">Plan.it</div>
        </div>
        </div>
    </div>
}