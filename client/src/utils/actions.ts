import axios from "axios";
import { BASE_URL } from "../config";

export const handleCreate = async (name: string) => {
    try {
      const response = await axios.post(`${BASE_URL}/project`, { name });
      if (response) alert(response.data.message);
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };