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
import { CreateTest, DeleteTest, GetTests, ITestContent } from "@/lib/handles/handlesTests";
import { CreateItem, DeleteItem, GetItems, IItemContent } from "@/lib/handles/handleItems";
import { CreateQuestion, DeleteQuestions, GetQuestions, IQuestionsContent } from "@/lib/handles/handlesQuestions";
import { Loader } from "@/ui/loader";


// Tables Info
enum Tables {
    Items = "Items",
    Questions = "Questions",
    Tests = "Tests",
    Years = "Years",
}
  
interface IDataTableLabels {
    label: string;
    name: string;
}
  
const TablesLabels: Record<Tables, IDataTableLabels[]> = {
    [Tables.Items]: [
      { label: 'id', name: 'id' },
      { label: 'Year|year', name: 'ID Года' },
      { label: 'date', name: 'Дата' },
      { label: 'name', name: 'Название' },
      { label: 'text', name: 'Текст' },
      { label: 'source_link', name: 'Ссылка на источник' },
      { label: '#imageReal', name: 'Картинки (Настоящие)' },
      { label: '#imageAi', name: 'Картинки (Ai)' },
    ],
    [Tables.Questions]: [
      { label: 'id', name: 'id' },
      { label: 'Test|id', name: 'ID Теста' },
      { label: 'correct_answer', name: 'Правильный ответ' },
      { label: '#answers', name: 'Ответы' },
      { label: 'title_question', name: 'Вопрос' },
      { label: 'Item|id', name: 'ID Даты (Карточки)' },
    ],
    [Tables.Tests]: [
      { label: 'id', name: 'id' },
      { label: 'title_test', name: 'Имя теста' },
      { label: 'image_path', name: 'Ссылка на фото' },
    ],
    [Tables.Years]: [
      { label: 'id', name: 'id' },
      { label: 'year', name: 'Год' },
    ],
};  
  
