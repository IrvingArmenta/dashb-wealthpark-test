import lscache from 'lscache';

const oneDay = 1440;
const key = 'token';
const userEmailKey = 'userEmail';

const setAuthToken = (jwt: string) => {
  lscache.set(key, jwt, oneDay);
}

const getAuthToken = (): string => {
  return lscache.get(key);
}

const setCurrentUserEmail = (userEmail: string) => {
  lscache.set(userEmailKey, userEmail);
}

const getCurrentUserEmail = (): string => {
  return lscache.get(userEmailKey);
}

const logOutAndClearData = () => {
  lscache.flush();
  window.localStorage.clear();
}

export const LStorage = {
  setAuthToken,
  getAuthToken,
  logOutAndClearData,
  setCurrentUserEmail,
  getCurrentUserEmail
};