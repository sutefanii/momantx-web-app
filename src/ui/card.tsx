"use client"

import { Dispatch, MouseEventHandler, SetStateAction } from "react"

export const Card = ({isOpen, onClick}: {
    isOpen: boolean,
    onClick: Dispatch<SetStateAction<boolean>>
}) => {
    return (
        <div
            onClick={() => onClick(!isOpen)}
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
            >30.09</h2>
            <h3 className="
                text-light 
                max-w-32 
                font-Montserrat-Alternates 
                font-medium"
            >Маскоўская бітва.</h3>

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
                font-Montserrat-Alternates">
                    Бітва за Маскву – адна з найвялікшых падзей Вялікай Айчыннай вайны. Маскоўская бітва стала першай стратэгічнай...</p>
        </div>
    )
}