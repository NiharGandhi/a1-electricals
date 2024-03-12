// OtherProductCard.jsx

import Image from "next/image";

const OtherProductCard = ({ imageSrc, title }) => {
    return (
        <div className="bg-gray-50 rounded-lg shadow-md shadow-blue-950 w-[450px justify-center items-center px-2 m-4">
            <div className="relative">
                <Image src={imageSrc} alt={title} width={500} height={200} className="py-2" />
            </div>
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{title}</h2>
            </div>
        </div>
    );
};

export default OtherProductCard;
