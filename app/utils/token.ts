export const getCookie = (name: string): string | null => {
  if (typeof window === 'undefined') {
    // If we're on the server, return null
    return null;
  }

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

if (typeof window !== 'undefined') {
  // This code will only run in the browser
  const token = sessionStorage.getItem("token");
  console.log('Retrieved Token:', token);
}
