'use client'
import ThemeSwitcher from "@/lib/providers/themeSwitcher";
import { HOME_PAGE, TESTS_PAGE } from "@/lib/routes";
import logoDark from "@/styles/img/darkLogo.svg"
import lightLogo from "@/styles/img/lightLogo.svg"
import { useTheme } from "next-themes";
import Image from "next/image"
import Link from "next/link";
import { useState } from "react";

export const Header = ({pathName}: {
    pathName: string
}) => {
    const [isOpenChatBlock, setStateChatBlock] = useState<boolean>(false) 
    const [openBurger, setStateBurger] = useState<boolean>(false)
    const {systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === "system" ? systemTheme : theme ;
    return (
        <header>
            <div className="container">
                <nav className="flex justify-between items-center mt-16">
                    <Link href={HOME_PAGE} className="flex justify-start items-center gap-5">
                        <Image src={currentTheme === "dark" ? lightLogo : logoDark} alt="Logo MomantX" className="max-w-[75px] lg:max-w-[70px] sm:max-w-[58px]" />
                        <h1 className="text-light font-Unbounded font-bold text-[32px] lg:text-[28px] sm:text-[22px] dark:text-[#650205]">МомантX</h1>
                    </Link>
                    <ul className="flex gap-12 md:hidden">
                        <li>
                            <Link className={`${pathName === 'home' ? 'text-mainRed font-medium' : 'text-light dark:text-[#0F0404]'} item-link`} href={HOME_PAGE}>
                                <span>Каляндар</span>
                            </Link>
                        </li>
                        <li>
                            <Link className={`${pathName === 'tests' ? 'text-mainRed font-medium' : 'text-light dark:text-[#0F0404]'} item-link`} href={TESTS_PAGE}>
                                <span>Тэсты</span>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={() => {
                                setStateChatBlock(!isOpenChatBlock)
                            }} className="relative text-light item-link font-normal dark:text-[#0F0404]" href={'#'}>
                                <span>Чат</span>
                                <div className={`${isOpenChatBlock ? 'block' : 'hidden'} absolute top-[40px] p-[10px] left-1/2 bg-darkCard dark:bg-[#F8F5F5] dark:text-darkCard transform translate-x-[-50%] w-40 h-50 rounded-lg text-xs z-50`}>
                                    <p>Чат зараз знаходзіцца ў стадыі распрацоўкі. Мы абавязкова паведамім вам аб яго запуску!</p>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <ThemeSwitcher />
                        </li>
                    </ul>


                    <ul className={`h-full z-[100] bg-darkBg flex-col fixed right-0 top-[140px] w-full p-[60px] gap-[40px] justify-start transition-all ${openBurger ? 'right-0' : 'right-[-100vw]'}`}>
                        <li className="mb-[40px]">
                            <Link className={`${pathName === 'home' ? 'text-mainRed font-medium' : 'text-light'} font-Montserrat-Alternates text-[36px]`} href={HOME_PAGE}>
                                <span>Каляндар</span>
                            </Link>
                        </li>
                        <li className="mb-[40px]">
                            <Link className={`${pathName === 'tests' ? 'text-mainRed font-medium' : 'text-light'} font-Montserrat-Alternates text-[36px]`} href={TESTS_PAGE}>
                                <span>Тэсты</span>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={() => {
                                setStateChatBlock(!isOpenChatBlock)
                            }} className="relative text-light font-Montserrat-Alternates text-[36px] font-normal" href={'#'}>
                                <span>Чат</span>
                                <div className={`${isOpenChatBlock ? 'block' : 'hidden'} absolute top-[40px] p-[10px] left-0 bg-darkCard transform mt-[15px] w-40 h-50 rounded-lg text-xs z-50`}>
                                    <p>Чат зараз знаходзіцца ў стадыі распрацоўкі. Мы абавязкова паведамім вам аб яго запуску!</p>
                                </div>
                            </Link>
                        </li>
                    </ul>
                   {/* <!-- Burger Button --> */}
                    <button onClick={() => {
                        setStateBurger(!openBurger)
                    }} className={`burger hidden md:block ${openBurger && 'active'}`}>
                        <span className="burger-line top-line "></span>
                        <span className="burger-line mid-line "></span>
                        <span className="burger-line bottom-line "></span>
                    </button>
                </nav>
            </div>
        </header>
    )
}