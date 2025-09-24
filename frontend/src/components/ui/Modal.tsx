import React from "react";
import { cn } from "../../utils";


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, children }) => {
    if (!isOpen) return null;

    return (
        <div className={cn("fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center", isOpen ? "block" : "hidden")}>
            <div className="bg-white p-4 rounded-lg">
                {children}
                <div className="flex justify-end items-center space-x-2 mt-4">
                    <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded-lg">Close</button>
                    <button onClick={onSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Submit</button>
                </div>
            </div>
        </div>
    )
}

export default Modal;