import Image from "next/image";
import HeaderBanner from "../../public/assets/header-banner.jpg";
import { GoogleMapsEmbed } from '@next/third-parties/google';

export const ContactUs = () => {
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
                    <h1 className="text-white text-3xl md:text-6xl lg:text-8xl font-bold mt-[-180px] md:mt-[-400px] lg:mt-[-700px] text-center">CONTACT US</h1>
                </div>
            </div>
            <div className="mt-8 mb-8 max-w-screen-lg mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="max-w-lg bg-white rounded-lg overflow-hidden shadow-md shadow-blue-950">
                    <GoogleMapsEmbed
                        apiKey={process.env.GOOGLE_MAPS_API}
                        height={400}
                        width="100%"
                        mode="place"
                        q="A-1+ELECTRICALS+G1053+GIDC+Lodhika+Metoda+Almighty+Gate+No.+3,+Kalavad+Rd+Gujarat+360021"
                        zoom="19"
                    />
                </div>
                <div className="max-w-lg bg-white rounded-lg overflow-hidden shadow-md shadow-blue-950">
                    <GoogleMapsEmbed
                        apiKey={process.env.GOOGLE_MAPS_API}
                        height={400}
                        width="100%"
                        mode="place"
                        q="A-1+Electricals+20,+Alankar+Chamber,+Dhebar+Chowk,+Trikon+Baug,+Dhebar+Chowk+Rajkot,+Gujarat+360001+India"
                        zoom="19"
                    />
                </div>
                <div className="max-w-l rounded-lg overflow-hidden shadow-md shadow-blue-950 bg-gray-200">
                    <div className="p-6">
                        <h2 className="text-xl font-semibold mb-4">Factory Address</h2>
                        <p className="text-lg text-black">A-1 Electricals,</p>
                        <p className="text-sm text-gray-700">G-1053, Lodhika GIDC Metoda, Kalavad Road, Metoda, Rajkot 360021, Gujarat, India</p>
                    </div>
                </div>
            </div>
        </>
    );
};
