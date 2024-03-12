"use client";

import Image from "next/image";
import HeaderBanner from "../../public/assets/header-banner.jpg";
import IsoCertificate from "../../public/assets/iso-certificate.jpg";
import TUV from "../../public/assets/tuv-logo.jpg";
import FIEO from "../../public/assets/fieo-logo.jpg";
import TextCard from "./TextCard";
import { useState } from "react";
import Link from "next/link";


export const Hero = () => {
    const images = [
        { id: 1, src: IsoCertificate, alt: "Image 1" }, // Removed curly braces around IsoCertificate
        { id: 2, src: TUV, alt: "Image 2" }, // Removed curly braces around IsoCertificate
        { id: 3, src: FIEO, alt: "Image 3" }, // Removed curly braces around IsoCertificate
        // Add more images as needed
    ];

    const [lightboxImage, setLightBoxImage] = useState(null);

    const openLightBox = (image) => {
        setLightBoxImage(image);
    };

    const closeLightBox = (image) => {
        setLightBoxImage(null);
    };

    const textData = [
        {text: "Industrial brass cable glands and wiping glands"},
        {text: "Copper/Aluminium cable lugs and inline connectors"},
        {text: "Heat shrink terminations, joints, tubing's and accessories"},
        {text: "Bus bars, copper strips, earth rods and earthing accessories"},
        {text: "Forging and casting items from ferrous and non ferrous metals"},
        {text: "Transmission & Distribution Hardware Fittings"}
    ];

    return (
        <>
            <div className="relative">
                <div className="absolute">
                    <div className="inset-x-0 lg:top-[40px] top-[10px] text-center items-center justify-center w-full">
                        <h1 className="text-center text-lg md:text-6xl lg:text-7xl font-extrabold font-sans text-orange-100">A1-Electricals</h1>
                        <h1 className="text-center text-sm md:text-lg lg:text-6xl leading-tight font-bold text-white px-4 mt-[1px] lg:mt-[25px] lg:px-12">LEADING MANUFACTURER & MARKETER FOR POWER CABLE ACCESSORIES</h1>
                        <p className="text-center text-[7px] lg:py-[20px] sm:py-[9px] md:text-xl lg:text-xl leading-tight mt-[1px]">
                            A-1 Electricals was established in 2006, as a dedicated manufacturer and supplier of power cable accessories and OEM products for power sector.
                        </p>
                        <a href="/products">
                                <button className="bg-blue-950 text-white text-sm lg:text-lg font-semibold rounded-3xl py-1 px-2 sm:py-2 sm:px-4 lg:relative lg:bottom-12 lg:mt-12 mt-[60px] hover:shadow-lg hover:shadow-orange-500">
                                View Products
                            </button>
                        </a>
                        
                    </div>
                </div>
                <Image
                    src={HeaderBanner}
                    alt="Hero Image"
                    className="p-0 m-0"
                    layout="responsive"
                    width={1200}
                    height={600}
                />
            </div>
            <div className="w-full h-full bg-white mt-10">
                <div className="relative">
                    <div className="flex-col items-center justify-center text-center mt-8">
                        <h1 className="mt-4 py-4 text-4xl font-light">Our range of products includes the following:</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4">
                            {textData.map((item, index) => (
                                <TextCard key={index} text={item.text} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* Credentials and Registrations */}
            <div className="flex items-center justify-center text-center mt-4">
                <h1 className="text-center text-4xl md:text-6xl lg:text-6xl font-extrabold font-sans text-orange-400 mt-10">Credentials and Registrations</h1>
            </div>
            {/* Image Card */}
            <div className="flex items-center justify-center mt-10 z-10 ">
                <div className="max-w-3xl mx-10 lg:mx-auto p-8 bg-white shadow-lg rounded-lg shadow-orange-500">
                    <div className="grid grid-cols-3 gap-4">
                        {images.map((image) => (
                            <div key={image.id} className="cursor-pointer" onClick={() => openLightBox(image)}>
                                <Image src={image.src} alt={image.alt} width={200} height={300} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {lightboxImage && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-50">
                    <div className="relative">
                        <button className="absolute top-4 right-4 text-white" onClick={closeLightBox}>
                            Close
                        </button>
                        <Image src={lightboxImage.src} alt={lightboxImage.alt} width={500} height={500} />
                    </div>
                </div>
            )};
        </>
    );
}
