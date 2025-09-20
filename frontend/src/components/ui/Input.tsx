import React, { useId, type ForwardedRef } from "react";


type InputProps = {
    label: string;
    value?: string;
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disable?: boolean;
    type?: string;
}


const Input = React.forwardRef<HTMLInputElement, InputProps>(function InputField(
    { label, value, onChange, type = 'text', placeholder, disable = false, ...props },
    ref: ForwardedRef<HTMLInputElement>
) {
    const id = useId();

    return <>
        <div className="sm:col-span-3">
            {label && (
                <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor={id}>
                    {label}
                </label>
            )}
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disable}
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    </>
});


export default Input;