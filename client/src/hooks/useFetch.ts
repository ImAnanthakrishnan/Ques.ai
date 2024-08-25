import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../config";

const useFetch = <T,>(url: string,triggerFetch:boolean) => {
    const [datas, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    /*const authToken = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };*/
    useEffect(() => {
      const fetchData = async () => {
        try {
          const result = await axios.get(`${BASE_URL}${url}`);
          const {data} = result.data; 
          setData(data);
          setLoading(false);
        } catch (error: any) {
          setError(error.message);
          setLoading(false);
        }
      };
     
      fetchData();
    }, [url,triggerFetch]);
  
    return { datas, loading, error };
  };
  
  export default useFetch;