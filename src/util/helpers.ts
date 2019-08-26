interface IndexedObj {
  [key: string]: string | number;
}

export const removeFalsy = (obj: any) => {
  const newObj: IndexedObj = {};
  Object.keys(obj).forEach((prop) => {
    if (obj[prop]) { newObj[prop] = obj[prop]; }
  });
  return newObj;
};
