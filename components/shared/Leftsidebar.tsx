"use client"

import { leftbarlinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';

function Leftsidebar() {

    const router = useRouter();
    const pathname = usePathname();
    return (
        <section className="custom-scrollbar leftsidebar">
            <div className="leftcontainer">
                
                {leftbarlinks.map((link) => {
                    
                    const isActive = ( pathname.includes (link.route) && link.route.length > 1) || pathname === link.route;

                    return (
                        <Link 
                        href={link.route}
                        key={link.label}
                        className={`leftlinks ${isActive && 'bg-primary-500'}`}
                    >
                    <Image
                        src={link.imgURL}
                        alt={link.label}
                        width={30}
                        height={30}
                    />

                    <p className="text-light-1 max-lg:hidden">{link.label}</p>
                    </Link>
                    )}
                )}

                
            </div>
        </section>
    )
}

export default Leftsidebar;