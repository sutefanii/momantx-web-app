"use client"

import { Header } from "@/ui/header";
// Icons
import { 
    CreateYear,
    DeleteYear, 
    GetYears, 
    IResponseDataYear,
    UpdateYear
} from "@/lib/handles/handleYear";
import editIcon from "@/styles/img/edit.svg"
import deleteIcon from "@/styles/img/delete.svg"
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation'
import { GetStatusToken } from "@/lib/handles/handleToken";
import { useRouter } from "next/navigation";
import { HOME_PAGE } from "@/lib/routes";


enum Tables {
    Items="Items",
    Questions="Questions",
    Tests="Tests",
    Years="Years"
}

export default function AdminPage() {
    const pathname = usePathname().split('/')
    const authToken = pathname[pathname.length-1]

    // Router
    const router = useRouter()

    // Year Fields
    const [yearValue, setYearValue] = useState<string>()
    const [createYear, setAcktive] = useState<boolean>(false)
    const [isEdit, setEditState] = useState<string | null>(null)
    const [isEditBlock, setEditBlockState] = useState<boolean>(false)
    const [editId, setEditId] = useState<number>()

    const [tabelNow, setTableNow] = useState<Tables>(Tables.Years)
    const [data, setData] = useState<IResponseDataYear[] | null>(null)
    const [updateState, setUpdateState] = useState<boolean>(false)

    useEffect(() => {
        const fetchDataToStatusTokenAndGetYears = async () => {
            try {
                const SUCCESS_STATUS = 202
                const statusToken = await GetStatusToken(authToken);
                console.log(statusToken, authToken)
                if (statusToken !== SUCCESS_STATUS) {
                    router.push(HOME_PAGE)
                    return;
                }

                const years = await GetYears();
                setData(years as IResponseDataYear[]);
            } catch (error) {
                console.error("Error fetching years:", error);
            }
        };
        fetchDataToStatusTokenAndGetYears();
    }, [updateState]);

    const setValueToInput = () => {
        if (isEdit) {
            setYearValue(isEdit)
            setEditState(null);
        }
        return yearValue
    }

    const UpdateAndCreate = async (
        callback: (yearValue: number, authToken: string, id: number) => Promise<IResponseDataYear | null>,
        id: number
      ) => {
        const fetchData = async (yearValue: number, authToken: string) => {
          try {
            await callback(yearValue, authToken, id);
            setUpdateState(prevState => !prevState);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData(Number(yearValue), authToken);
      };

    return (
        <>
            <Header pathName={'home'} />
            <main>
                <div className="container">
                    <section id="tables">
                        <div className=" w-full mt-11">
                            <h2 className=" text-2xl font-medium font-Unbounded mb-3 text-light">Выберете таблицу:</h2>
                            <ul className="flex justify-start gap-3">
                                {[Tables.Items, Tables.Questions, Tables.Tests, Tables.Years].map(table => (
                                    <li key={table}>
                                        <button onClick={() => setTableNow(table)} className={`p-4 py-2 ${table === tabelNow ? 'bg-light text-mainRed' : 'bg-buttonRed text-light'} font-Unbounded rounded-xl`}>
                                            {table}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button className="my-[20px] px-3 py-2 bg-buttonRed font-Unbounded rounded-xl text-light" onClick={() => setAcktive(!createYear)}>
                            Создать
                        </button>
                        <div className={`${createYear ? 'block' : 'hidden'} flex justify-start gap-4`}>
                            <input className="my-[20px] bg-light px-2 border-none outline-none font-Unbounded rounded-xl text-darkCont"
                                type="number"
                                value={setValueToInput()}
                                onChange={(e) => setYearValue(e.target.value)}
                                placeholder="Год.." 
                            />
                            <button className="my-[20px] px-3 py-2 bg-buttonRed font-Unbounded rounded-xl text-light" onClick={() => {
                                if (isEditBlock) {
                                    UpdateAndCreate(
                                        UpdateYear,
                                        editId || 0
                                    )
                                    setEditBlockState(false)
                                } else {
                                    UpdateAndCreate(
                                        CreateYear,
                                        editId || 0
                                    )
                                }
                                
                                setAcktive(!createYear)
                            }}>Подтвердить</button>
                        </div>
                        <div className="flex flex-col mb-14">
                            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                    <div className="overflow-hidden">
                                        <table className="min-w-full text-left text-sm font-light">
                                        <thead className="border-b font-medium dark:border-neutral-500">
                                            <tr>
                                                <th scope="col" className="text-light font-Montserrat-Alternates px-6 py-4">Id</th>
                                                <th scope="col" className="text-light font-Montserrat-Alternates px-6 py-4">Year</th>
                                                <th scope="col" className="text-light font-Montserrat-Alternates px-6 py-4">Действия</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tabelNow === Tables.Years && data?.map(item => (
                                                <tr key={item.id} className="border-b dark:border-neutral-500">
                                                    <td className="px-6 py-4 font-bold">{item.id}</td>
                                                        <td className="px-6 py-4 font-medium">{item.year}</td>
                                                        <td className="px-6 py-4">
                                                        <ul className="flex gap-2">
                                                            <li>
                                                                <button className="py-2 px-3 rounded-lg bg-mainRed" onClick={() => {
                                                                    setEditBlockState(true)
                                                                    setEditId(item.id)
                                                                    setEditState(String(item.year))
                                                                    setAcktive(true)
                                                                }}>
                                                                    <Image width={20} src={editIcon} alt="editIcon" />
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button className="py-2 px-3 rounded-lg bg-mainRed" onClick={() => {
                                                                    const fetchData = async (id: number, authToken: string) => {
                                                                        try {
                                                                            await DeleteYear(id, authToken);
                                                                            setUpdateState(!updateState)
                                                                        } catch (error) {
                                                                            console.error("Error fetching years:", error);
                                                                        }
                                                                    }
                                                                    fetchData(item.id, authToken)
                                                                }}>
                                                                    <Image width={20} src={deleteIcon} alt="deleteIcon" />
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    )  
}