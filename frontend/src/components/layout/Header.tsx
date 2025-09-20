import { cn } from '../../utils';

const Header: React.FC =() => {
    return (
        <>
            <h1 className={cn('absolute text-center bg-black text-white h-10 w-screen z-10')}>Header</h1>
        </>
    )
}

export default Header;