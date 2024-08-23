export const beautifyString = (text: string) => {
  return text?.replace(/_/g, " ")?.replace(/\b\w/g, (l) => l.toUpperCase());
};

export const API_URL = "https://b662-103-70-146-74.ngrok-free.app";
