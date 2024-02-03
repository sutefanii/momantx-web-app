'use client'
import { Header } from "@/ui/header";
import Img from "@/styles/img/Rectangle.png"
import { useRouter } from 'next/navigation';

export default function TestsPage () {
    const router = useRouter()
    return (
        <>
          <Header pathName='tests' />
          <main className="mt-16">
            <section id="test">
                <div className="container mt-12">
                    <h1 className="font-Unbounded text-5xl font-bold text-light">Тесты</h1>
                    <div className="ml-16 min-w-[calc((100vw-100%)/2+100%-4rem)] h-[500px] mt-[35px] overflow-x-auto flex justify-between gap-12 scrollbar scrollbar-thumb-gray-900 scrollbar-track-none">
                        <div className="test-card relative" onClick={() => router.push('/tests/test-1')} style={{
                            backgroundImage: `url(${Img.src})`
                        }}>
                            <div className="absolute w-full mt-8 z-50">
                                <h1 className=" text-light font-Montserrat-Alternates text-[26px] text-center">
                                    Тэст па 1939 годзе
                                </h1>
                            </div>
                            <div className="bg-test-gradient w-full h-full backdrop-blur-[2px]"></div>
                        </div>
                        <div className="test-card relative" style={{
                            backgroundImage: `url(${Img.src})`
                        }}>
                            <div className="absolute w-full mt-8 z-50">
                                <h1 className=" text-light font-Montserrat-Alternates text-[26px] text-center">
                                    Тэст па 1939 годзе
                                </h1>
                            </div>
                            <div className="bg-test-gradient w-full h-full backdrop-blur-[2px]"></div>
                        </div>
                        <div className="test-card relative" style={{
                            backgroundImage: `url(${Img.src})`
                        }}>
                            <div className="absolute w-full mt-8 z-50">
                                <h1 className=" text-light font-Montserrat-Alternates text-[26px] text-center">
                                    Тэст па 1939 годзе
                                </h1>
                            </div>
                            <div className="bg-test-gradient w-full h-full backdrop-blur-[2px]"></div>
                        </div>
                        <div className="test-card relative" style={{
                            backgroundImage: `url(${Img.src})`
                        }}>
                            <div className="absolute w-full mt-8 z-50">
                                <h1 className=" text-light font-Montserrat-Alternates text-[26px] text-center">
                                    Тэст па 1939 годзе
                                </h1>
                            </div>
                            <div className="bg-test-gradient w-full h-full backdrop-blur-[2px]"></div>
                        </div>
                        <div className="test-card relative" style={{
                            backgroundImage: `url(${Img.src})`
                        }}>
                            <div className="absolute w-full mt-8 z-50">
                                <h1 className=" text-light font-Montserrat-Alternates text-[26px] text-center">
                                    Тэст па 1939 годзе
                                </h1>
                            </div>
                            <div className="bg-test-gradient w-full h-full backdrop-blur-[2px]"></div>
                        </div>
                        <div className="test-card relative" style={{
                            backgroundImage: `url(${Img.src})`
                        }}>
                            <div className="absolute w-full mt-8 z-50">
                                <h1 className=" text-light font-Montserrat-Alternates text-[26px] text-center">
                                    Тэст па 1939 годзе
                                </h1>
                            </div>
                            <div className="bg-test-gradient w-full h-full backdrop-blur-[2px]"></div>
                        </div>
                        <div className="test-card relative" style={{
                            backgroundImage: `url(${Img.src})`
                        }}>
                            <div className="absolute w-full mt-8 z-50">
                                <h1 className=" text-light font-Montserrat-Alternates text-[26px] text-center">
                                    Тэст па 1939 годзе
                                </h1>
                            </div>
                            <div className="bg-test-gradient w-full h-full backdrop-blur-[2px]"></div>
                        </div>
                        <div className="test-card relative" style={{
                            backgroundImage: `url(${Img.src})`
                        }}>
                            <div className="absolute w-full mt-8 z-50">
                                <h1 className=" text-light font-Montserrat-Alternates text-[26px] text-center">
                                    Тэст па 1939 годзе
                                </h1>
                            </div>
                            <div className="bg-test-gradient w-full h-full backdrop-blur-[2px]"></div>
                        </div>
                        <div className="test-card relative" style={{
                            backgroundImage: `url(${Img.src})`
                        }}>
                            <div className="absolute w-full mt-8 z-50">
                                <h1 className=" text-light font-Montserrat-Alternates text-[26px] text-center">
                                    Тэст па 1939 годзе
                                </h1>
                            </div>
                            <div className="bg-test-gradient w-full h-full backdrop-blur-[2px]"></div>
                        </div>
                        <div className="test-card relative" style={{
                            backgroundImage: `url(${Img.src})`
                        }}>
                            <div className="absolute w-full mt-8 z-50">
                                <h1 className=" text-light font-Montserrat-Alternates text-[26px] text-center">
                                    Тэст па 1939 годзе
                                </h1>
                            </div>
                            <div className="bg-test-gradient w-full h-full backdrop-blur-[2px]"></div>
                        </div>
                    </div>
                </div>
            </section>
          </main>
        </>
    );
}