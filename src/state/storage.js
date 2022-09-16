import SecureLS from "secure-ls";

const secureLS = new SecureLS();

export const setItem = (key, value) => {
  secureLS.set(key, value);
};

export const getItem = (key) => {
  try {
    return secureLS.get(key);
  } catch (error) {
    return null;
  }
};

export const clear = () => {
  localStorage.clear();
};

const storage = {
  setItem,
  getItem,
  clear,
};

export default storage;
