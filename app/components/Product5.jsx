import Image from "next/image";
import HeaderBanner from "../../public/assets/header-banner.jpg";
import PdfDisplay from "./PdfDisplay";
import Link from "next/link";
import BackIcon from "../../public/assets/back-icon.svg"

import CopperBusBar from "../../public/assets/Copper-Bus-Bar.jpg";
import SpaceSaddles from "../../public/assets/Space-Saddles.jpg";
import SplitBoltConnectors from "../../public/assets/Split-Bolt-Connectors.jpg";
import ForgedInsulatorFittings from "../../public/assets/Forged-Insulator-Fittings.jpg";
import BronzeBoltedConnectors from "../../public/assets/Bronze-Bolted-Connectors.jpg";
import ConstantForceSpringRoll from "../../public/assets/Constant-Force-Spring-Roll.jpg";
import OtherProductCard from "./OtherProductCard";
import Footer from "./Footer";


const pdfData = [
    { title: "Technical Details:", pdfUrl: "/assets/A1-Electricals-Other-Products.pdf" },
];

export const Product5Page = () => {
    return (
        <>  
            <div className="items-center justify-center w-full mt-0 py-4 bg-white">
                <Link href="/products">
                    <button className="absolute text-black top-[-130px] lg:top-[90px] lg:ml-4 underline text-sm px-1 lg:text-lg">
                        Back
                    </button>
                </Link>
                <h1 className="text-orange-500 text-4xl md:text-6xl lg:text-6xl font-bold mt-2 mb-6 lg:mt-4 py-2 text-center">OTHER PRODUCTS MANUFACTURED & SUPPLIED</h1>
            </div>
            {/* <div className="relative">
                <Image
                    src={HeaderBanner}
                    alt="Hero Image"
                    className="p-0 m-0"
                    layout="responsive"
                    width={1200}
                    height={100} // Adjust the height as needed
                />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-center w-full">
                    <Link href="/products">
                        <button className="absolute text-white top-[-130px] lg:top-[-520px] underline text-sm px-1 lg:text-lg">
                            Back
                        </button>
                    </Link>
                    <h1 className="text-white text-xl md:text-6xl lg:text-8xl font-bold mt-[-175px] md:mt-[-300px] lg:mt-[-750px] text-center justify-items-center mr-[15px]">OTHER PRODUCTS MANUFACTURED & SUPPLIED</h1>
                </div>
            </div> */}
            <div className="relative">
                <div className="container mx-auto py-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <OtherProductCard
                            imageSrc={CopperBusBar}
                            title="Copper Bus Bar"
                        />
                        <OtherProductCard
                            imageSrc={SpaceSaddles} // Replace with the actual image source
                            title="Space Saddles"
                            buttonText="View Details"
                            buttonLink="/product2"
                        />
                        <OtherProductCard
                            imageSrc={SplitBoltConnectors} // Replace with the actual image source
                            title="Split Bolt Connectors"
                            buttonText="View Details"
                            buttonLink="/product3"
                        />
                        <OtherProductCard
                            imageSrc={ForgedInsulatorFittings} // Replace with the actual image source
                            title="Forged Insulator Fittings"
                            buttonText="View Details"
                            buttonLink="/product4"
                        />
                        <OtherProductCard
                            imageSrc={BronzeBoltedConnectors} // Replace with the actual image source
                            title="Bronze Bolted Connectors"
                            buttonText="View Details"
                            buttonLink="/product5"
                        />
                        <OtherProductCard
                            imageSrc={ConstantForceSpringRoll} // Replace with the actual image source
                            title="Constant Force Spring"
                            buttonText="View Details"
                            buttonLink="/product5"
                        />
                    </div>
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full sm:w-1/2 p-8 mt-[1050px] md:mt-[250px] lg:mt-[500px]">
                    {pdfData.map((item, index) => (
                        <div key={index} className="mb-4 text-center items-center justify-center">
                            <PdfDisplay title={item.title} pdfUrl={item.pdfUrl} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-[160px] lg:mt-[200px]">
                <Footer />
            </div>
        </>
    );
};
