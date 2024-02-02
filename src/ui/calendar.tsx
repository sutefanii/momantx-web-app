"use client"

import { useState } from "react"
import { Card } from "./card"
import { InnerContentCard } from "./innerContentCard"

export const Calendar = () => {
    const [openInnerContentCard, isOpenInnerContentCard] = useState<boolean>(false)
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
                <InnerContentCard 
                    isOpen={openInnerContentCard} 
                />
                <h1 className="
                    text-light 
                    text-6xl 
                    font-Unbounded
                    font-bold
                    m-auto 
                    max-w-[1000px] 
                    lg:max-w-[680px] 
                    md:max-w-[520px]"
                >
                    1941
                </h1>
                <div className="
                    grid 
                    grid-cols-4 
                    gap-10 
                    mt-10 
                    lg:grid-cols-3 
                    m-auto max-w-[1000px] 
                    lg:max-w-[680px] 
                    md:w-[520px] 
                    md:grid-cols-2 
                    md:gap-5"
                >
                    <Card 
                        onClick={isOpenInnerContentCard} 
                        isOpen={openInnerContentCard} 
                    />
                    <Card 
                        onClick={isOpenInnerContentCard} 
                        isOpen={openInnerContentCard} 
                    />
                    <Card 
                        onClick={isOpenInnerContentCard} 
                        isOpen={openInnerContentCard} 
                    />
                    <Card 
                        onClick={isOpenInnerContentCard} 
                        isOpen={openInnerContentCard} 
                    />
                    <Card 
                        onClick={isOpenInnerContentCard} 
                        isOpen={openInnerContentCard} 
                    />
                    <Card 
                        onClick={isOpenInnerContentCard} 
                        isOpen={openInnerContentCard} 
                    />
                    <Card 
                        onClick={isOpenInnerContentCard} 
                        isOpen={openInnerContentCard} 
                    />
                    <Card 
                        onClick={isOpenInnerContentCard} 
                        isOpen={openInnerContentCard} 
                    />  
                </div>
            </div>
        </div>
    )
}