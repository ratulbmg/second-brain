import { cn } from '../../utils';
import { GoLock } from "react-icons/go";

const ItemHeader: React.FC =() => {

    

    return (
        <>
            {/* <div className={cn('sticky top-0 text-center shadow-sm bg-white  w-screen h-9 flex justify-center items-center gap-10 z-10')}>
                <p className={cn(`capitalize flex justify-center items-center gap-2 text-black `)}><GoLock />Securely storing what matters most</p>
            </div> */}
            <div className={cn('sticky top-0 text-center shadow-sm bg-white dark:bg-[#212121] w-screen h-9 flex justify-center items-center gap-10 z-10')}>
                <p className={cn(`capitalize flex justify-center items-center gap-2 text-black dark:text-white`)}><GoLock />Securely storing what matters most</p>
            </div>
        </>
    )
}

export default ItemHeader;