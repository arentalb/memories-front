export default function convertToBase64(
  file: File | null,
): Promise<string | null> {
  return new Promise((resolve, reject) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    } else {
      console.log("No file provided");
      resolve(null);
    }
  });
}
