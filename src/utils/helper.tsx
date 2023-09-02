import Cookies from "js-cookie";

export const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
};

export const isAuthenticated = () => {
  const token = Cookies.get("token"); 
  return !!token; 
};

export const getRole = () => {
  const role = Cookies.get("role");
  return role;
};

export const convertToBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};