import Image from "next/image";
import HeaderBanner from "../../public/assets/header-banner.jpg";
import PdfDisplay from "./PdfDisplay";
import Product_2_Bg from "../../public/assets/product-2.jpg";
import Link from "next/link";
import BackIcon from "../../public/assets/back-icon.svg"

const pdfData = [
    { title: "Technical Details:", pdfUrl: "/assets/A1-Electricals-Cable-Lugs.pdf" },
];

export const Product2Page = () => {
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
                    <Link className="text-white font-mono mt-[-300px] md:mt-[-310px] lg:mt-[-1000px] ml-2" href="/products">
                        <Image src={BackIcon} alt="BackIcon" width={60} height={60} />
                    </Link>
                    <h1 className="text-white text-2xl md:text-6xl lg:text-8xl font-bold mt-[-220px] md:mt-[-400px] lg:mt-[-700px] text-center">COMPRESSION COPPER / ALUMINIUM CABLE LUGS & CONNECTORS</h1>
                </div>
                
            </div>
            <div className="relative">
                <Image
                    src={Product_2_Bg}
                    alt="Product 2 Background"
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
        </>
    );
};
