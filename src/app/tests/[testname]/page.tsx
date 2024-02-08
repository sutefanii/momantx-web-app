'use client'
import { GetQuestions, IQuestionsContent } from '@/lib/handles/handlesQuestions'
import { HOME_PAGE } from '@/lib/routes'
import { Header } from '@/ui/header'
import { Loader } from '@/ui/loader'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
export default function TestPage() {
    const pathname = usePathname(); // Assuming usePathname is a custom hook provided elsewhere
    const pathList = pathname.split("/");
    const testID = Number(pathList[pathList.length-1]);

    // Nav to website
    const router = useRouter()
  
    const [questions, setQuestions] = useState<IQuestionsContent[] | null>(null);
    // Loading
    const [isLoading, setIsLoading] = useState<boolean>(true)
    // Results
    const [result, setResult] = useState<number>(0)
    // Back Answer
    const [backAnswer, setBackAnswer] = useState<string>();
  
    useEffect(() => {
      const fetchQuestions = async () => {
        setIsLoading(true)
        try {
          const questions = await GetQuestions(); // Assuming GetQuestions is a function that fetches questions
          const questionsResult = questions.filter(question => question.Test.id === testID);
          setQuestions(questionsResult);
          console.log(questionsResult)
        } catch (error) {
          console.error("Error fetching questions:", error);
        }
        setIsLoading(false)
      };
      fetchQuestions();
    }, [testID]); // Adding testID as a dependency to re-run the effect when it changes


    interface QLabel {
      id: number
      isCorrect: boolean | null
    }
  
    const [qLabel, setQLabel] = useState<QLabel[]>([
      {id:1, isCorrect: null},
      {id: 2, isCorrect: null},
      {id: 3, isCorrect: null},
      {id: 4, isCorrect: null},
      {id: 5, isCorrect: null},
      {id: 6, isCorrect: null},
      {id: 7, isCorrect: null},
      {id: 8, isCorrect: null},
      {id: 9, isCorrect: null},
      {id: 10, isCorrect: null}
    ])
    const [questionNow, setQuestionNow] = useState<number>(0);
    const [answerL, setAnswer] = useState<string | null>(null)
  
    return (
      <>
      {
        questionNow === 10 && <div className={` transition-opacity fixed left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[1090px] bg-darkCont z-50 rounded-[40px] ${questionNow === 10 ? ' opacity-100' : ' opacity-0'}`}>
        <div className='p-[45px]'>
          <h1 className='text-mainRed font-Unbounded text-[32px]'>{result} з 10</h1>
          <h1 className=' font-Unbounded text-light text-[32px]'>Дакладных адказаў!</h1>
          <div className=' mt-[25px] mb-[45px] pt-[25px] border-t-[2px] border-t-buttonRed'>
            <p className=' text-[24px] font-Montserrat-Alternates text-light'>
              {
                result <= 4 && <>Дрэнныя вынікі могуць быць выдатным стымулам для паляпшэння. Разбярыцеся, у чым заключаюцца вашыя слабыя бакі, і працуйце над імі.</>
              }
              {
                result <= 8 && result >= 5 && <>Сярэдні вынік можа служыць адпраўной кропкай для вашага далейшага развіцця. Цяпер у вас ёсць базавы паказчык, з якога можна пачаць працаваць, каб дасягнуць больш высокіх вынікаў.</>
              }
              {
                result <= 10 && result >= 8 && <>Выкарыстоўвайце выдатны вынік у якасці стымулу для далейшых поспехаў. Гэта паказвае ваш патэнцыял і можа натхніць вас на новыя здзяйсненні.</>
              }
            </p>
          </div>
          <div className='flex justify-start gap-[25px]'>
            <button onClick={() => window.location.href = HOME_PAGE} className='p-[16px] rounded-[20px] font-Unbounded text-light bg-buttonRed text-[20px]'>
              На галоўную
            </button>
            <button onClick={() => window.location.href = pathname} className='p-[16px] rounded-[20px] font-Unbounded text-light bg-buttonRed text-[20px]'>
              Прайсці нанава
            </button>
          </div>
        </div>
      </div>
      }
      <div 
        className={`${questionNow === 10 && 'flex-shrink-0 bg-[rgba(15,_4,_4,_0.40)] backdrop-filter fixed top-0 left-0 w-full h-full z-[30]'}`} 
        style={{
          background: questionNow === 10 ? 'rgba(15, 4, 4, 0.40)' : '',
          filter: questionNow === 10 ? 'blur(7.5px)' : ''
        }}
      >
        <Header pathName='tests' />
        <main>
          <section id='infoTest' className='mb-[70px]'>
            <div className='container'>
              <h1 className='text-light text-[40px] font-bold font-Unbounded mt-[70px] md:text-[36px] md:mb-[20px] tracking-wide'>{questions && questions[questionNow]?.Test.title_test}</h1>
              <p className='max-w-[995px] md:text-[22px] text-light text-2xl font-normal font-Montserrat-Alternates leading-[33px] tracking-wide'>Дадзены тэст прызначаны для паглыблення і структуравання вашых ведаў аб гэтым годзе. Усе пытанні заснаваны выключна на інфармацыі, прадстаўленай у календары.</p>
            </div>
          </section>
          <section id='statusTest'>
            <div className='container md:px-0 px-[50px]'>
              <div className='w-full h-[100px] px-[62px] md:px-0 py-[25px] bg-darkCont rounded-[30px] justify-between items-center gap-[7px] flex'>
                    {
                        qLabel.map((item, index: number) => (
                                <div key={item.id} className='flex items-center gap-[7px]'>
                                  <div className={`w-[50px] h-[50px] md:w-[20px] md:h-[20px] transition-colors ${item?.isCorrect != null ? item?.isCorrect ? 'bg-greenTest' : ' bg-buttonRed' : 'bg-dotsBg'} rounded-full transition-colors`}></div>
                                    {index < 9 && <div className={`w-[50px] md:w-[20px] h-[4px] transition-colors rounded-[3px] ${item?.isCorrect != null ? item?.isCorrect ? 'bg-greenTest' : ' bg-buttonRed' : 'bg-dotsBg'} transition-colors`}></div>}
                                </div>
                        ))
                    }
                    </div>
                </div>
            </section>
            <section id='questionForm' className='mt-[50px]'>
                <div className='container'>
                    <div className='w-full mb-[50px] py-[45px] px-[40px] bg-darkCont rounded-[40px]'>
                        <p className='text-mainRed font-Montserrat-Alternates text-2xl'>Пытанне {questionNow+1} з 10</p>
                        <h2 className='text-[28px] font-Montserrat-Alternates mt-2 text-light'>{questions && questions[questionNow] && questions[questionNow].title_question}</h2>
                        <ul className='mt-[45px] ml-[20px]'>
                            {
                              isLoading
                              ? <div>
                                <Loader />
                              </div>
                              : <>
                                {questions && questions[questionNow] && questions[questionNow]?.answers.map((answer, index) => ( // Added index parameter for the map function
                                  <li key={index} className='mb-[40px]'> {/* Added key attribute to li element */}
                                      <button onClick={() => {
                                          setAnswer(answer.replaceAll(' ', ''))
                                          if (answer.replaceAll(' ', '')==questions[questionNow].correct_answer.replaceAll(' ', '') && backAnswer != answer.replaceAll(' ', '')) {
                                              qLabel[questionNow].isCorrect = true
                                              setResult(result+1 < 10 ? result+1 : result)
                                              setBackAnswer(answer.replaceAll(' ', ''))
                                          } else {
                                            qLabel[questionNow].isCorrect = false
                                          }
                                          setQLabel(qLabel)
                                          console.log(qLabel)
                                          console.log(result)
                                      }} className='flex gap-6 items-center'>
                                          <div className={`w-[36px] h-[36px] rounded-full ${answerL != null ? answer.replaceAll(' ', '')===questions[questionNow].correct_answer.replaceAll(' ', '') ? ' bg-greenTest' : ' bg-buttonRed' : 'bg-dotsBg'} `}></div>
                                          <p className='text-xl font-Montserrat-Alternates text-light max-w-[900px] text-left'>{answer}</p>
                                      </button>
                                  </li>
                              ))}
                              </>
                            }
                        </ul>
                        <button className='w-[280px] h-[57px] p-4 bg-buttonRed rounded-[20px] justify-center items-center gap-2.5 inline-flex ' onClick={() => {
                            setQuestionNow(questionNow+1)
                            setAnswer(null)
                            if (qLabel[questionNow].isCorrect == null) {
                              qLabel[questionNow].isCorrect = false
                              setQLabel(qLabel)
                            }
                        }}>
                            <span className='text-light text-xl font-normal font-Unbounded tracking-tight'>Наступнае пытанне</span>
                        </button>
                    </div>
                    {qLabel[questionNow]?.isCorrect != null && <div className='w-full mb-32 p-10 bg-darkCont rounded-[40px]'>
                      <p className=' text-light text-2xl font-normal font-Montserrat-Alternates leading-[33px]'>{questions && questions[questionNow] && questions[questionNow]?.question_info}</p>
                      <Link href={HOME_PAGE + `?card=${questions && questions[questionNow].Item.slug}`} className='text-[#8A0004] text-[20px] tracking-[0px] font-Unbounded mt-[5px]'>
                        Перайсці да даты
                      </Link>
                    </div>}
                </div>
            </section>
        </main>
    </div>
      </>
  )
}