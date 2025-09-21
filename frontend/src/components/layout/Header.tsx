import { useNavigate } from 'react-router-dom';
import { cn } from '../../utils';

const Header: React.FC =() => {

    let navigate = useNavigate()

    return (
        <>
            <div className={cn('fixed text-center bg-transparent text-white w-screen h-20 flex justify-around items-center gap-10 z-10')}>
                <div className='flex justify-center items-center'><h1 className='font-bold text-2xl'>S - BRAIN</h1></div>
                <div className='flex justify-center items-center gap-8'>
                    <div onClick={()=> navigate('/signin')} className='flex justify-center items-center bg-transparent hover:bg-black text-white hover:shadow-[0px_2px_2px_rgba(255,255,255,0.7)] hover:-translate-y-0.5 active:scale-95 transition duration-200 px-4 py-1 rounded-2xl cursor-pointer'>
                        <p>Sign In</p>
                    </div>
                    <div onClick={()=> navigate('/signup')} className='flex justify-center items-center bg-transparent hover:bg-black text-white hover:shadow-[0px_2px_2px_rgba(255,255,255,0.7)] hover:-translate-y-0.5 active:scale-95 transition duration-200 px-4 py-1 rounded-2xl cursor-pointer'>
                        <p>Sign Up</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;