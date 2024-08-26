import { DataType } from "../pages/auth/Auth";

export const validate = (values:DataType) => {
    const errors = {email:'',password:''};

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };

      if (!values.email) {
        errors.email = "Email is required";
      } else if (!isValidEmail(values.email)) {
        errors.email = "Email is not valid";
      }

      if (!values.password) {
        errors.password = "Password is required";
      } else if (typeof values.password === 'string' && values.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
      } else if (typeof values.password === 'number' && values.password.toString().length < 6) {
        errors.password = "Password must be at least 6 characters";
      }

      return errors;
}
export const convertTime = (datetime: string | undefined) => {
  if (!datetime) return;

  const date = new Date(datetime);

  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getFullYear().toString().slice(-2); // Last 2 digits of the year

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day} ${month} ${year} | ${hours}:${minutes}`;
};
