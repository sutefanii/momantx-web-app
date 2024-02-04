"use client"

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { GetItem, IItemContent } from "@/lib/handleItems"
import { IDateAboutInfo } from "./innerContentCard"


interface ICardProps {
    onClick: Dispatch<SetStateAction<boolean>>
    dateToResponse: Dispatch<SetStateAction<IDateAboutInfo | null>>
    title: string
    date: string
    text: string
    source_link: string
    id: number
}


export const Card = ({onClick, dateToResponse, title, date, text, source_link, id}: ICardProps) => {
    const [dateToResponseData, setDateToResponseData] = useState<IItemContent>();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const item = await GetItem(id);
                setDateToResponseData(item as IItemContent);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };

        fetchData();
    }, []);
    return (
        <div
            onClick={() => {
                dateToResponse({
                    images: [...dateToResponseData?.imageReal!, ...dateToResponseData?.imageAi!],
                    date: dateToResponseData?.date!,
                    title: dateToResponseData?.name!,
                    text: dateToResponseData?.text!,
                    source_link: dateToResponseData?.source_link!
                })
                onClick(true)
            }}
            className="
            max-w-[220px] 
            h-[270px] 
            bg-darkCard 
            rounded-[15px] 
            py-5 
            px-[15px] 
            hover:bg-darkHover 
            transition-colors 
            cursor-pointer 
            select-none"
        >
            <h2 className="
                text-light 
                text-2xl 
                font-Montserrat-Alternates 
                font-medium"
            >{date}</h2>
            <h3 className="
                text-light 
                max-w-32 
                font-Montserrat-Alternates 
                font-medium"
            >{title}</h3>

            <h3 className="
                text-light 
                mt-10 
                font-Montserrat-Alternates 
                font-medium">
                    Аб падзеі</h3>
            <p className="
                text-light 
                mt-2 
                text-xs 
                font-Montserrat-Alternates">{text}</p>
        </div>
    )
}