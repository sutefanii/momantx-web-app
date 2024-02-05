import axios from "axios";

export interface IResponseDataYear {
    id: number
    year: number
    [key: string]: any;
}

export const GetYears = async (): Promise<IResponseDataYear[] | []> => {
    try {
        const response = await axios.get(
            "https://momantx-api-production.up.railway.app/api/years"
        );

        return response.data as IResponseDataYear[];
    } catch (error) {
        console.error("Error fetching years:", error);
        return [];
    }
};

export const CreateYear = async (yearValue: number, authToken: string): Promise<IResponseDataYear | null> => {
    try {
        const response = await axios.post(
            "https://momantx-api-production.up.railway.app/api/years",
            JSON.stringify({
                "year": yearValue
            }),
            {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data as IResponseDataYear;
    } catch (error) {
        console.error("Error fetching years:", error)
        return null
    }
}


export const UpdateYear = async (yearValue: number, authToken: string, id: number): Promise<IResponseDataYear | null> => {
    try {
        const response = await axios.put(
            `https://momantx-api-production.up.railway.app/api/years/${id}`,
            JSON.stringify({
                "year": yearValue
            }),
            {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data as IResponseDataYear;
    } catch (error) {
        console.error("Error fetching years:", error)
        return null
    }
}

export const DeleteYear = async (id: number, authToken: string): Promise<string> => {
    try {
        const response = await axios.delete(
            `https://momantx-api-production.up.railway.app/api/years/${id}`,
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
