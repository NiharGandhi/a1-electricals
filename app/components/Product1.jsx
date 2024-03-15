import Image from "next/image";
import HeaderBanner from "../../public/assets/header-banner.jpg";
import PdfDisplay from "./PdfDisplay";
import Product_1_Bg from "../../public/assets/product-1.jpg";
import Link from "next/link";
import BackIcon from "../../public/assets/back-icon.svg"
import Footer from "./Footer";


const pdfData = [
    { title: "Technical Details:", pdfUrl: "/assets/A1-Electricals-Cable-Glands.pdf" },
];

export const Product1Page = () => {
    return (
        <>  
            <div className="items-center justify-center w-full mt-0 py-4 bg-white">
                <Link href="/products">
                    <button className="absolute text-black top-[-130px] lg:top-[90px] lg:ml-4 underline text-sm px-1 lg:text-lg">
                        Back
                    </button>
                </Link>
                <h1 className="text-orange-500 text-4xl md:text-6xl lg:text-6xl font-bold mt-2 mb-6 lg:mt-4 py-2 text-center">INDUSTRIAL BRASS CABLE GLANDS & ACCESSORIES</h1>
            </div>
            {/* <div className="relative">
                <Image
                    src={HeaderBanner}
                    alt="Hero Image"
                    layout="responsive"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-center w-full">
                    
                    <h1 className="text-white text-2xl md:text-6xl lg:text-8xl font-bold mt-[-165px] md:mt-[-300px] lg:mt-[-750px] text-center justify-items-center mr-[15px]">INDUSTRIAL BRASS CABLE GLANDS & ACCESSORIES</h1>
                </div>
            </div> */}
            <div className="relative">
                <Image
                    src={Product_1_Bg}
                    alt="Background"
                    className="p-0 m-0"
                    layout="responsive"
                    width={1200}
                    height={100}
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full sm:w-1/2 p-8 mt-[200px] md:mt-[250px] lg:mt-[350px]">
                    {pdfData.map((item, index) => (
                        <div key={index} className="mb-4 text-center items-center justify-center">
                            <PdfDisplay title={item.title} pdfUrl={item.pdfUrl} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-[210px] lg:mt-[200px]">
                <Footer />
            </div>
        </>
    );
};
