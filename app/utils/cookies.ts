export function getUserFromCookies(): any | null {
  if (typeof window !== "undefined" && document.cookie) {
    // Check if window and document.cookie are available
    const cookies = document.cookie.split(";");
    const userCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("user=")
    );

    if (userCookie) {
      const userValue = userCookie.split("=")[1];
      try {
        return JSON.parse(decodeURIComponent(userValue));
      } catch (error) {
        console.error("Failed to parse user data from cookies:", error);
        return null;
      }
    } else {
      console.error("User cookie is not available");
      return null;
    }
  } else {
    console.error("Window or document.cookie is not available");
    return null;
  }
}

// Function to set user data in a cookie
export function setUserCookie(data: any) {
  const userValue = encodeURIComponent(JSON.stringify(data));
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 7); // Cookie expires in 7 days

  document.cookie = `user=${userValue}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Strict`;
}

export function clearCookies() {
  // Get all cookies
  const cookies = document.cookie.split(";");

  // Loop through cookies and delete each one
  for (let cookie of cookies) {
    // Extract cookie name
    const cookieName = cookie.split("=")[0].trim();

    // Set cookie to expire in the past
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  }
}

// Old Cookie Method

export const setCookie = (
  name: string,
  value: string,
  options: { [key: string]: any }
) => {
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
  const cookies = document.cookie
    .split("; ")
    .reduce((acc: { [key: string]: string }, cookie) => {
      const [key, value] = cookie.split("=");
      acc[decodeURIComponent(key)] = decodeURIComponent(value);
      return acc;
    }, {});
  return cookies[name];
};

export const deleteCookie = (name: string) => {
  setCookie(name, "", { "max-age": -1 });
};
