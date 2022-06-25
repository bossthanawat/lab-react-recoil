import axios, { AxiosPromise } from "axios";

export const getUserById = ({ id }: any): AxiosPromise<any> => {
  return axios.get(`/user/${id}`)
};
