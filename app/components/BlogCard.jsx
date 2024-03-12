// BlogCard.jsx

import Image from "next/image";
import React from "react";
import Logo from "../../public/assets/a1-logo.png";

const defaultImage = Logo; // Path to your default image

const BlogCard = ({ title, description, date, image }) => {
    const imageUrl = image || defaultImage; // If image path is not provided, use default image

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden w-[370px] mb-8 lg:w-[1000px] lg:ml-[-120px] shadow-orange-500"> {/* Centering content horizontally on large screens */}
            <div className="md:flex">
                <div className="md:flex-shrink-0">
                    <Image
                        className="h-48 w-full object-cover md:w-48"
                        src={imageUrl}
                        alt={title}
                    />
                </div>
                <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                        {date}
                    </div>
                    <a
                        href="#"
                        className="block mt-1 text-lg leading-tight font-medium text-black"
                    >
                        {title}
                    </a>
                    <p className="mt-2 text-gray-500">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
