import axios from 'axios';
import { ObjectId } from 'mongodb';

export interface User {
  _id: string;
  name: string;
  email: string
  password: string;
  role: string;
}

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

const API = axios.create({
  baseURL: API_BASE,
  responseType: "json"
});

export const getUsers = async () => {
  try {
    const response = await API.get(API_METHODS.getUsers);
    return response.data;
  } catch (error) {
    console.log(JSON.stringify(error));
  }
}

export const deleteUser = async (id: string) => {
  try {
    await API.delete(API_METHODS.deleteUser, {
      data: {
        id
      }
    });
  } catch (error) {
    console.log(JSON.stringify(error));
  }
}

export const createUser = async (userData: User) => {
  try { 
    await API.post(API_METHODS.createUser, userData); 
  } catch (error) {
    console.log(JSON.stringify(error));
  }
}