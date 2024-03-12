import Image from "next/image";
import React, { useState } from "react";

const Modal = ({ imageUrl, onClose }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleImageClick = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
        onClose();
    };

    return (
        <>
            <div
                className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50 ${isOpen ? "" : "hidden"
                    }`}
            >
                <div className="relative">
                    <button
                        className="absolute top-2 right-2 text-white hover:text-gray-300 focus:outline-none"
                        onClick={handleClose}
                    >
                        Close
                    </button>
                    <Image src={imageUrl} alt="Full size" className="max-w-full max-h-full" />
                </div>
            </div>
        </>
    );
};

export default Modal;
