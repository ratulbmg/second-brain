import { cn } from '../../utils';
import { RiAddCircleLine } from "react-icons/ri";
import { IoIosArrowDroprightCircle } from "react-icons/io";


const Dashboard: React.FC = () => {
    return (
        <>
            <div className={cn('m-auto max-w-[1536px] w-full min-h-screen h-full flex justify-center items-center')}>
                <div className='w-auto h-auto flex flex-col-reverse sm:flex-row justify-center items-center gap-8 sm:gap-4'>
                    <div className=' flex justify-center items-center'>
                        <p className='text-[30px] bg-[#898989] text-white flex justify-center items-center rounded-full p-2'><IoIosArrowDroprightCircle /></p>
                        <h1 className='text-[30px] text-[#898989] rounded-[5px] px-2'>All Collection</h1>
                    </div>
                    <hr className='text-[#898989] w-[250px] sm:w-[100px] sm:block sm:rotate-90' />
                    <div>
                        <RiAddCircleLine className=' text-[#898989] text-[5em]'/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;