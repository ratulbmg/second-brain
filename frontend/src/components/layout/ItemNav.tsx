import { NavLink } from "react-router-dom";
import { cn } from "../../utils";
import { MdOutlineClearAll } from "react-icons/md";
import { SiSocialblade } from "react-icons/si";
import { RxVideo } from "react-icons/rx";
import { HiDocumentText } from "react-icons/hi2";
import { IoLinkSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import HoverBorderGradient from "../ui/hover-border-gradient";
import { PiDotsThreeVertical } from "react-icons/pi";
import ThemeToggle from '../ui/ThemeToggle';



const ItemNav: React.FC = () => {
  let navigate = useNavigate();

  let backShadow2 ="shadow-[0_1px_3px_rgba(0,0,0,0.1),_0_1px_2px_rgba(0,0,0,0.06)]";

  return (
    <>
      <div className={cn("max-w-[1400px] w-full h-[45px] flex justify-center items-center" )}>
        <div className={cn("flex justify-center items-center italic bg-[#181818] rounded-full p-1 shadow-[0_1px_3px_rgba(0,0,0,0.5),_0_1px_2px_rgba(0,0,0,0.06)]" )}>
          <HoverBorderGradient containerClassName="rounded-full" className={cn("p-0 dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2")}>
            <span onClick={() => navigate("/")} className={cn("px-4 py-1 rounded-full font-bold text-white bg-gradient-to-r from-gray-700 to-gray-900 shadow-md")}>
              S- <span>BRAIN</span>
            </span>
          </HoverBorderGradient>
        </div>

        <div className={cn(`m-auto max-w-[640px] w-full h-[45px] bg-white rounded-full flex justify-between items-center ${backShadow2} px-[6px]`)}>
          <NavLink to={"/all_collection"} className={({ isActive }) => cn("hover:scale-[0.9] hover:shadow-[0_1px_3px_rgba(0,0,0,0.4),_0_1px_2px_rgba(0,0,0,0.06)] rounded-full px-4 py-1 flex justify-center items-center gap-1 transition-all duration-150", isActive ? "bg-black text-white" : "bg-transparent text-black")}>
            <MdOutlineClearAll fontSize="20px" />
            <p className={cn("cursor-pointer")}>All Collection</p>
          </NavLink>

          <NavLink to={"/social_post"} className={({ isActive }) => cn("hover:scale-[0.9] hover:shadow-[0_1px_3px_rgba(0,0,0,0.4),_0_1px_2px_rgba(0,0,0,0.06)] rounded-full px-4 py-1 flex justify-center items-center gap-1 transition-all duration-150", isActive ? "bg-black text-white" : "bg-transparent text-black")}>
            <SiSocialblade fontSize="20px" />
            <p className={cn("cursor-pointer")}>Social Post</p>
          </NavLink>

          <NavLink to={"/videos"} className={({ isActive }) => cn("hover:scale-[0.9] hover:shadow-[0_1px_3px_rgba(0,0,0,0.4),_0_1px_2px_rgba(0,0,0,0.06)] rounded-full px-4 py-1 flex justify-center items-center gap-1 transition-all duration-150", isActive ? "bg-black text-white" : "bg-transparent text-black")}>
            <RxVideo fontSize="20px" />
            <p className={cn("cursor-pointer")}>Videos</p>
          </NavLink>

          <NavLink to={"/docs"} className={({ isActive }) => cn("hover:scale-[0.9] hover:shadow-[0_1px_3px_rgba(0,0,0,0.4),_0_1px_2px_rgba(0,0,0,0.06)] rounded-full px-4 py-1 flex justify-center items-center gap-1 transition-all duration-150", isActive ? "bg-black text-white" : "bg-transparent text-black")}>
            <HiDocumentText fontSize="20px" />
            <p className={cn("cursor-pointer")}>Docs</p>
          </NavLink>

          <NavLink to={"/links"} className={({ isActive }) => cn("hover:scale-[0.9] hover:shadow-[0_1px_3px_rgba(0,0,0,0.4),_0_1px_2px_rgba(0,0,0,0.06)] rounded-full px-4 py-1 flex justify-center items-center gap-1 transition-all duration-150", isActive ? "bg-black text-white" : "bg-transparent text-black")}>
            <IoLinkSharp fontSize="20px" />
            <p className={cn("cursor-pointer")}>Links</p>
          </NavLink>
        </div>

        <div className={cn("flex justify-center items-center gap-4")}>
          <div className='themeBtn'>
            <ThemeToggle/>
          </div>
          
          <HoverBorderGradient containerClassName="rounded-full" className={cn(` relative pl-[7px] group h-7 max-w-[85px]  hover:max-w-[550px]  hover:w-full transition-all duration-5cd00 hover:shadow-none shadow-[0_1px_3px_rgba(0,0,0,0.1),_0_1px_2px_rgba(0,0,0,0.06)] bg-white text-black flex items-center  overflow-hidden`)}>
                <div className="z-10 overlay absolute w-full h-full bg-gradient-to-r from-white/0 from-[60%] to-white to-[82%]"></div>
                <span className={cn(`transform transition-transform duration-500`)}>
                    <PiDotsThreeVertical />
                </span>

                <div className={cn(`relative flex justify-center items-center gap-5`)}>
                    <p className={cn(`flex justify-center items-center text-[15px] `)}>Jhonny</p>
                    <p onClick={() => navigate('/signin')} className={cn(`text-[15px] flex justify-center items-center text-red-600 z-20 cursor-pointer`)}> Logout </p>
                </div>
            </HoverBorderGradient>
        </div>
      </div>
    </>
  );
};

export default ItemNav;
