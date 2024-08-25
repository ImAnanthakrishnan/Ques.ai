import axios from "axios";
import { BASE_URL } from "../config";

export const handleCreate = async (name: string) => {
    try {
      const response = await axios.post(`${BASE_URL}/project`, { name });
      if (response) alert(response.data.message);
    } catch (error: any) {
      alert(error.response.data.message)
      console.log(error.response.data.message);
    }
  };

export const handleUpload = async(inputData:{name:string,link:string},project:string='') => {
  const {name,link : transcript} = inputData;
  try{
    const response = await axios.post(`${BASE_URL}/episode/${project}`,{name,transcript});
    if(response) alert(response.data.message);
  }
  catch(error:any){
    alert(error.response.data.message)
    console.log(error.response.data.message)
  }
}