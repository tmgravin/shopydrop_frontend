export const convertUrlToFile = async ({
  url,
  filename,
}: {
  url: string;
  filename: string;
}) => {
  // Fetch the image from the URL
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");
    const blob = await response.blob();
    return new File([blob], filename, { type: blob.type });
  } catch (error) {
    console.log("Error converting URL to file:", error);
    throw error;
  }
};
