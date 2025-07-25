'use client'

import LoginDialog from "@/components/splash-screen/login-dialog";
import SplashScreenLogo from "@/components/splash-screen/logo";
import "../components/splash-screen/splash-screen.css";
import { getData } from "@/lib/firebase";

console.log("Calling Get Data")
getData();

export default function Home() {
  return (
    <div className="grid items-center justify-items-center min-h-screen fuji-background zoom-out"> {/* grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] */}
      <main className="flex flex-col gap-[75px] pt-[5vh] items-center"> 
        <SplashScreenLogo />
        <LoginDialog />
      </main>
    </div>
  );
}
