import { api } from "src/lib/axios";

export const GetAllOrders = async () => {
    try {
        const response = await api.get("/orders/my-orders");
        console.log("Fetched orders:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
}