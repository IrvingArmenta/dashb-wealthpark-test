import axios from 'axios';
import { ObjectId } from 'mongodb';

export interface User {
  name: string;
  email: string
  password: string;
  role: string;
}

export type UserAuth = Pick<User, 'email' | 'password'>;

export type userArray = User[];

export type seedUser = User & { id: ObjectId };

const API_BASE = 'http://localhost:3333/api/';

const API_METHODS = {
  getUsers: 'getUsers',
  deleteUser: 'deleteUser',
  updateUser: 'updateUser',
  createUser: 'createUser',
  authUser: 'authUser'
};

export const API = axios.create({
  baseURL: API_BASE,
  responseType: "json"
});

/**
 * 
 * Get All Users in DB
 * 
 * @return {Promise} if success returns all users from db
 */
export const getUsers = async (): Promise<any> => {
  try {
    const response = await API.get(API_METHODS.getUsers);
    return response.data;
  } catch (error) {
    console.log(JSON.stringify(error));
  }
}

export const deleteUser = async (id: string, jwt: string) => {
  try {
    const response = await API.delete(API_METHODS.deleteUser, {
      headers: {
        "x-auth-token": jwt,
      },
      data: {
        id
      },
    });
    return response.data;
  } catch (error) {
    console.log(JSON.stringify(error));
  }
}

export const createUser = async (userData: User) => {
   try { 
    const response = await API.post(API_METHODS.createUser, userData);
    return {
      data: response.data,
      header: response.headers,
      request: response.request,
    }
  } catch (error) {
    return false;
  }
}

export const authUser = (userCredentials: UserAuth) => {
  return API.post(API_METHODS.authUser, userCredentials);
}