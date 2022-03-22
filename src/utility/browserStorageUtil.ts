export const getLocalStorage = (itemName: string) => (localStorage.getItem(itemName) || '');
export const setLocalStorage = (itemName: string, value: string) => { localStorage.setItem(itemName, value); };
export const removeLocalStorage = (itemName: string) => { localStorage.removeItem(itemName); };

export const getSessionStorage = (itemName: string) => (sessionStorage.getItem(itemName) || '');
export const setSessionStorage = (itemName: string, value: string) => { sessionStorage.setItem(itemName, value); };
export const removeSessionStorage = (itemName: string) => { sessionStorage.removeItem(itemName); };
