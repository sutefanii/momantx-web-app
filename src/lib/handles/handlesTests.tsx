import axios from "axios";

export interface ITestContent  {
    id: number
    title_test: string
    image_path: string
    [key: string]: any;
}

export const GetTests = async (): Promise<ITestContent[] | []> => {
    try {
        const response = await axios.get(
            "https://momantx-api-production.up.railway.app/api/tests"
        );

        return response.data as ITestContent[];
    } catch (error) {
        console.error("Error fetching tests:", error);
        return [];
    }
};

export const CreateTest = async (title_test: string, image_path: string, authToken: string): Promise<ITestContent | null> => {
    try {
        const response = await axios.post(
            "https://momantx-api-production.up.railway.app/api/tests",
            JSON.stringify({
                "title_test": title_test,
                "image_path": image_path
            }),
            {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data as ITestContent;
    } catch (error) {
        console.error("Error fetching years:", error)
        return null
    }
}

export const DeleteTest = async (id: number, authToken: string): Promise<string> => {
    try {
        const response = await axios.delete(
            `https://momantx-api-production.up.railway.app/api/tests/${id}`,
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
