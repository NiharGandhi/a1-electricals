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
            <div className="items-center justify-center w-full mt-0 py-4 bg-white">
                    <h1 className="text-orange-500 text-4xl md:text-6xl lg:text-6xl font-bold mt-2 mb-6 lg:mt-4 py-2 text-center">Products</h1>
            </div>
            <div className="container mx-auto">
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
