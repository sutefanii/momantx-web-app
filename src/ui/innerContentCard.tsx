import { Slider } from "./slider"

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
            <div className="min-h-[400px] pt-16 px-16">
                <h2 className="text-light text-4xl font-Unbounded tracking-[0.72px]">30.09.1941</h2>
                <h2 className="text-light text-4xl font-Unbounded tracking-[0.72px]">Маскоўская бітва</h2>
                <div className="mt-[25px] max-w-[460px] h-[460px] rounded-[20px] bg-white mx-auto">
                    <Slider />
                </div>
                <h1 className="text-light font-Unbounded text-4xl text-center mt-9">Аб падзеі</h1>
                <p className="text-light text-2xl font-Montserrat-Alternates leading-8 tracking-[0.44px] mt-8">Бітва за Маскву — баявыя дзеянні савецкіх і нямецкіх войскаў на маскоўскім напрамку. Дзеліцца на 2 перыяды: абарончы (30 верасня — 4 снежня 1941 года) і наступальны, які складаецца з двух этапаў: контрнаступленне (5 снежня 1941 года — 7 студзеня 1942 года) і наступленне савецкіх войскаў (7 студзеня — 30 сакавіка 1942 года). У заходняй гістарыяграфіі бітва вядомая як «Аперацыя Тайфун». 5 снежня 1941 года Чырвоная армія перайшла ў контрнаступленне па ўсім фронце пад Масквой, правёўшы пры гэтым шэраг паспяховых франтавых наступальных аперацый і адкінула ворага на 150—300 кіламетраў ад сталіцы. Бітва за Маскву — адзін з пераломных момантаў у Вялікай Айчыннай вайне.</p>

                <div className="my-11 flex justify-center items-center gap-9">
                    <button className="p-4 text-xl bg-buttonRed text-light rounded-[20px] font-Unbounded">
                        Схаваць
                    </button>
                    <a href="#" className="text-mainRed font-Unbounded text-xl">
                        Падрабязней
                    </a>
                </div>
            </div>
        </div>
    )
}