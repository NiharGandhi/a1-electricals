"use client";

import Image from "next/image";
import CableLug from "../../public/assets/cable_Accessories.svg";
import BlurryBg from "../../public/assets/bbblurry.svg";
import TextCard from "./TextCard";
import Footer from "./Footer";

export const Hero = () => {
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
            <div className="relative flex flex-col lg:flex-row bg-white lg:mb-[700px]">
                <div className="lg:w-1/2 relative bg-white">
                    <div className="absolute text-center items-center justify-center z-10">
                        <h1 className="text-center text-2xl md:text-lg lg:text-6xl leading-tight font-bold px-4 mt-[1px] lg:mt-[100px] lg:px-12 text-blue-950">
                            LEADING MANUFACTURER & MARKETER FOR
                            <span className="text-orange-500 font-extrabold"> POWER CABLE ACCESSORIES</span>
                        </h1>
                        <p className="text-center text-[15px] lg:py-[20px] sm:py-[9px] md:text-xl lg:text-xl leading-tight mt-[1px]">
                            A-1 Electricals was established in 2006, as a dedicated manufacturer and supplier of power cable accessories and OEM products for power sector.
                        </p>
                        <a href="/products">
                            <button className="bg-blue-950 text-white text-sm lg:text-lg font-semibold rounded-3xl py-1 px-2 sm:py-2 sm:px-4 lg:relative lg:bottom-12 lg:mt-12 mt-[20px] hover:shadow-lg hover:shadow-orange-500">
                                View Products
                            </button>
                        </a>
                    </div>
                </div>
                <div className="lg:w-1/2 relative">
                    <Image src={BlurryBg} alt="Blurry Background" className="hidden sm:block w-full h-auto absolute top-0 left-0 blur-effect mt-[-150px] lg:mt-[-0px]" />
                    <Image src={CableLug} alt="Cable Lug" className="hidden sm:block w-full h-auto mt-[-150px] lg:mt-[-1px] absolute top-0 left-0 z-0 " />
                    <Image src={BlurryBg} alt="Blurry Background" width={1000} height={1000} className="mt-[-20px] opacity-50 top-0 left-0 blur-effect lg:hidden z-0" />
                    <Image src={CableLug} alt="Cable Lug" width={400} height={400} className="mt-[-170px] top-0 left-0 lg:hidden -z-10" />
                </div>
            </div>
            <div className="w-full h-full bg-white mb-10">
                <div className="relative bg-white">
                    <div className="flex-col items-center justify-center text-center py-8">
                        <h1 className="mt-4 py-4 text-4xl font-light">Our range of products includes the following:</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4">
                            {textData.map((item, index) => (
                                <TextCard key={index} text={item.text} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}