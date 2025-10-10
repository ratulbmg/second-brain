import React, { useId, type ForwardedRef } from "react";
import { cn } from "../../utils";


type InputProps = {
    label?: string;
    value?: string;
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disable?: boolean;
    type?: string;
    className?:string;
}


const Input = React.forwardRef<HTMLInputElement, InputProps>(function InputField(
        { label, value, onChange, type = 'text', placeholder, disable = false, className , ...props },
        ref: ForwardedRef<HTMLInputElement>
    ) {
        const id = useId();

        return <>
            <div className={cn("sm:col-span-3")}>
                {label && (
                    <label className={cn("block mb-2 text-sm font-medium text-gray-900")} htmlFor={id}>
                        {label}
                    </label>
                )}
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disable}
                    className={cn(`w-full text-[#A1A1A1] text-[0.9em] border-b border-[#2F2F2F] px-[12px] py-[7px] focus:outline-none focus:border-b-white transition-border duration-150 ${className}`)}
                    ref={ref}
                    {...props}
                    id={id}
                />
            </div>
        </>
    });


export default Input;