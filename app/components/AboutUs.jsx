"use client";

import Image from "next/image";
import HeaderBanner from "../../public/assets/header-banner.jpg";
import TextCard from "./TextCard";

export const AboutUs = () => {
    const textData = [
        { text: "Industrial brass cable glands and wiping glands" },
        { text: "Copper/Aluminium cable lugs and inline connectors" },
        { text: "Heat shrink terminations, joints, tubing's and accessories" },
        { text: "Bus bars, copper strips, earth rods and earthing accessories" },
        { text: "Forging and casting items from ferrous and non ferrous metals" },
        { text: "Transmission & Distribution Hardware Fittings" }
    ];

    return (
        <>
            <div className="relative">
                <Image
                    src={HeaderBanner}
                    alt="Hero Image"
                    className="p-0 m-0"
                    layout="responsive"
                    width={1200}
                    height={100} // Adjust the height as needed
                />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-center w-full">
                    <h1 className="text-white text-4xl md:text-6xl lg:text-8xl font-bold mt-[-200px] lg:mt-[-650px]">About Us</h1>
                </div>
            </div>
            <div className="w-full h-full bg-white mt-1 flex flex-col sm:flex-row">
                <div className="w-full sm:w-1/2 p-8 mb-8 sm:mb-0">
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md shadow-orange-500">
                        <div className="flex-col items-center justify-center text-center mt-2">
                            <p className="mb-4 text-sm lg:text-lg text-gray-800 leading-relaxed">
                                A-1 Electricals was established in 2006, as a dedicated manufacturer and supplier of power cable accessories and OEM products for the power sector.
                            </p>
                            <p className="mb-4 text-sm lg:text-lg text-gray-800 leading-relaxed">
                                A-1 Electricals has extensive application engineering experience for all of the above products and can therefore ensure that product recommendations and the products supplied are entirely fit for purpose – providing a lifetime trouble-free service.
                            </p>
                            <p className="mb-4 text-sm lg:text-lg text-gray-800 leading-relaxed">
                                Our quality management systems ensure that at all stages of the manufacturing process, from incoming raw materials to final assembly, rigorous tests are carried out to ensure that the finished products meet or surpass design and performance requirements.
                            </p>
                            <p className="mb-4 text-sm lg:text-lg text-gray-800 leading-relaxed">
                                A-1 Electricals is very active in promoting its products through distributors and major utilities in a wide range of export markets, including the Far East, Asia, Africa, the Middle East, Europe, and Russia.
                            </p>
                            <p className="mb-4 text-sm lg:text-lg text-gray-800 leading-relaxed">
                                We strive to exceed customers’ expectations by providing quick responses to all enquiries, technically competent product recommendations, competitive pricing, and on-time delivery performance, every time.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="w-full sm:w-1/2 p-8">
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md shadow-orange-500">
                        <div className="relative">
                            <h1 className="mt-2 py-2 text-2xl lg:text-4xl font-semibold text-gray-900">Our range of products includes the following:</h1>
                            <div className="flex-col items-center justify-center text-center mt-8">
                                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4">
                                    {textData.map((item, index) => (
                                        <TextCard key={index} text={item.text} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};
