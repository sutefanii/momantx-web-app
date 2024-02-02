'use client'
import { HOME_PAGE } from "@/lib/routes";
import logoDark from "@/styles/img/darkLogo.svg"
import Image from "next/image"
import Link from "next/link";

export const Header = () => {
    return (
        <header>
            <div className="container">
                <nav className="flex justify-between items-center mt-16">
                    <Link href={HOME_PAGE} className="flex justify-start items-center gap-5">
                        <Image src={logoDark} alt="Logo MomantX" className="max-w-[75px] lg:max-w-[70px] sm:max-w-[58px]" />
                        <h1 className="text-light font-Unbounded font-medium text-[32px] lg:text-[28px] sm:text-[22px]">МомантX</h1>
                    </Link>
                    <ul className="flex gap-12 md:hidden">
                        <li>
                            <Link className="text-mainRed item-link font-medium" href={HOME_PAGE}>
                                Календарь
                            </Link>
                        </li>
                        <li>
                            <Link className="text-light item-link font-normal" href={HOME_PAGE}>
                                Тесты
                            </Link>
                        </li>
                        <li>
                            <Link className="text-light item-link font-normal" href={HOME_PAGE}>
                                Чат
                            </Link>
                        </li>
                    </ul>
                   {/* <!-- Burger Button --> */}
                    <button className="burger hidden md:block" >
                        <span className="burger-line top-line "></span>
                        <span className="burger-line mid-line "></span>
                        <span className="burger-line bottom-line "></span>
                    </button>
                </nav>
            </div>
        </header>
    )
}