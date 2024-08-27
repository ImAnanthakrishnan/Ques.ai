import React, { useState } from "react";
import Logo from "../../assets/images/QuesLogo1.png";
import Logo1 from "../../assets/images/Group 22.png";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { handleLogin } from "../../utils/actions";
import { validate } from "../../utils/helper";
import google from '../../assets/images/image 6.png';
export type DataType = {
  email:string;
  password:any;
}
interface FormErrors {
  [key: string]: string;
}
const Auth = () => {
const [formData,setFormData] = useState<DataType>({email:'',password:''});
let [errors, setErrors] = useState<FormErrors>({})
const navigate = useNavigate();
const dispatch = useAppDispatch();
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:e.target.value
    }))
  }

  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

  const validationErrors = validate(formData);
  setErrors(validationErrors);

  const hasErrors = Object.values(validationErrors).some(error => error!=='');

  if(hasErrors){
    return;
  }

    try{
     await handleLogin(formData,navigate,dispatch);
    }catch(error){
      console.log(error)
    }
    
  }

  return (
    <section className="auth-container">
      <div className="auth-left">
        <div className="auth-left-logo">
          <img src={Logo} alt="logo" />
        </div>
        <h1>Your podcast will no longer be just a hobby.</h1>
        <p>Supercharge Your Distribution Using our AI assistant!</p>
      </div>
      <div className="auth-right">
        <div className="auth-right-logo">
          <img src={Logo1} alt="logo1" />
        </div>
        <h1>Welcome to</h1>
        <h2>Ques.AI</h2>
        <form onSubmit={handleSubmit}>
          <div className="auth-input">
            <input type="text" placeholder="Email Address" name="email" value={formData.email} onChange={handleChange}/>
            {errors.email && <p className="errors">{errors.email}</p>}
          </div>
          <div className="auth-input">
            <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange}/>
            {errors.password && <p className="errors">{errors.password}</p>}
          </div>
          <div className="extra-form">
            <label className="remember-me">
              <input type="checkbox" />
              Remember me
            </label>
            <span>Forgot Password?</span>
          </div>
          <button>Login</button>
        </form>
        <div className="underline">
          <div></div>
         <p>or</p> 
          <div></div>
        </div>
        <div className="google-auth">
          <img src={google} alt="" />
          <p>Continue with Google</p>
        </div>
        <div className="create-account">
          <span>Don't have an account?<strong>Create Account</strong></span>
        </div>
      </div>
    </section>
  );
};

export default Auth;
