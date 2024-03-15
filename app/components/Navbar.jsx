"use client";
import { useState } from 'react';
import { usePathname } from 'next/navigation'
import Image from 'next/image';
import Logo from '../../public/assets/a1-logo.png';
import Menu from '../../public/assets/menu.svg';
import Link from 'next/link';

const navLinks = [
    { name: 'Home', url: '/' },
    { name: 'About Us', url: '/About-Us' },
    { name: 'Our Products', url: '/products' },
    { name: 'News & Events', url: '/News-Events' },
    { name: 'Inquiry', url: '/Inquiry' },
    { name: 'Contact Us', url: '/Contact-Us' },
    { name: 'Distributors', url: '/Distributors' },
];

export const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathName = usePathname();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="flex w-full items-center justify-between px-[20px] py-[16px] lg:container lg:mx-auto lg:px-20 bg-blue-950">
            <div className="flex items-center">
                <Image src={Logo} alt="Logo" width={50} height={50} />

                <div className="hidden lg:flex pl-[74px] gap-x-[56px]">
                    {navLinks.map((item, index) => {
                        return (
                            <Link
                                className={`text-white font-bold hover:text-orange-400 ${pathName === item.url ? 'text-orange-600 !important' : ''}`}
                                href={item.url}
                                key={index}
                            >
                                {item.name}
                            </Link>
                        );
                    })}
                </div>
            </div>

            <div className="flex gap-x-5">
                <button onClick={toggleMobileMenu}>
                    <Image src={Menu} alt="Menu" width={50} height={50} className="lg:hidden" />
                </button>
            </div>

            {isMobileMenuOpen && (
                <div className="lg:hidden absolute top-[80px] right-0 left-0 bg-blue-950 z-50">
                    {navLinks.map((item, index) => {
                        return (
                            <Link
                                className={`block text-white font-bold px-4 py-2 hover:text-orange-600 ${pathName === item.url ? 'text-orange-500' : ''
                                    }`}
                                href={item.url}
                                key={index}
                            >
                                {item.name}
                            </Link>
                        );
                    })}
                </div>
            )}
        </nav>
    );
};
