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
import SignInUp from '../Forms/SignInUp';
import { logoutUser } from '../../redux/slices/AuthSlice';
// import ThemeToggle from '../ui/ThemeToggle';

const Header: React.FC =() => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const status = useSelector((state: RootState) => state.auth.status)
    const navItems = [
        { name: "All Collection", path: "/dashboard/all", active: true, icon: <MdOutlineClearAll fontSize="20px" />},
        { name: "Social Post", path: "/dashboard/twitter", active: true, icon: <SiSocialblade fontSize="20px" />},
        { name: "Videos", path: "/dashboard/youtube", active: true, icon: <RxVideo fontSize="20px" />},
        { name: "Docs", path: "/dashboard/docs", active: true, icon: <HiDocumentText fontSize="20px" />},
        { name: "Links", path: "/dashboard/links", active: true, icon: <IoLinkSharp fontSize="20px" />}
    ]
    const handelLogout = () => {
        dispatch(logoutUser())
        navigate('/')
    }

    return (
        <>
            <div className={cn('fixed top-0 text-center shadow-sm w-screen h-16 flex justify-around items-center bg-white z-10 backdrop-blur-md px-10')}>
                <div className='flex justify-center items-center italic bg-[#181818] rounded-full p-1 '>
                    <HoverBorderGradient containerClassName="rounded-full" className="p-0 dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2">
                        <span onClick={()=> navigate('/')} className={`px-4 py-1 rounded-full font-bold text-white bg-transparent shadow-md`}>S- <span>BRAIN</span></span>
                    </HoverBorderGradient>
                </div>
                {status && (
                    <div className={cn(`m-auto max-w-[640px] w-full h-[45px] bg-white rounded-full flex justify-between items-center px-[6px]`)}>
                        {navItems.map((item) => (
                            <NavLink to={item.path} className={({ isActive }) => cn("hover:scale-[0.9] hover:shadow-[0_1px_3px_rgba(0,0,0,0.4),_0_1px_2px_rgba(0,0,0,0.06)] rounded-full px-4 py-1 flex justify-center items-center gap-1 transition-all duration-150", isActive ? "bg-black text-white" : "bg-transparent text-black")}>
                                {item.icon}
                                <p className={cn("cursor-pointer")}>{item.name}</p>
                            </NavLink>
                        ))}
                    </div>
                )}

                {/* <div className='themeBtn'>
                    <ThemeToggle />
                </div> */}

                <div className='rounded-sm py-2 px-4 bg-black text-white cursor-pointer'>
                    {status ? (
                            <button onClick={handelLogout} className='cursor-pointer'>
                                Logout
                            </button>
                        ) : (
                            <>
                                <button onClick={() => setIsOpen(true)} className='cursor-pointer'>
                                    Login
                                </button>
                                <Modal isOpen={isOpen} onClose={() =>  setIsOpen(false)} onSubmit={() => setIsOpen(false)}>
                                    <SignInUp onSuccess={() => setIsOpen(false)} />
                                </Modal>
                            </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Header;