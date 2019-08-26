import axios from 'axios';

const CancelToken = axios.CancelToken;
export const source = CancelToken.source();
export interface User {
  id: string;
  name: string;
  email: string
  password: string;
  role: string;
}

export type UserAuth = Pick<User, 'email' | 'password'>;

type newUser = Omit<User, 'id'>;

export type userArray = User[];

const API_BASE = 'http://localhost:3333/api/';

const API_METHODS = {
  getUsers: 'getUsers',
  getPaginatedUsers: 'getPaginatedUsers',
  getUserByEmail: 'getUserByEmail',
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
    const response = await API.get(API_METHODS.getUsers, { cancelToken: source.token });
    return response.data;
  } catch (error) {
    console.log(JSON.stringify(error));
  }
}

export const getUserByEmail = async (email: string): Promise<any> => {
  try {
    const response = await API.post(API_METHODS.getUserByEmail,{email}, { cancelToken: source.token });
    return response.data;
  } catch (error) {
    console.log(JSON.stringify(error));
  }
}


export const getPaginatedUsers = async (pageNo: number, usersPerPage: number): Promise<any> => {
  try {
    const response = await API.post(API_METHODS.getPaginatedUsers,
      { pageNo, usersPerPage },
      { cancelToken: source.token });

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
      cancelToken: source.token,
    });
    return response.data;
  } catch (error) {
    return false;
  }
}

export const createUser = async (userData: newUser) => {
  try {
    const response = await API.post(API_METHODS.createUser, userData, { cancelToken: source.token });
    return {
      data: response.data,
      header: response.headers,
      request: response.request,
    }
  } catch (error) {
    return false;
  }
}

export const authUser = async (userCredentials: UserAuth) => {
  try {
    const response = await API.post(API_METHODS.authUser, userCredentials, { cancelToken: source.token });
    return response.data;
  } catch (error) {
    return 'error from function in front';
  }
}

export const updateUser = async (userId: string, updatedData: Partial<newUser>, jwt: string) => {
  try {
    const response = await API.post('updateUser', {
      data: {
        id: userId,
        update: {
          name: updatedData.name,
          password: updatedData.password,
          email: updatedData.email,
          role: updatedData.role
        }
      }}, {
        headers: {
          "x-auth-token": jwt,
        },
        cancelToken: source.token,
      });
    return response.data;
  } catch (error) {
    return false;
  }
}