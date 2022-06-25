import axios, { AxiosPromise } from "axios";
const urlBackend = process.env.REACT_APP_API_URL_BACKEND || "https://test-react-mock.com";

export const getUserById = ({ id }: any): AxiosPromise<any> => {
  return axios.get(`${urlBackend}/user/${id}`)
};
