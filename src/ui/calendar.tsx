"use client"

import { useEffect, useState } from "react"
import { Card } from "./card"
import { IDateAboutInfo, InnerContentCard } from "./innerContentCard"
import { GetItems } from "@/lib/handles/handleItems"
import type { IItemContent } from "@/lib/handles/handleItems"
// Icons
import arrowLeft from "@/styles/img/angle-left.svg"
import arrowRight from "@/styles/img/angle-right.svg"
import Image from "next/image"
import { Loader } from "./loader"


export const Calendar = () => {
    const [openInnerContentCard, isOpenInnerContentCard] = useState<boolean>(false)
    const [infoAboutDate, setInfoAboutDate] = useState<IDateAboutInfo | null>(null)
    const [itemsByThisYear, setItemsByThisYear] = useState<IItemContent[]>([])
    const [yearNow, setYearNow] = useState<number>(1939)
    // Loading
    const [isLoading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const items = await GetItems();
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
                relative">
                <div className="m-auto 
                    max-w-[1000px] 
                    lg:max-w-[680px] 
                    md:max-w-[520px] flex justify-between">
                    <h1 className="
                        text-light 
                        text-6xl 
                        font-Unbounded
                        font-bold"
                    >
                        {yearNow}
                    </h1>
                    <div className=" w-20 flex justify-end gap-4">
                        <button className=" text-light" onClick={() => changeYear(false)}>
                            <Image src={arrowLeft} alt="arrowLeft" />
                        </button>
                        <button className=" text-light" onClick={() => changeYear(true)}>
                            <Image src={arrowRight} alt="arrowRight" />
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
                            <div className="
                                grid 
                                grid-cols-4 
                                gap-10 
                                mt-10 
                                m-auto 
                                max-w-[1000px] 
                                lg:grid-cols-3 
                                lg:max-w-[680px] 
                                md:grid-cols-2 
                                md:w-[520px] 
                                md:gap-5 
                                relative"
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