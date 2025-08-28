'use client'

import Chat from '@/components/dashboard/chat'
import LogoBanner from '@/components/dashboard/logo-banner'
import LeafletMap from '@/components/dashboard/map'
import Plan from '@/components/dashboard/plan'
import { appCheck, initAppCheck } from '@/lib/firebase'
import { useEffect } from 'react'

export default function Dashboard(){

    useEffect( () => {
        if(!appCheck)
        {  
            initAppCheck();
        }
    } , [] )

    return <div className='h-screen w-screen'>
        <div className='z-[1024] h-full w-full absolute pointer-events-none'>
            <LogoBanner />
            <Chat />
            <Plan />
        </div>
        <LeafletMap />
    </div>
}