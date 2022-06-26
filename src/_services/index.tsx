import axios, { AxiosPromise } from "axios";

export interface IGetUserById {
  id: string
  name: string
  friendList: string[]
}

export const getUserById = ({ id }: any): AxiosPromise<IGetUserById> => {
  return axios.get(`/user/${id}`)
};
