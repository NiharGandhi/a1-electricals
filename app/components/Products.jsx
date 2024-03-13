// Products.jsx

import Image from "next/image";
import HeaderBanner from "../../public/assets/header-banner.jpg";
import ProductCard from "./ProductCard";
import Product1 from "../../public/assets/product-1.jpg";
import Product2 from "../../public/assets/product-2.jpg";
import Product3 from "../../public/assets/product-3.jpg";
import Product4 from "../../public/assets/product-4.jpg";
import Product5 from "../../public/assets/product-5.jpg";
import Footer from "./Footer";

export const Products = () => {
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
                    <h1 className="text-white text-4xl md:text-6xl lg:text-8xl font-bold mt-[-200px] lg:mt-[-650px]">Our Products</h1>
                </div>
            </div>

            <div className="container mx-auto py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ProductCard
                        imageSrc= {Product1}
                        title="Industrial Brass Cable Glands & Accessories"
                        buttonText="View Details"
                        buttonLink="/product1"
                    />
                    <ProductCard
                        imageSrc={Product2} // Replace with the actual image source
                        title="Compression Copper / Aluminium Cable Lugs & Connectors"
                        buttonText="View Details"
                        buttonLink="/product2"
                    />
                    <ProductCard
                        imageSrc={Product3} // Replace with the actual image source
                        title="Aluminium & PVC Cable Cleats"
                        buttonText="View Details"
                        buttonLink="/product3"
                    />
                    <ProductCard
                        imageSrc={Product4} // Replace with the actual image source
                        title="Accessories for Cable Termination & Cable Joints"
                        buttonText="View Details"
                        buttonLink="/product4"
                    />
                    <ProductCard
                        imageSrc={Product5} // Replace with the actual image source
                        title="Other Tailor Made Components"
                        buttonText="View Details"
                        buttonLink="/product5"
                    />
                </div>
            </div>
            <Footer />
        </>
    );
};
