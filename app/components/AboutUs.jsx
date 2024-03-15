"use client";

import Image from "next/image";
import IsoCertificate from "../../public/assets/iso-certificate.jpg";
import TUV from "../../public/assets/tuv-logo.jpg";
import FIEO from "../../public/assets/fieo-logo.jpg";
import Footer from "./Footer";
import { useState } from "react";
import CableLug from "../../public/assets/cable_Accessories.svg";
import Industry from "../../public/assets/industry-Blue.svg";
import Quality from "../../public/assets/Quality-Blue.svg";
import World from "../../public/assets/World-Blue.svg";
import Delivery from "../../public/assets/Delivery.svg";

export const AboutUs = () => {

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


    return (
        <>
            <div className="items-center justify-center w-full mt-0 py-4 bg-white">
                <h1 className="text-orange-500 text-4xl md:text-6xl lg:text-6xl font-bold mt- mb-6 lg:mt-4 py-4 text-center">About Us</h1>
                <div className="flex">
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md shadow-orange-500 mb-6 lg:w-1/2 lg:ml-[90px] w-auto">
                        <p className="text-sm lg:text-lg text-gray-800 leading-relaxed">
                            <span className="font-bold text-blue-900">A-1 Electricals</span> was established in 2006 as a dedicated manufacturer and supplier of power cable accessories and OEM products for the power sector. With extensive application engineering experience, we ensure that our product recommendations and supplied items are entirely fit for purpose, providing a lifetime of trouble-free service.
                        </p>
                    </div>
                    <Image src={Industry} alt="Industry" width={200} height={200} className="ml-[200px] mb-[20px] hidden lg:block" />
                </div>
                <div className="flex">
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md shadow-orange-500 mb-6 lg:w-1/2 w-auto lg:ml-[700px]">
                        <p className="text-sm lg:text-lg text-gray-800 leading-relaxed">
                            Our quality management systems ensure that rigorous tests are carried out at all stages of the manufacturing process, from incoming raw materials to final assembly, to ensure that the finished products meet or surpass design and performance requirements.
                        </p>
                    </div>
                    <Image src={Quality} alt="Quality" width={200} height={200} className="ml-[-1190px] mb-[10px] hidden lg:block" />
                </div>
                <div className="flex">
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md shadow-orange-500 mb-6 lg:w-1/2 lg:ml-[90px] w-auto">
                        <p className="text-sm lg:text-lg text-gray-800 leading-relaxed">
                            <span className="font-bold text-blue-900">A-1 Electricals</span> actively promotes its products through distributors and major utilities across a wide range of export markets, including the Far East, Asia, Africa, the Middle East, Europe, and Russia. We aim to exceed customer expectations by providing quick responses to all inquiries, technically competent product recommendations, competitive pricing, and on-time delivery performance, every time.
                        </p>
                    </div>
                    <Image src={World} alt="World" width={200} height={200} className="ml-[200px] mb-[10px] hidden lg:block" />
                </div>
                <div className="flex">
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md shadow-orange-500 mb-6 lg:w-1/2 w-auto lg:ml-[700px]">
                        <p className="text-sm lg:text-lg text-gray-800 leading-relaxed">
                            We strive to exceed customers’ expectations by providing quick responses to all enquiries, technically competent product recommendations, competitive pricing, and on-time delivery performance, every time.
                        </p>
                    </div>
                    <Image src={Delivery} alt="Delivery" width={200} height={200} className="ml-[-1190px] mb-[10px] hidden lg:block" />
                </div>
                {/* Credentials and Registrations */}
                <div className="flex items-center justify-center text-center">
                    <h1 className="text-center text-4xl md:text-6xl lg:text-6xl font-bold font-sans text-orange-400 mt-1">Credentials and Registrations</h1>
                </div>
                {/* Image Card */}
                <div className="flex items-center justify-center z-10 lg:py-8 py-6">
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
                )}
            </div>
            <div>
                
            </div>
            <Footer />
        </>

    );
};
