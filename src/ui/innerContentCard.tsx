interface IInnerContentCardProps {
    isOpen: boolean
}


export const InnerContentCard = ({isOpen}: IInnerContentCardProps) => {
    return (
        <div 
            className={`
                ${isOpen ? 'opacity-100' : 'opacity-0 left-[calc(50%-100vw)]'} 
                w-1/2 
                h-[840px] 
                absolute 
                top-0 
                bg-darkCont 
                transition-opacity 
                overflow-y-scroll 
                rounded-l-[40px]`}
            >
            <div className="h-[1900px]">

            </div>
        </div>
    )
}