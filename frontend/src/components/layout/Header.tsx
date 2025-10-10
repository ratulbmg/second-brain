import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../redux/store';
import { SiSocialblade } from 'react-icons/si';
import { MdOutlineClearAll } from 'react-icons/md';
import { RxVideo } from 'react-icons/rx';
import { HiDocumentText } from 'react-icons/hi2';
import { IoLinkSharp } from 'react-icons/io5';
import { CiMenuKebab } from "react-icons/ci";
import Modal from '../ui/Modal';
import { useState } from 'react';
import SignInUp from '../Forms/SignInUp';
import { logoutUser } from '../../redux/slices/AuthSlice';
import { RxCross2 } from "react-icons/rx";
import ThemeToggle from '../ui/ThemeToggle';
import { motion } from 'framer-motion';
import { cn } from '../../utils';

const Header: React.FC = () => {
    const [loginIsOpen, setLoginIsOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const status = useSelector((state: RootState) => state.auth.status)
    const navItems = [
        { name: "All Collection", path: "/dashboard/all", active: true, icon: <MdOutlineClearAll fontSize="20px" /> },
        { name: "Social Post", path: "/dashboard/twitter", active: true, icon: <SiSocialblade fontSize="20px" /> },
        { name: "Videos", path: "/dashboard/youtube", active: true, icon: <RxVideo fontSize="20px" /> },
        { name: "Docs", path: "/dashboard/docs", active: true, icon: <HiDocumentText fontSize="20px" /> },
        { name: "Links", path: "/dashboard/links", active: true, icon: <IoLinkSharp fontSize="20px" /> }
    ]
    const handelLogout = () => {
        dispatch(logoutUser())
        navigate('/')
    }

    return (
        <>
            <div className={cn('fixed w-full h-16 flex justify-between items-center bg-white dark:bg-gray-800 px-10 z-50')} >
                {status ? (
                    <>
                        <div className={cn('lg:hidden')}>
                            <button onClick={() => setIsOpen(!isOpen)}> <CiMenuKebab fontSize="35px" /> </button>
                        </div>
                        <div id="logo" className={cn('hidden lg:block')}>
                            <h1 onClick={() => navigate('/')} className={cn(' px-4 py-1 rounded-full font-bold text-white bg-black')}>S-BRAIN</h1>
                        </div>
                        <div id="nav-items" className={cn('hidden lg:block')}>
                            {status && (
                                <div className={cn('m-auto max-w-[640px] w-full h-[45px] bg-white rounded-full flex justify-between items-center px-[6px]')}>
                                    {navItems.map((item) => (
                                        <NavLink key={item.name} to={item.path} className={({ isActive }) => cn(`hover:scale-[0.9] hover:shadow-[0_1px_3px_rgba(0,0,0,0.4),_0_1px_2px_rgba(0,0,0,0.06)] rounded-full px-4 py-1 flex justify-center items-center gap-1 transition-all duration-150 ${isActive ? "bg-black text-white" : "bg-transparent text-black"}`)}>
                                            {item.icon}
                                            <p className={cn("cursor-pointer")}>{item.name}</p>
                                        </NavLink>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <div id="logo">
                        <h1 onClick={() => navigate('/')} className={cn(' px-4 py-1 rounded-full font-bold text-white bg-black')}>S-BRAIN</h1>
                    </div>
                )}

                <div id="auth-items" className={cn('flex items-center gap-4')}>
                    <div>
                        <ThemeToggle />
                    </div>
                    <div className={cn('rounded-sm py-2 px-4 cursor-pointer')}>
                        {status ? (
                            <button onClick={handelLogout} className={cn('font-medium text-[#ff0000] cursor-pointer')}>
                                Logout
                            </button>
                        ) : (
                            <>
                                <button onClick={() => setLoginIsOpen(true)} className={cn('font-[500] text-black  cursor-pointer')}>
                                    Login
                                </button>
                                <Modal isOpen={loginIsOpen} onClose={() => setLoginIsOpen(false)} onSubmit={() => setLoginIsOpen(false)}>
                                    <SignInUp onSuccess={() => setLoginIsOpen(false)} />
                                </Modal>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Menu Panel */}
            <motion.nav
                className={cn("lg:hidden fixed top-0 left-0 h-full w-80 bg-white z-50")}
                initial={{ x: '-100%' }}
                animate={{ x: isOpen ? 0 : '-100%' }}
                transition={{
                    duration: 0.3,
                    ease: "easeInOut"
                }}
            >
                <div className={cn("p-6")}>
                    <div className={cn("flex justify-between items-center mb-8")}>
                        <h1 className={cn("text-black")}>S-BRAIN</h1>
                        <h1 onClick={() => setIsOpen(false)} ><RxCross2 fontSize="35px" /></h1>
                    </div>
                    <div className={cn("border-t pt-6")}> </div>
                    {status && (
                        <div className={cn("mb-8")}>
                            <ul className={cn("space-y-4")}>
                                {navItems.map((item) => (
                                    <li key={item.name}>
                                        <NavLink
                                            to={item.path}
                                            onClick={() => setIsOpen(false)}
                                            className={({ isActive }) => cn(`flex items-center gap-3 p-3 rounded-lg transition-all duration-150 ${isActive ? "bg-black text-white" : "hover:bg-gray-100"}`)} >
                                            {item.icon}
                                            <span>{item.name}</span>
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </motion.nav>
        </>
    )
}

export default Header;