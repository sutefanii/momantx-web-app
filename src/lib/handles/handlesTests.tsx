import axios from "axios";

export interface ITestContent {
    id: number
    title_test: string
    image_path: string
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