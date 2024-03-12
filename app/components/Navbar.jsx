import Image from "next/image";
import Logo from "../../public/assets/a1-logo.png"; 
import Menu from "../../public/assets/menu.svg";
import Link from "next/link";

const navLinks = [
    {name: "Home", url:"/"},
    { name: "About Us", url: "/About-Us"},
    { name: "Our Products", url: "/products"},
    { name: "News & Events", url: "/News-Events"},
    {name: "Inquiry", url: "/Inquiry"},
    {name: "Contact Us", url: "/Contact-Us"},
];

export const Navbar = () => {
    return (
        <nav className="flex w-full items-center justify-between px-[20px] py-[16px] lg:container lg:mx-auto lg:px-20  bg-blue-950">
            <div className="flex items-center">
                <Image src={Logo} alt="Logo" width={50} height={50}/>

                <div className="hidden lg:flex pl-[74px] gap-x-[56px]">
                    {navLinks.map((item, index) => (
                        <Link className="text-white font-bold hover:text-orange-500" href={item.url} key={index}>{item.name}</Link>
                    ))}
                </div>

            </div>

            <div className="flex gap-x-5">
                <p className="text-white font-bold mt-3 lg:mt-0 pr-[0px] lg:pr-[0px] py-0 font-serif text-2xl">Distributors</p>
                <div className="flex items-center gap-x-2">
                    
                </div>

                <Image src={Menu} alt="Menu" width={50} height={50} className="lg:hidden"/>
            </div>
        </nav>
    )
}