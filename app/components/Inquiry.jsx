"use client";
import Image from "next/image";
import { useState } from "react";
import HeaderBanner from "../../public/assets/header-banner.jpg";
import Footer from "./Footer";

export const Inquiry = () => {
    const [formData, setFormData] = useState({
        contactPerson: "",
        companyName: "",
        address: "",
        email: "",
        phone: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        fax: "",
        inquiryFor: "",
        comments: "",
        name: "",
        emailAddress: "",
        phone: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send form data to backend for processing and email sending
        console.log(formData);
        // Reset form fields after submission
        setFormData({
            contactPerson: "",
            companyName: "",
            address: "",
            email: "",
            phone: "",
            city: "",
            state: "",
            country: "",
            postalCode: "",
            fax: "",
            inquiryFor: "",
            comments: "",
            name: "",
            emailAddress: "",
            phone: "",
            message: ""
        });
    };

    return (
        <>  
            <div className="items-center justify-center w-full mt-0 py-4 bg-white">
                <h1 className="text-orange-500 text-4xl md:text-6xl lg:text-6xl font-bold mt-2 mb-6 lg:mt-4 py-2 text-center">Inquiry</h1>
            </div>
            <div className="relative">
                {/* Your header banner and title */}
                <form className="max-w-3xl mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-lg" onSubmit={handleSubmit}>
                    {/* Contact Person */}
                    <div className="mb-4">
                        <label className="block mb-2">Contact Person*</label>
                        <input type="text" name="contactPerson" value={formData.contactPerson} onChange={handleChange} className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500" required />
                    </div>
                    {/* Company Name */}
                    <div className="mb-4">
                        <label className="block mb-2">Company Name</label>
                        <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500" />
                    </div>
                    {/* Address */}
                    <div className="mb-4">
                        <label className="block mb-2">Address</label>
                        <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500" />
                    </div>
                    {/* Email */}
                    <div className="mb-4">
                        <label className="block mb-2">E-mail*</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500" required />
                    </div>
                    {/* Phone */}
                    <div className="mb-4">
                        <label className="block mb-2">Phone</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500" />
                    </div>
                    {/* City */}
                    <div className="mb-4">
                        <label className="block mb-2">City</label>
                        <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500" />
                    </div>
                    {/* State */}
                    <div className="mb-4">
                        <label className="block mb-2">State</label>
                        <input type="text" name="state" value={formData.state} onChange={handleChange} className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500" />
                    </div>
                    {/* Country */}
                    <div className="mb-4">
                        <label className="block mb-2">Country</label>
                        <input type="text" name="country" value={formData.country} onChange={handleChange} className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500" />
                    </div>
                    {/* Postal Code */}
                    <div className="mb-4">
                        <label className="block mb-2">Postal Code</label>
                        <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500" />
                    </div>
                    {/* Fax */}
                    <div className="mb-4">
                        <label className="block mb-2">Fax</label>
                        <input type="text" name="fax" value={formData.fax} onChange={handleChange} className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500" />
                    </div>
                    {/* Inquiry For */}
                    <div className="mb-4">
                        <label className="block mb-2">Inquiry For</label>
                        <select name="inquiryFor" value={formData.inquiryFor} onChange={handleChange} className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500">
                            <option value="">Select</option>
                            <option value="Industrial cable glands - A1/A2, BW and CW gland kits">Industrial cable glands - A1/A2, BW and CW gland kits</option>
                            {/* Add other options similarly */}
                        </select>
                    </div>
                    {/* Comments */}
                    <div className="mb-4">
                        <label className="block mb-2">Comments</label>
                        <textarea name="comments" value={formData.comments} onChange={handleChange} className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"></textarea>
                    </div>
                    {/* Captcha */}
                    <div className="mb-4">
                        <label className="block mb-2">1 + zero = ?</label>
                        <input type="text" name="captcha" className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500" />
                    </div>
                    <div>
                        <div>
                            <button type="submit" className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    );
};
