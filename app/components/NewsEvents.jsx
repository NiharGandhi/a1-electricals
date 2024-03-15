"use client";

import Image from "next/image";
import HeaderBanner from "../../public/assets/header-banner.jpg";
import BlogCard from "./BlogCard";
import Footer from "./Footer";

const blogData = [
    // {
    //     id: 1,
    //     title: "Hannover Messe Exibhition",
    //     description: "Visit Us at Hannover, Germany Fair From 1st Apr – 5th Apr 2019 at Hall 13, Stand B94",
    //     date: "December 20, 2018",
    //     image: "",
    // },
    // {
    //     id: 2,
    //     title: "Hannover Messe Exibhition",
    //     description: "Visit Us at Hannover, Germany Fair From 1st Apr – 5th Apr 2019 at Hall 13, Stand B94",
    //     date: "December 20, 2018",
    //     image: "",
    // },
];


export const NewsEvents = () => {
    return (
        <>
            <div className="items-center justify-center w-full mt-0 py-4 bg-white">
                <h1 className="text-orange-500 text-4xl md:text-6xl lg:text-6xl font-bold mt-2 mb-6 lg:mt-4 py-2 text-center">News & Events</h1>
            </div>
            <div className="max-w-3xl mx-auto mt-2 w-full mb-[120px]">
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
