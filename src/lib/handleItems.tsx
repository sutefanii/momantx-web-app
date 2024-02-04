import axios from "axios";

export interface IItemContent {
    id: number;
    Year: {
        id: number;
        year: number;
    };
    date: string;
    name: string;
    text: string;
    source_link: string;
    imageReal: string[];
    imageAi: string[];
    slug: string;
    CreatedAt: string;
}

export const GetItems = async (): Promise<IItemContent[] | []> => {
    try {
        const response = await axios.get(
            "https://momantx-api-production.up.railway.app/api/items"
        );

        return response.data as IItemContent[];
    } catch (error) {
        console.error("Error fetching items:", error);
        return [];
    }
};


export const GetItem = async (id: number): Promise<IItemContent | null> => {
    try {
        const response = await axios.get(
            `https://momantx-api-production.up.railway.app/api/items/${id}`
        );

        return response.data as IItemContent;
    } catch (error) {
        console.error("Error fetching items:", error);
        return null;
    }
};