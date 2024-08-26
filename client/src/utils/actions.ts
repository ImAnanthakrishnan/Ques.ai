import axios from "axios";
import { BASE_URL } from "../config";
import { signInFailure, signInStart, signInSuccess } from "../slices/userSlice";
import { DataType } from "../pages/auth/Auth";


export const handleLogin = async(values:DataType,navigate:any,dispatch:any) =>{
  dispatch(signInStart());
  try {
    const result = await axios.post(`${BASE_URL}/auth/login`, values);
    const { data } = result;
    dispatch(signInSuccess(data));
    navigate('/home');
  } catch (error: any) {
    let errMsg = error.response.data.message;
    alert(errMsg)
    console.log("error sigIn:", errMsg);
    dispatch(signInFailure(errMsg));
  }
  return true;
}

export const handleCreate = async (name: string,token:string|null) => {
  const authToken = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
    try {
      const response = await axios.post(`${BASE_URL}/project`, { name },authToken);
      if (response) alert(response.data.message);
    } catch (error: any) {
      alert(error.response.data.message)
      console.log(error.response.data.message);
    }
  };

export const handleUpload = async(inputData:{name:string,link:string},project:string='',token:string|null) => {
  const {name,link : transcript} = inputData;
  const authToken = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try{
    const response = await axios.post(`${BASE_URL}/episode/${project}`,{name,transcript},authToken);
    if(response) alert(response.data.message);
  }
  catch(error:any){
    alert(error.response.data.message)
    console.log(error.response.data.message)
  }
}

export const handleUpdate = async(transcript:string,id:string,project:string='',token:string|null) => {
  const authToken = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try{
    const response = await axios.patch(`${BASE_URL}/episode/${project}`,{transcript,id},authToken);
    if(response) return response.data;
  }catch(error:any){
    alert(error.response.data.message)
    console.log(error.response.data.message)
  }
}

export const handleUserUpdate = async(name:string='',email:string='',currentUser:any,token:string|null) => {
  const authToken = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try{
    const response = await axios.patch(`${BASE_URL}/auth/update`,{name,email},authToken);
    if(response){
      alert('Updated Successfully');
      currentUser.name = name;
    } 
  }catch(error:any){
    alert(error.response.data.message)
    console.log(error.response.data.message)
  }
}

export const handleDelete = async(id:string,token:string|null) => {
  const authToken = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try{
    const response = await axios.delete(`${BASE_URL}/episode/${id}`,authToken);
    if(response) return true;
  }catch(error:any){
    alert(error.response.data.message)
    console.log(error.response.data.message)
    return false;
  }
}