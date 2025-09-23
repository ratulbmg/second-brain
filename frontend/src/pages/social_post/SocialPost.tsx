import ItemNav from '../../components/layout/ItemNav';
import { cn } from '../../utils';


const SocialPost: React.FC = () => {
    return (
        <>
            <div className={cn(`w-full min-h-[89vh] h-full flex justify-start items-center flex-col gap-2 bg-white pt-2`)}>
                <ItemNav/>
                <div className='w-[99%] min-h-[85vh] p-5 bg-[#F2F2F2] rounded-xl border border-[#CCCCCC] flex justify-center items-center flex-col'>
                    <h1 className='text-4xl text-gray-500'>Social Post</h1>
                    <p className='text-gray-600'>Not content available</p>
                </div>
            </div>
        </>
    )
}

export default SocialPost;