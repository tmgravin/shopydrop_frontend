// Utility function to retrieve a cookie value by name
export const getCookie = (name: string): string | null => {
    const cookieName = `${name}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (const cookie of cookieArray) {
      let trimmedCookie = cookie.trim();
      if (trimmedCookie.indexOf(cookieName) === 0) {
        return trimmedCookie.substring(cookieName.length);
      }
    }
    return null;
  };
  
  // Example usage
  const token = getCookie('token');
  console.log('Retrieved Token:', token);
  