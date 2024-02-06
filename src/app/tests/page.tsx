'use client'
import { Header } from "@/ui/header";
import Img from "@/styles/img/Rectangle.png"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { GetTests, ITestContent } from "@/lib/handles/handlesTests";
import { Loader } from "@/ui/loader";

export default function TestsPage () {
    const [testsData, setTests] = useState<ITestContent[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const router = useRouter()
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const tests = await GetTests();
                setTests(tests as ITestContent[]);
            } catch (error) {
                console.error("Error fetching tests:", error);
            }
            setIsLoading(false)
        };

        fetchData();
    }, []);

    return (
        <>
          <Header pathName='tests' />
          <main className="mt-16">
            <section id="test">
                <div className="container mt-12">
                    <h1 className="font-Unbounded text-5xl font-bold text-light">Тесты</h1>
                    <div className="ml-16 min-w-[calc((100vw-100%)/2+100%-4rem)] h-[500px] mt-[35px] overflow-x-auto flex justify-between gap-12 scrollbar scrollbar-thumb-gray-900 scrollbar-track-none">
                        {
                            isLoading ? <Loader />
                            : <>
                             {
                                testsData.length !== 0 
                                ? testsData.map(test => (
                                    <div className="test-card relative bg-cover " key={test?.title_test || test.id} onClick={() => router.push(`/tests/${test.id}`)} style={{
                                        backgroundImage: `url(${test?.image_path})`
                                    }}>
                                        <div className="absolute w-full mt-8 z-50">
                                            <h1 className=" text-light font-Montserrat-Alternates text-[26px] text-center">
                                                {test?.title_test}
                                            </h1>
                                        </div>
                                        <div className="w-full h-full" style={{
                                            background: 'linear-gradient(180deg, rgba(45, 0, 0, 0.50) 10%, rgba(83, 38, 38, 0.00) 38.65%), rgba(101, 2, 5, 0.15)'
                                        }}></div>
                                    </div>
                                ))
                                : <h1 className="font-Montserrat-Alternates text-center text-4xl text-light">
                                    В данный моменты - Тестов нету
                                </h1>
                             }
                            </>
                        }
                    </div>
                </div>
            </section>
          </main>
        </>
    );
}