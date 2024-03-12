import Image from "next/image";
import HeaderBanner from "../../public/assets/header-banner.jpg";
import PdfDisplay from "./PdfDisplay";
import Product_1_Bg from "../../public/assets/product-4-banner.jpg";
import Link from "next/link";
import BackIcon from "../../public/assets/back-icon.svg"

const pdfData = [
    { title: "Technical Details:", pdfUrl: "/assets/A1-Electricals-Accessories-for-Cable-Terminations-and-Joints.pdf" },
];

export const Inquiry = () => {
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
                    <h1 className="text-white text-3xl md:text-6xl lg:text-8xl font-bold mt-[-220px] md:mt-[-400px] lg:mt-[-700px] text-center">INQUIRY</h1>
                </div>

            </div>
        </>
    );
};
