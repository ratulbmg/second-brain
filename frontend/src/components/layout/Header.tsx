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
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
// import ThemeToggle from '../ui/ThemeToggle';

const Header: React.FC =() => {
    const [isOpen, setIsOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState(false)
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

    function showMenu(){
        setOpenMenu(true)
    }

    function closeMenu(){
        setOpenMenu(false)
    }

    return (
        <>
            <div style={{position:'fixed', top:'0'}} className={cn('relative text-center shadow-sm w-full h-16 flex justify-between items-center bg-white z-50 backdrop-blur-md px-4 md:px-10')}>
                <div className='relative overflow-hidden flex justify-center items-center italic bg-[#181818] rounded-full p-1 '>
                    <HoverBorderGradient containerClassName="rounded-full" className="w-full h-full p-0 bg-black text-white flex items-center">
                        <span onClick={()=> navigate('/')} className={`w-full h-full px-4 py-1 rounded-full font-bold text-white bg-transparent shadow-md`}>S-BRAIN</span>
                    </HoverBorderGradient>
                </div>

                {status ? (
                    <div className={cn(`m-auto max-w-[640px] w-full h-[45px] bg-white rounded-full hidden lg:flex justify-between items-center px-[6px]`)}>
                        {navItems.map((item) => (
                            <NavLink key={item.name} to={item.path} className={({ isActive }) => cn("hover:scale-[0.9] hover:shadow-[0_1px_3px_rgba(0,0,0,0.4),_0_1px_2px_rgba(0,0,0,0.06)] rounded-full px-4 py-1 flex justify-center items-center gap-1 transition-all duration-150", isActive ? "bg-black text-white" : "bg-transparent text-black")}>
                                {item.icon}
                                <p className={cn("cursor-pointer")}>{item.name}</p>
                            </NavLink>
                        ))}
                    </div>
                ) : (
                    <div className={cn(``)}>
                    </div>
                )}

                {/* <div className='themeBtn'>
                    <ThemeToggle />
                </div> */}

                <div className='hidden lg:block rounded-sm py-2 px-4 text-black cursor-pointer'>
                    {status ? (
                        <button onClick={handelLogout} className='font-[500] text-[#ff0000] cursor-pointer'>
                            Logout
                        </button>
                        ) : (
                        <>
                        <button onClick={() => setIsOpen(true)} className='font-[500] cursor-pointer'>
                            Login
                        </button>
                        <Modal isOpen={isOpen} onClose={() =>  setIsOpen(false)} onSubmit={() => setIsOpen(false)}>
                            <SignInUp onSuccess={() => setIsOpen(false)} />
                        </Modal>
                        </>
                    )}
                </div>

                <div className={cn(`lg:hidden`)}>
                    <div onClick={showMenu}>
                        <RxHamburgerMenu fontSize={'25px'}/>
                    </div>
                    <div className={cn("flex flex-col justify-start items-start absolute left-0 w-full h-screen transition-all duration-300 ease-in-out z-50 bg-white", openMenu ? "top-0" : '-top-[74em]' )}>
                        <div className=' w-[100%] h-auto flex justify-between items-center px-4 py-4 border-b-1 border-[#dfdfdf]'>
                            <div className='brnad'>
                                <div className='relative overflow-hidden flex justify-center items-center italic bg-[#181818] rounded-full p-1 '>
                                    <HoverBorderGradient containerClassName="rounded-full" className="w-full h-full p-0 bg-black text-white flex items-center">
                                        <span onClick={()=> navigate('/')} className={`w-full h-full text-[12px] sm:text-[16px] px-4 py-1 rounded-full font-bold text-white bg-transparent shadow-md`}>S-BRAIN</span>
                                    </HoverBorderGradient>
                                </div>
                            </div>

                            <div onClick={closeMenu} className='h-auto flex justify-end'>
                                <RxCross2 fontSize={'25px'}/>
                            </div>
                        </div>

                        <div className='h-full w-full flex flex-col justify-center items-center'> 
                            <div className='miniHeader w-full flex flex-col items-start justify-start pl-10 pt-8 gap-7'>
                                {status ? (
                                    <div className='flex flex-col justify-start gap-7'>
                                        {navItems.map((itm)=> (
                                            <NavLink key={itm.name} to={itm.path} className={({ isActive }) => cn('flex justify-start items-center w-auto active:scale-90 transition-all duration-75', isActive ? " text-[#6a6a6a]" : "bg-transparent text-black")}>
                                                <p className='flex justify-center items-center gap-4 font-[400] text-[30px]'>{itm.icon}{itm.name}</p>
                                            </NavLink>
                                        ))}
                                    </div>
                                ) : (
                                    <div className=''>
                                    </div>
                                )}

                            </div>
                            <div className='miniModal m-auto w-full h-[46%] flex justify-center items-end '>
                                {status ? (
                                    <button onClick={handelLogout} className='flex justify-center items-center w-[50%] font-[400] text-[20px] active:scale-90 transition-all duration-75 px-5 bg-[#ff0000] text-[#ffffff]'>
                                        Logout
                                    </button>
                                    ) : (
                                    <>
                                    <button onClick={() => setIsOpen(true)} className='flex justify-center items-center w-[50%] font-[400] text-[20px] active:scale-90 transition-all duration-75 px-5 bg-[#0062ff]  text-[#ffffff]'>
                                        Login
                                    </button>
                                    <Modal isOpen={isOpen} onClose={() =>  setIsOpen(false)} onSubmit={() => setIsOpen(false)}>
                                        <SignInUp onSuccess={() => setIsOpen(false)} />
                                    </Modal>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;