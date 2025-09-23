import { useNavigate } from 'react-router-dom';
import { cn } from '../../utils';
import HoverBorderGradient from '../ui/hover-border-gradient';

const Header: React.FC =() => {

    let navigate = useNavigate()
    // let backColor1 = 'bg-gradient-to-r from-gray-700 to-gray-900'

    return (
        <>
            <div className={cn('fixed top-0 text-center shadow-sm w-screen h-16 flex justify-around items-center z-10 backdrop-blur-md ')}>
                <div className='flex justify-center items-center italic bg-[#181818] rounded-full p-1 '>
                    <HoverBorderGradient containerClassName="rounded-full" className="p-0 dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2">
                        <span onClick={()=> navigate('/')} className={`px-4 py-1 rounded-full font-bold text-white bg-transparent shadow-md`}>S- <span>BRAIN</span></span>
                    </HoverBorderGradient>
                </div>
                <div className='flex justify-center items-center gap-8'>
                    <HoverBorderGradient containerClassName="rounded-full" className=" transition-all duration-500 active:scale-95 h-7 w-[90px] flex justify-center items-center space-x-2 cursor-pointer">
                        <div onClick={()=> navigate('/signin')}>
                            <p>Sign In</p>
                        </div>
                    </HoverBorderGradient>

                    <HoverBorderGradient containerClassName="rounded-full" className=" transition-all duration-500 active:scale-95 h-7 w-[90px] flex justify-center items-center space-x-2 cursor-pointer">
                        <div onClick={()=> navigate('/signup')}>
                            <p>Sign Up</p>
                        </div>
                    </HoverBorderGradient>
                </div>
            </div>
        </>
    )
}

export default Header;