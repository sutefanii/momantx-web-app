"use client"
import { API_PATH } from "@/lib/consts";
import { AdminButton } from "@/ui/adminBtn";
import { Header } from "@/ui/header";
import axios from 'axios'


interface IResponseDataYear {
    id: number
    year: number
}

export default async function AdminPage() {
    const responseData = axios.get(`${API_PATH}/api/years`, {
        responseType: "json"
    })
    .then(response => response.data as Array<IResponseDataYear>)
    return (
        <>
            <Header pathName={'home'} />
            <main>
                <div className="container">
                    <section id="tables">
                        <div className=" w-full mt-11">
                            <h2 className=" text-2xl font-medium font-Unbounded mb-3 text-light">Выберете таблицу:</h2>
                            <ul className="flex justify-start gap-3">
                                <li>
                                    <button className="p-4 py-2 bg-buttonRed font-Unbounded rounded-xl text-light">
                                        Items
                                    </button>
                                </li>
                                <li>
                                    <button className="p-4 py-2 bg-buttonRed font-Unbounded rounded-xl text-light">
                                       Questions
                                    </button>
                                </li>
                                <li>
                                    <button className="p-4 py-2 bg-buttonRed font-Unbounded rounded-xl text-light">
                                        Tests
                                    </button>
                                </li>
                                <li>
                                    <button className="p-4 py-2 bg-buttonRed font-Unbounded rounded-xl text-light">
                                       Years
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div className="flex flex-col">
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
                                            {(await responseData).map(item => (
                                                <tr key={item.id} className="border-b dark:border-neutral-500">
                                                    <td className="px-6 py-4 font-medium">{item.id}</td>
                                                        <td className="px-6 py-4">{item.year}</td>
                                                        <td className="px-6 py-4">
                                                        <ul className="flex gap-2">
                                                            <li>
                                                                <button className="py-2 px-3 rounded-lg bg-mainRed">
                                                                    Редактировать
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button className="py-2 px-3 rounded-lg bg-mainRed">
                                                                    Обновить
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <AdminButton onClick={() => {
                                                                    axios.delete(`${API_PATH}/api/years/${item.id}`, {
                                                                        withCredentials: true,
                                                                        headers: { 
                                                                            'Cookie': 'auth=1b7b2ae5-c163-4d4d-bb3b-fa1a15f02507', 
                                                                        },
                                                                    }).then(response => console.log(response.data))
                                                                }}>
                                                                    Удалить
                                                                </AdminButton>
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