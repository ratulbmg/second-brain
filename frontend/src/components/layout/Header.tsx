import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cn } from '../../utils';
import HoverBorderGradient from '../ui/hover-border-gradient';
import type { AppDispatch, RootState } from '../../redux/store';
import { SiSocialblade } from 'react-icons/si';
import { MdOutlineClearAll } from 'react-icons/md';
import { RxVideo } from 'react-icons/rx';
import { HiDocumentText } from 'react-icons/hi2';
import { IoLinkSharp } from 'react-icons/io5';
import Modal from '../ui/Modal';
import { useState } from 'react';
import { Signin } from '../../pages';

const Header: React.FC =() => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const status = useSelector((state: RootState) => state.auth.status)
    const navItems = [
        { name: "All Collection", path: "/all_collection", active: true, icon: <MdOutlineClearAll fontSize="20px" />},
        { name: "Social Post", path: "/social_post", active: true, icon: <SiSocialblade fontSize="20px" />},
        { name: "Videos", path: "/videos", active: true, icon: <RxVideo fontSize="20px" />},
        { name: "Docs", path: "/docs", active: true, icon: <HiDocumentText fontSize="20px" />},
        { name: "Links", path: "/links", active: true, icon: <IoLinkSharp fontSize="20px" />}
    ]

    return (
        <>
            <div className={cn('fixed top-0 text-center shadow-sm w-screen h-16 flex justify-around items-center bg-white z-10 backdrop-blur-md px-10')}>
                <div className='flex justify-center items-center italic bg-[#181818] rounded-full p-1 '>
                    <HoverBorderGradient containerClassName="rounded-full" className="p-0 dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2">
                        <span onClick={()=> navigate('/')} className={`px-4 py-1 rounded-full font-bold text-white bg-transparent shadow-md`}>S- <span>BRAIN</span></span>
                    </HoverBorderGradient>
                </div>
                <div className={cn(`m-auto max-w-[640px] w-full h-[45px] bg-white rounded-full flex justify-between items-center px-[6px]`)}>
                    {navItems.map((item) => (
                        <NavLink to={item.path} className={({ isActive }) => cn("hover:scale-[0.9] hover:shadow-[0_1px_3px_rgba(0,0,0,0.4),_0_1px_2px_rgba(0,0,0,0.06)] rounded-full px-4 py-1 flex justify-center items-center gap-1 transition-all duration-150", isActive ? "bg-black text-white" : "bg-transparent text-black")}>
                            {item.icon}
                            <p className={cn("cursor-pointer")}>{item.name}</p>
                        </NavLink>
                    ))}
                </div>
                <div className='rounded-full flex justify-center items-center gap-8 bg-black text-white'>
                    {/* <HoverBorderGradient containerClassName="rounded-full" className=" transition-all duration-500 active:scale-95 h-7 w-[90px] flex justify-center items-center space-x-2 cursor-pointer"> */}
                        {status ? (
                            <button>
                                Logout
                            </button>
                        ) : (
                            <>
                                <button onClick={() => setIsOpen(true)} className=' flex justify-center items-center py-2 px-4 cursor-pointer'>
                                    Join Us
                                </button>
                                <Modal isOpen={isOpen} onClose={() =>  setIsOpen(false)} onSubmit={() => setIsOpen(false)}>
                                    <Signin />
                                </Modal>
                            </>
                        )}
                    {/* </HoverBorderGradient> */}
                </div>
            </div>
        </>
    )
}

export default Header;