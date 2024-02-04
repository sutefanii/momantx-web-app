'use client'
import { Header } from '@/ui/header'
import { usePathname } from 'next/navigation'
 
export default function TestPage() {
  const pathname = usePathname()
  const questions = [
    {
        id:1
    },
    {
        id:2
    },
    {
        id:3
    },
    {
        id:4
    },
    {
        id:5
    },
    {
        id:6
    },
    {
        id:7
    },
    {
        id:8
    },
    {
        id:9
    },
    {
        id:10
    }
  ]

  return (
    <>
        <Header pathName='tests' />
        <main>
            <section id='infoTest' className='mb-[70px]'>
                <div className='container'>
                    <h1 className='text-light text-[40px] font-bold font-Unbounded mt-[70px] tracking-wide'>Тэст па 1939 годзе</h1>
                    <p className='max-w-[995px] text-light text-2xl font-normal font-Montserrat-Alternates leading-[33px] tracking-wide'>Дадзены тэст прызначаны для паглыблення і структуравання вашых ведаў аб гэтым годзе. Усе пытанні заснаваны выключна на інфармацыі, прадстаўленай у календары.</p>
                </div>
            </section>
            <section id='statusTest'>
                <div className=' container px-[50px]'>
                    <div className='w-full h-[100px] px-[62px] py-[25px] bg-darkCont rounded-[30px] justify-between items-center gap-[7px] flex'>
                        {questions.map(item => (
                            <div key={item.id} className='flex items-center gap-[7px]'>
                                <div className='w-[50px] h-[50px] bg-dotsBg rounded-full'></div>
                                {item !== questions[questions.length-1] && <div className='w-[50px] h-[4px] rounded-[3px] bg-dotsBg'></div>}
                            </div>
                            
                        ))}
                    </div>
                </div>
            </section>
            <section id='questionForm' className='mt-[50px]'>
                <div className='container'>
                    <div className='w-full h-[620px] mb-32 bg-darkCont rounded-[40px] px-[40px] py-[45px]'>
                        <p className='text-mainRed font-Montserrat-Alternates text-2xl'>Пытанне 1 з 10</p>
                        <h2 className='text-[28px] font-Montserrat-Alternates mt-2 text-light'>Хто былі падпісанты Пакта Молатава-Рыбентропа ад боку Германіі і СССР адпаведна?</h2>
                        <ul className='mt-[45px] ml-[20px]'>
                            <li className='mb-[40px]'>
                                <button className='flex gap-6 items-center'>
                                    <div className='w-[36px] h-[36px] rounded-full bg-dotsBg'></div>
                                    <p className='text-xl font-Montserrat-Alternates text-light'>Іаахім фон Рыбентроп і Іосіф Сталін</p>
                                </button>
                            </li>
                            <li className='mb-[40px]'>
                                <button className='flex gap-6 items-center'>
                                    <div className='w-[36px] h-[36px] rounded-full bg-dotsBg'></div>
                                    <p className='text-xl font-Montserrat-Alternates text-light'>Іаахім фон Рыбентроп і Іосіф Сталін</p>
                                </button>
                            </li>
                            <li className='mb-[40px]'>
                                <button className='flex gap-6 items-center'>
                                    <div className='w-[36px] h-[36px] rounded-full bg-dotsBg'></div>
                                    <p className='text-xl font-Montserrat-Alternates text-light'>Іаахім фон Рыбентроп і Іосіф Сталін</p>
                                </button>
                            </li>
                            <li className='mb-[40px]'>
                                <button className='flex gap-6 items-center'>
                                    <div className='w-[36px] h-[36px] rounded-full bg-dotsBg'></div>
                                    <p className='text-xl font-Montserrat-Alternates text-light'>Іаахім фон Рыбентроп і Іосіф Сталін</p>
                                </button>
                            </li>
                        </ul>
                        <button className='w-[280px] h-[57px] p-4 bg-buttonRed rounded-[20px] justify-center items-center gap-2.5 inline-flex '>
                            <span className='text-light text-xl font-normal font-Unbounded tracking-tight'>Наступнае пытанне</span>
                        </button>
                    </div>
                </div>
            </section>
        </main>
    </>
  )
}