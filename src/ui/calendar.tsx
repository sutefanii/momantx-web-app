"use client"

import { useEffect, useState } from "react"
import { Card } from "./card"
import { IDateAboutInfo, InnerContentCard } from "./innerContentCard"
import { GetItems } from "@/lib/handles/handleItems"
import type { IItemContent } from "@/lib/handles/handleItems"
import { useSearchParams } from 'next/navigation'
import { Loader } from "./loader"
// Icons
import arrowLeft from "@/styles/img/angle-left.svg"
import arrowRight from "@/styles/img/angle-right.svg"
import arrowLeft_Light from "@/styles/img/angle-left-light.svg"
import arrowRight_Light from "@/styles/img/angle-right-light.svg"
import Image from "next/image"
import { useTheme } from "next-themes"


export const Calendar = () => {
    const [openInnerContentCard, isOpenInnerContentCard] = useState<boolean>(false)
    const [infoAboutDate, setInfoAboutDate] = useState<IDateAboutInfo | null>(null)
    const [itemsByThisYear, setItemsByThisYear] = useState<IItemContent[]>([])
    const [yearNow, setYearNow] = useState<number>(1939)
    // Loading
    const [isLoading, setLoading] = useState<boolean>(false)

    const searchParams = useSearchParams()
    const cardItem = searchParams.get('card')

    const {systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === "system" ? systemTheme : theme ;

    const getStateWindow = (items: IItemContent[]) => {
        if (cardItem) {
            const finderItem = items.filter(item => item.slug === cardItem)[0]
            setInfoAboutDate({
                images: [...finderItem?.imageReal!, ...finderItem?.imageAi!],
                date: finderItem?.date!,
                title: finderItem?.name!,
                text: finderItem?.text!,
                source_link: finderItem?.source_link!
            })
            isOpenInnerContentCard(true)
        }
        return true 
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const items = await GetItems();
                getStateWindow(items)
                const itemsForCurrentYear = items.filter(item => item.Year.year === yearNow);
                setItemsByThisYear(itemsForCurrentYear as IItemContent[]);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
            setLoading(false)
        };

        fetchData();
    }, [yearNow]);

    const changeYear = (state: boolean) => {
        const maxYear = 1945
        const minYear = 1939

        if (state && yearNow+1 <= maxYear) {
            setYearNow(yearNow+1)
            return;
        }
        if (!state && yearNow-1 >= minYear) {
            setYearNow(yearNow-1)
            return;
        }
    }

    return (
        <div className="container mb-9">
            <div className="
                max-w-full
                min-h-[840px]
                bg-darkCont 
                rounded-[40px] 
                py-[50px] 
                mx-auto 
                lg:max-w-[884px] 
                dark:bg-[#F8F5F5]
                relative">
                <div className="
                    m-auto 
                    max-w-[1000px] 
                    lg:max-w-[680px] 
                    md:w-[520px] 
                    flex 
                    justify-between">
                    <h1 className="
                        text-light 
                        text-6xl 
                        dark:text-[#650205]
                        font-Unbounded
                        font-bold"
                    >
                        {yearNow}
                    </h1>
                    <div className=" w-20 flex justify-end gap-4">
                        <button className=" text-light" onClick={() => changeYear(false)}>
                            <Image src={currentTheme === "dark" ? arrowLeft_Light : arrowLeft} alt="arrowLeft" />
                        </button>
                        <button className=" text-light" onClick={() => changeYear(true)}>
                            <Image src={currentTheme === "dark" ? arrowRight_Light : arrowRight} alt="arrowRight" />
                        </button>
                    </div>
                </div>
                {isLoading ? 
                    (
                        <Loader />
                    )
                    : (
                        <>
                            <InnerContentCard 
                                isOpen={openInnerContentCard} 
                                dateToUse={infoAboutDate}
                                isOpenInnerContentCard={isOpenInnerContentCard}
                            />
                            <div className={`
                                md:grid
                                md:grid-cols-2
                                md:w-[520px]
                                grid 
                                lg:grid-cols-3 
                                lg:max-w-[680px]
                                grid-cols-4
                                gap-10 
                                mt-10 
                                m-auto 
                                max-w-[1000px] 
                                relative`}
                            >
                                {
                                    itemsByThisYear.length !== 0 ? itemsByThisYear.map(item => (
                                        <Card 
                                            key={item.id}
                                            onClick={isOpenInnerContentCard}
                                            dateToResponse={setInfoAboutDate}
                                            title={`${item.name.length > 19 ? item.name.slice(0, 19)+'..' : item.name}`}
                                            date={item.date}
                                            text={`${item.text.slice(0, 80)}..`}
                                            id={item.id}
                                            source_link={item.source_link}
                                        />
                                    ))
                                    : (
                                        <h2 className=" text-light font-Montserrat-Alternates text-2xl text-center absolute left-1/2 translate-x-[-50%]">
                                            Упс.. В данном году мы не внесли событий :(
                                        </h2>
                                    )
                                }
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}