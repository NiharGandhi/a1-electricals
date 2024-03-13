import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-blue-950 text-white py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="mb-4">
                        <h3 className="text-xl font-bold mb-2">CONTACT US</h3>
                        <p>G-1053, Lodhika GIDC Metoda, Kalavad Road,</p>
                        <p>Metoda, Rajkot 360021, Gujarat, India</p>
                        <p className="mt-2">+91 93741 20257 | +91-93748 20257</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-xl font-bold mb-2">General Inquiry</h3>
                        <p>info@a1electricals.com</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-xl font-bold mb-2">Technical Inquiry</h3>
                        <p>nehal@a1electricals.com</p>
                        <p>nehalgandhi2001@gmail.com</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-xl font-bold mb-2">Sales Inquiry</h3>
                        <p>sales@a1electricals.com</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
