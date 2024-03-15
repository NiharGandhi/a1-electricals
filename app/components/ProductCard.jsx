// ProductCard.jsx

import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ imageSrc, title, buttonText, buttonLink }) => {
    return (
        <div className="bg-gray-50 rounded-lg shadow-md shadow-blue-950 w-[450px justify-center items-center px-2 m-4">
            <div className="relative">
                <Image src={imageSrc} alt={title} width={500} height={200} className="py-2"/>
            </div>
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{title}</h2>
                <Link href={buttonLink}>
                    <p className="text-white bg-blue-900 rounded-xl px-2 py-1 w-[130px] font-semibold text-center hover:shadow-lg hover:shadow-orange-500 hover:transition-shadow hover:drop-shadow-lg">{buttonText}</p>
                </Link>
            </div>
            
        </div>
    );
};

export default ProductCard;
