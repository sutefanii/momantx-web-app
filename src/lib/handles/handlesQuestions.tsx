import axios from "axios";

export interface IQuestionsContent  {
    id: number
    Test: {
        id: number
        title_test: string
        image_path: string
    },
    correct_answer: string
    answers: string[]
    title_question: string
    Item: {
        id: number
        Year: {
            id: number
            year: number
        },
        date: string,
        name: string,
        text: string,
        source_link: string
        imageReal: string[]
        imageAi: string[]
        slug: string
        CreatedAt: string
    }
    [key: string]: any
}

export const GetQuestions = async (): Promise<IQuestionsContent[] | []> => {
    try {
        const response = await axios.get(
            "https://momantx-api-production.up.railway.app/api/questions"
        );

        return response.data as IQuestionsContent[];
    } catch (error) {
        console.error("Error fetching tests:", error);
        return [];
    }
};

export const CreateQuestion = async (
    test_id: number,
    correct_answer: string,
    answers: string[],
    title_question: string,
    item_id: number,
    authToken: string
): Promise<IQuestionsContent | null> => {
    try {
        const response = await axios.post(
            "https://momantx-api-production.up.railway.app/api/questions",
            JSON.stringify({
                "test_id": test_id,
                "correct_answer": correct_answer,
                "answers": answers,
                "title_question": title_question,
                "item_id": item_id
            }),
            {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data as IQuestionsContent;
    } catch (error) {
        console.error("Error fetching years:", error)
        return null
    }
}

export const DeleteQuestions = async (id: number, authToken: string): Promise<string> => {
    try {
        const response = await axios.delete(
            `https://momantx-api-production.up.railway.app/api/questions/${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data as string;
    } catch (error) {
        console.error("Error fetching years:", error);
        return "";
    }
};
