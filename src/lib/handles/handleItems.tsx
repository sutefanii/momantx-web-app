import axios from "axios";

export interface IItemContent  {
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
    [key: string]: any;
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

export const CreateItem = async (
    year_id: number,
    date: string,
    name: string,
    text: string,
    source_link: string,
    imageReal: string[],
    imageAi: string[],
    authToken: string
): Promise<IItemContent | null> => {
    try {
        const response = await axios.post(
            "https://momantx-api-production.up.railway.app/api/items",
            JSON.stringify({
                "year_id": year_id,
                "date": date,
                "name": name,
                "text": text,
                "source_link": source_link,
                "imageReal": imageReal,
                "imageAi": imageAi,
            }),
            {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data as IItemContent;
    } catch (error) {
        console.error("Error fetching years:", error)
        return null
    }
}

export const DeleteItem = async (id: number, authToken: string): Promise<string> => {
    try {
        const response = await axios.delete(
            `https://momantx-api-production.up.railway.app/api/items/${id}`,
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
