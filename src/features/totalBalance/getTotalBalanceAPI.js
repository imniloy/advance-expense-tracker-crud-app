import axios from "../../utils/axios";

export const getTotalBalance = async () => {
    const response = await axios.get("/transactions");
    return response;
};
