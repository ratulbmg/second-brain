import React from "react";
import { BiError } from "react-icons/bi";

const Unauthorised: React.FC =() => {

    return (
        <>
            <div className="w-full h-screen bg-[#212121] flex justify-center items-center">
                <div className="flex flex-col justify-center items-center md:flex-row">
                    <div>
                        <BiError className="text-[10rem] sm:text-[8rem] md:text-[10rem] lg:text-[12rem] text-white" color="white"/>
                    </div>

                    <hr className="text-white w-30 rotate-90 hidden md:block"/>

                    <div className="text-white flex flex-col justify-center items-center md:items-start gap-4">
                        <h1 className="text-[clamp(70px,9vw,96px)]">404</h1>
                        <h2 className="text-[18px,5vw,24px]">Page Not Found</h2>
                        <p className="text-[clamp(10px,2vw,16px)]">The Page you are looking for doesn't exist or an other occurred. <br /> Go back, or head over to 'website' to choose a new direction.</p>
                    </div>
                </div>
            </div> 
        </>
    )
}

export default Unauthorised;