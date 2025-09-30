import { cn } from '../../utils';


const Dashboard: React.FC = () => {
    return (
        <>
            <div className={cn(`w-full min-h-[95vh] h-full flex justify-start items-center flex-col gap-2 bg-white dark:bg-[#212121] pt-2`)}>
                <div className={cn(`w-[99%] min-h-[85vh] p-5 bg-[#F2F2F2] dark:bg-[#212121] rounded-[8px] border border-[#CCCCCC] flex justify-center items-center flex-col`)}>
                    <h1 className={cn(`text-4xl text-gray-500`)}>Welcome dashboard</h1>
                    <p className={cn(`text-gray-600`)}>This is yours bag put any thing you want</p>
                </div>
            </div>
        </>
    )
}

export default Dashboard;