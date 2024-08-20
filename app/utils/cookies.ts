// utils/cookies.ts
export const setCookie = (name: string, value: string, options: { [key: string]: any }) => {
    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    for (const [key, val] of Object.entries(options)) {
      cookieString += `; ${key}`;
      if (val !== true) {
        cookieString += `=${val}`;
      }
    }
    document.cookie = cookieString;
  };
  
  export const getCookie = (name: string): string | undefined => {
    const cookies = document.cookie.split('; ').reduce((acc: { [key: string]: string }, cookie) => {
      const [key, value] = cookie.split('=');
      acc[decodeURIComponent(key)] = decodeURIComponent(value);
      return acc;
    }, {});
    return cookies[name];
  };
  
  export const deleteCookie = (name: string) => {
    setCookie(name, '', { 'max-age': -1 });
  };
  