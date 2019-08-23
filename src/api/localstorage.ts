import lscache from 'lscache';

const oneDay = 1440;
const key = 'token';

const setAuthToken = (jwt: string) => {
  lscache.set(key, jwt, oneDay);
}

const getAuthToken = (): string => {
  return lscache.get(key);
}

const logOutAndClearToken = () => {
  lscache.flush();
  lscache.flushExpired();
}

export const LStorage = {
  setAuthToken,
  getAuthToken,
  logOutAndClearToken
};