// Distributors.jsx
"use client";

import Image from "next/image";
import HeaderBanner from "../../public/assets/header-banner.jpg";
import Footer from "./Footer";
import DistributorCard from "./DistributorCard";

export const Distributors = () => {
    return (
        <>
            <div className="items-center justify-center w-full mt-0 py-4 bg-white">
                <h1 className="text-orange-500 text-4xl md:text-6xl lg:text-6xl font-bold mt-2 mb-2 lg:mt-4 py-2 text-center">Distributors</h1>
            </div>
            <div className="w-full h-full bg-white mt-1 p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
                    {/* Distributor Cards */}
                    <DistributorCard
                        countryName="Singapore"
                        companyName="Cable Accessories Networks Pte Ltd"
                        address="101 Kitchener Road, #02-25, Jln Besar Plaza"
                        address2="Singapore 208511"
                        tel="+65-62938873"
                        fax="+65-62948873"
                    />
                    <DistributorCard
                        countryName="Egypt"
                        companyName="E&I Company"
                        address="9 Elnadi Elgdeed Street,"
                        address2="Maadi, Cairo Egypt"
                        tel="+201090028200"
                    />
                    <DistributorCard
                        countryName="United Kingdom"
                        companyName="Top Cable Accessories Ltd"
                        address="Unit F2C Bath Trading Estate, Glos"
                        address2="Stroud GL5 3QF"
                        tel="+44-1453-765666"
                        fax="+44-1453-755522"
                    />
                    <DistributorCard
                        countryName="Dubai"
                        companyName="Danway LLC"
                        poBox="50048"
                        address="Dubai, UAE"
                        tel="+971-4-3473700"
                        fax="+971-4-3473232"
                    />
                    <DistributorCard
                        countryName="Bahrain"
                        companyName="Al Bakali General Trading Co."
                        poBox="1466"
                        address="Manama, BAHRAIN"
                        tel="+97317551109"
                        fax="+97317551103"
                    />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Distributors;
