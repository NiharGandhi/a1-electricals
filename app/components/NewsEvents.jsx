"use client";

import Image from "next/image";
import HeaderBanner from "../../public/assets/header-banner.jpg";
import BlogCard from "./BlogCard";
import Footer from "./Footer";

const blogData = [
    {
        id: 1,
        title: "Hannover Messe Exibhition",
        description: "Visit Us at Hannover, Germany Fair From 1st Apr – 5th Apr 2019 at Hall 13, Stand B94",
        date: "December 20, 2018",
        image: "",
    },
    {
        id: 2,
        title: "Hannover Messe Exibhition",
        description: "Visit Us at Hannover, Germany Fair From 1st Apr – 5th Apr 2019 at Hall 13, Stand B94",
        date: "December 20, 2018",
        image: "",
    },
];


export const NewsEvents = () => {
    return (
        <>
            <div className="relative">
                <div className="absolute inset-x-0 top-[30px] text-center">
                    <h1 className="text-center text-2xl md:text-lg lg:text-6xl leading-tight font-bold text-white lg:mt-[80px] lg:px-12">News & Events</h1>
                </div>
                <Image
                    src={HeaderBanner}
                    alt="Hero Image"
                    className="p-0 m-0"
                    layout="responsive"
                    width={1200}
                    height={600}
                />
            </div>
            <div className="max-w-3xl mx-auto mt-8 w-full">
                {blogData.length > 0 ? (
                    blogData.map((item) => (
                        <BlogCard
                            key={item.id}
                            title={item.title}
                            description={item.description}
                            date={item.date}
                            image={item.image}
                        />
                    ))
                ) : (
                    <div className="bg-white shadow-md rounded-md p-4 text-center shadow-blue-950 m-4">
                        No News or Events at the moment
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}
