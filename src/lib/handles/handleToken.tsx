import axios from "axios";


export const GetStatusToken = async (authToken: string): Promise<number> => {
    try {
        const response = await axios.get(
            `https://momantx-api-production.up.railway.app/api/auth/${authToken}`
        );

        return response.status as number;
    } catch (error) {
        console.error("Error fetching tests:", error);
        return 400;
    }
};