import { Dispatch, SetStateAction } from "react"
import { Slider } from "./slider"

export interface IDateAboutInfo {
    images: string[]
    date: string
    title: string
    text: string
    source_link: string
}

interface IInnerContentCardProps {
    isOpen: boolean
    dateToUse: IDateAboutInfo | null
    isOpenInnerContentCard: Dispatch<SetStateAction<boolean>>
}


export const InnerContentCard = ({isOpen, dateToUse, isOpenInnerContentCard}: IInnerContentCardProps) => {
    return (
        <div 
            className={`
                ${isOpen ? 'opacity-100' : 'opacity-0 left-[calc(50%-100vw)]'} 
                w-1/2 
                h-full  
                absolute 
                top-0 
                z-50 
                bg-darkCont 
                dark:bg-[#EFE7E7]
                transition-opacity 
                overflow-y-scroll 
                rounded-l-[40px]`}
            >
            <div className="min-h-[400px] pt-16 px-16">
                <h2 className="text-light dark:text-[#3D0103] text-4xl font-Unbounded tracking-[0.72px]">{dateToUse?.date}</h2>
                <h2 className="text-light dark:text-[#3D0103] text-4xl font-Unbounded tracking-[0.72px]">{dateToUse?.title}</h2>
                <div className="mt-[25px] max-w-[460px] h-[460px] rounded-[20px] bg-white mx-auto">
                    <Slider images={dateToUse?.images!} />
                </div>
                <h1 className="text-light dark:text-[#3D0103] font-Unbounded text-4xl text-center mt-9">Аб падзеі</h1>
                <p className="text-light dark:text-[#3D0103] text-2xl font-Montserrat-Alternates leading-8 tracking-[0.44px] mt-8">{dateToUse?.text}</p>

                <div className="my-11 flex justify-center items-center gap-9">
                    <button onClick={() => {
                        isOpenInnerContentCard(false)
                    }} className="p-4 text-xl bg-buttonRed text-light rounded-[20px] font-Unbounded">
                        Схаваць
                    </button>
                    <a href={dateToUse?.source_link} className="text-mainRed font-Unbounded text-xl">
                        Падрабязней
                    </a>
                </div>
            </div>
        </div>
    )
}