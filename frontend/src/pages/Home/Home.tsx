import React from 'react'
import { cn } from '../../utils'
import { Button } from '../../components'

const Home: React.FC =() => {
    return(
        <div className={cn(`m-auto w-full min-h-screen h-full flex justify-center items-center bg-[#09090B]`)}>
            <div className={cn(`w-auto h-auto flex justify-center items-center flex-col gap-8 px-2`)}>
                <h1 className={cn(`text-center text-white text-[clamp(30px,9vw,72px)] capitalize font-bold`)}>Protection that never<br className='hidden sm:block'/> sleeps</h1>
                <p className={cn(`text-center text-[#84848D] text-[clamp(11px,2vw,20px)]`)}>Your possessions deserve constant protection. Always secure your things with <br className='hidden sm:block' /> trust, safety, and reliability. Strong security ensures peace of mind, <br className='hidden sm:block'/> keeping what matters most truly safe.</p>
                <Button variant='twich' className='transition-all duration-200 w-[150px] sm:w-[200px] h-10 text-[15px] bg-white text-[#09090B] border-2 border-[#09090B] hover:bg-[#09090B] hover:text-white hover:border-white border-b rounded-[10px] active:scale-95 active:border active:bg-transparent active:text-white'>Click To Join</Button>
            </div> 
        </div>
    )
}

export default Home