export default function AdminPage() {
    const pathname = usePathname().split('/')
    const authToken = pathname[pathname.length-1]

    // Loading
    const [isLoading, setLoading] = useState<boolean>(true)

    // Open Create OR Update window
    const [isOpen, setIsOpen] = useState<boolean>(false)

    // Save Input Values to Create OR Update Data
    const [inputValues, setInputValues] = useState({});

    const [tabelNow, setTableNow] = useState<Tables>(Tables.Years)
    const [data, setData] = useState<any[] | null>(null) // TODO: поменять any type
    const [updateState, setUpdateState] = useState<boolean>(false)

    // row ID to Update
    const [isUpdateState, setStateUpdate] = useState<boolean>(false);
    const [rowIdValue, setRowIdValue] = useState<number | null>();
    const [editDataValue, setEditDataValue] = useState<any>({}); // TODO: поменять any type

    useEffect(() => {
        const fetchDataToStatusTokenAndGetYears = async () => {
            setLoading(true)
            try {
                let dataResponse;
                switch (tabelNow) {
                    case Tables.Years:
                        dataResponse = await GetYears();
                        setData(dataResponse as IResponseDataYear[]);
                        break;
                    case Tables.Tests:
                        dataResponse = await GetTests();
                        setData(dataResponse as ITestContent[]);
                        break;
                    case Tables.Items:
                        dataResponse = await GetItems();
                        setData(dataResponse as IItemContent[])
                        break
                    case Tables.Questions:
                        dataResponse = await GetQuestions();
                        setData(dataResponse as IQuestionsContent[])
                        break
                }
            } catch (error) {
                console.error("Error fetching years:", error);
            } finally {
                setLoading(false)
            }
        };
        fetchDataToStatusTokenAndGetYears();
    }, [updateState]);

    const deleteRow = (itemID: number, callback: any) => {
        const fetchData = async (id: number, authToken: string) => {
            try {
                await callback(id, authToken);
                setUpdateState(!updateState)
            } catch (error) {
                console.error("Error fetching years:", error);
            }
        }
        fetchData(itemID, authToken)
    }


    const formatLable = (itemLabel: IDataTableLabels, item: any):string => {
        if (itemLabel.label.includes('|')) {
            return itemLabel.label.split("|").reduce((acc, curr) => acc && acc[curr], item) 
        }
        if (itemLabel.label.startsWith('#')) {
            const label = itemLabel.label.slice(1, itemLabel.label.length)
            const data = item[label]
            let result = ``
            for (const link in data) {
                result += data[link] + '; '
            }
            return result
        }
        return item[itemLabel.label]
    }

    const resetForm = () => {
        // Создаем объект с пустыми значениями для каждого инпута
        const emptyFormValues: any = {}; 

        TablesLabels[tabelNow].forEach((itemLabel) => {
            if (itemLabel.label !== "id") {
                emptyFormValues[itemLabel.label] = '';
            }
        });

        // Обновляем стейт с пустыми значениями
        setInputValues(emptyFormValues);
    };

    return (
        <>
            <Header pathName={'home'} />
            <main>
                <div className="container">
                    <section id="tables">
                        <div className={`${isOpen ? 'block' : 'hidden'} absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[400px] min-h-[120px] bg-mainRed rounded-3xl p-[20px]`}>
                            <h1 className="text-light text-2xl font-Unbounded">Создание нового элемента</h1>
                            {TablesLabels[tabelNow].map((itemLabel, index) => (
                                // Проверяем, что label не равен "id"
                                itemLabel.label !== "id" && (
                                    <div key={index}>
                                        {/* Используем htmlFor вместо id для связи с input */}
                                        <input
                                            id={itemLabel.label}
                                            placeholder={itemLabel.name}
                                            className="w-full my-2 border-none outline-none px-3 h-9 rounded-md font-Montserrat-Alternates"
                                            // Добавляем value для отображения текущего значения
                                            value={editDataValue[itemLabel.label] || ''}
                                            // Используем функцию обратного вызова для обновления значения
                                            onChange={(e) => {
                                                const newValue = e.target.value;

                                                // Обновляем значение в стейте
                                                setInputValues((prevValues) => ({
                                                    ...prevValues,
                                                    [itemLabel.label]: newValue,
                                                }));

                                                // Обновляем значение в объекте editDataValue
                                                setEditDataValue((prevEditDataValue: any) => ({
                                                    ...prevEditDataValue,
                                                    [itemLabel.label]: newValue,
                                                }));
                                            }}
                                        />
                                    </div>
                                )
                            ))}
                            <br />
                            <button
                                className="bg-light text-mainRed p-4 py-2 font-Unbounded rounded-xl mt-4"
                                onClick={() => {
                                    const values = Object.values(inputValues);
                                    console.log(values)
                                    switch (tabelNow) {
                                        case Tables.Years:
                                            const fetchDataCreateYear = async (
                                                yearValue: number, 
                                                authToken: string
                                            ) => {
                                                try {
                                                    if (isUpdateState) {
                                                        await UpdateYear(
                                                            yearValue,
                                                            authToken,
                                                            rowIdValue as number
                                                        );
                                                    } else {
                                                        await CreateYear(
                                                            yearValue,
                                                            authToken
                                                        );
                                                    }
                                                    
                                                    setUpdateState(prevState => !prevState);
                                                } catch (error) {
                                                    console.error("Error fetching data:", error);
                                                }
                                              };
                                          
                                            fetchDataCreateYear(Number(values[0]), authToken);
                                            break
                                        
                                        case Tables.Tests:
                                            const fetchDataCreateTest = async (
                                                title_test: string, 
                                                image_path: string, 
                                                authToken: string
                                            ) => {
                                                try {
                                                    await CreateTest(
                                                        title_test, 
                                                        image_path, 
                                                        authToken
                                                    );
                                                    setUpdateState(prevState => !prevState);
                                                } catch (error) {
                                                    console.error("Error fetching data:", error);
                                                }
                                              };
                                          
                                            fetchDataCreateTest(
                                                String(values[0]), 
                                                String(values[1]), 
                                                authToken
                                            );
                                            break
                                        
                                        case Tables.Questions:
                                            const fetchDataCreateQuestion = async (
                                                test_id: number,
                                                correct_answer: string,
                                                answers: string[],
                                                title_question: string,
                                                item_id: number,
                                                authToken: string
                                            ) => {
                                                try {
                                                    await CreateQuestion(
                                                        test_id, 
                                                        correct_answer, 
                                                        answers, 
                                                        title_question, 
                                                        item_id, 
                                                        authToken
                                                    );
                                                    setUpdateState(prevState => !prevState);
                                                } catch (error) {
                                                    console.error("Error fetching data:", error);
                                                }
                                            };
                                          
                                            fetchDataCreateQuestion(
                                                Number(values[0]), 
                                                String(values[1]), 
                                                String(values[2]).split(', '), 
                                                String(values[3]), 
                                                Number(values[4]), 
                                                authToken
                                            );
                                            break

                                        case Tables.Items:
                                            const fetchDataCreateItem = async (
                                                year_id: number,
                                                date: string,
                                                name: string,
                                                text: string,
                                                source_link: string,
                                                imageReal: string[],
                                                imageAi: string[],
                                                authToken: string
                                            ) => {
                                                try {
                                                    await CreateItem(
                                                        year_id, 
                                                        date, 
                                                        name, 
                                                        text, 
                                                        source_link, 
                                                        imageReal, 
                                                        imageAi, 
                                                        authToken
                                                    );
                                                    setUpdateState(prevState => !prevState);
                                                } catch (error) {
                                                    console.error("Error fetching data:", error);
                                                }
                                              };
                                          
                                            fetchDataCreateItem(
                                                Number(values[0]),
                                                String(values[1]),
                                                String(values[2]),
                                                String(values[3]),
                                                String(values[4]),
                                                String(values[5]).split(', '),
                                                String(values[6]).split(', '),
                                                authToken
                                            );
                                            break
                                        
                                        default:
                                            break
                                    }
                                    resetForm();
                                    setStateUpdate(false)
                                    setIsOpen(false);
                                }}
                            >
                                {isUpdateState ? 'Обновить': 'Создать'}
                            </button>
                            <button
                                className="ml-2 bg-light text-mainRed p-4 py-2 font-Unbounded rounded-xl mt-4"
                                onClick={() => {
                                    resetForm();
                                    setStateUpdate(false)
                                    setIsOpen(false)
                                }}
                            >
                                Закрыть
                            </button>
                        </div>
                        <div className=" w-full mt-11">
                            <h2 className=" text-2xl font-medium font-Unbounded mb-3 text-light">Выберете таблицу:</h2>
                            <ul className="flex justify-between items-center">
                                <div className="flex justify-start gap-3">
                                    {[Tables.Items, Tables.Questions, Tables.Tests, Tables.Years].map(table => (
                                        <li key={table}>
                                            <button onClick={() => {
                                                resetForm()
                                                setTableNow(table)
                                                setUpdateState(!updateState)
                                            }} className={`p-4 py-2 ${table === tabelNow ? 'bg-light text-mainRed' : 'bg-buttonRed text-light'} font-Unbounded rounded-xl`}>
                                                {table}
                                            </button>
                                        </li>
                                    ))}
                                </div>
                                <button className="p-4 py-2 bg-buttonRed font-Unbounded rounded-xl text-light" onClick={() => setIsOpen(true)}>
                                    Создать
                                </button>
                            </ul>
                        </div>
                        {
                            isLoading ? <Loader />
                            : <div className="flex flex-col mb-14">
                                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                        <div className="overflow-hidden">
                                            <table className="min-w-full text-left text-sm font-light">
                                            <thead className="border-b font-medium dark:border-neutral-500">
                                                <tr>
                                                    {TablesLabels[tabelNow].map(itemLabel => <th scope="col" className="text-light font-Montserrat-Alternates px-6 py-4" key={itemLabel.label}>{itemLabel.name}</th>)}
                                                    <th scope="col" className="text-light font-Montserrat-Alternates overflow-x-scroll px-6 py-4">Действия</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {data?.map(item => (
                                                <tr key={item.id} className="border-b dark:border-neutral-500">
                                                    {TablesLabels[tabelNow].map((itemLabel, index) => (
                                                        <td key={index} className="px-6 py-4 font-bold max-w-[500px] overflow-x-auto" data-id={itemLabel.label}> 
                                                            {formatLable(itemLabel, item)}
                                                        </td>
                                                    ))}
                                                    <td className="px-6 py-4">
                                                            <ul className="flex gap-2">
                                                                <li>
                                                                    <button className="py-2 px-3 rounded-lg w-[40px] bg-mainRed" onClick={() => {
                                                                        setStateUpdate(true) // Включаем состояние на обновление
                                                                        setRowIdValue(item.id) // Устанавлием Id для редактирование элемента
                                                                        setEditDataValue(item)
                                                                        setIsOpen(true) // Открываем окно
                                                                    }}>
                                                                        <Image width={20} src={editIcon} alt="editIcon" />
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button className="py-2 px-3 rounded-lg w-[40px] bg-mainRed" onClick={() => {
                                                                        let callbackToDel;
                                                                        switch (tabelNow) {
                                                                            case Tables.Years:
                                                                                callbackToDel = DeleteYear 
                                                                                break
                                                                            case Tables.Tests:
                                                                                callbackToDel = DeleteTest 
                                                                                break
                                                                            case Tables.Questions:
                                                                                callbackToDel = DeleteQuestions
                                                                                break
                                                                            case Tables.Items:
                                                                                callbackToDel = DeleteItem 
                                                                                break
                                                                                                                                
                                                                        }
                                                                        deleteRow(item.id, callbackToDel)
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
                        }
                    </section>
                </div>
            </main>
        </>
    )  
}