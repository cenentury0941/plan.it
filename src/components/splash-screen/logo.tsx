import Image from "next/image";
import "./splash-screen.css";

export default function SplashScreenLogo() {
    return <div className="flex place-content-center place-items-center text-white gap-2 overflow-none fade-in-1sec">
        <Image
          className="w-[100px] h-[100px] mb-[20px]"
          src="/earth_logo.png"
          alt="Plan.it logo"
          width={512}
          height={512}
          priority
        />
        <div>
            <p className={`text-[100px]`}>Plan.it</p>
        </div>
    </div>
}