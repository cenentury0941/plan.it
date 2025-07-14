'use client'

import Chat from '@/components/dashboard/chat'
import LogoBanner from '@/components/dashboard/logo-banner'
import Map from '@/components/dashboard/map'
import Plan from '@/components/dashboard/plan'

export default function Dashboard(){
    return <div className='h-screen w-screen'>
        <div className='z-[1024] h-full w-full absolute pointer-events-none'>
            <LogoBanner />
            <Chat />
            <Plan />
        </div>
        <Map />
    </div>
}