export const beautifyString = (text: string) => {
  return text?.replace(/_/g, " ")?.replace(/\b\w/g, (l) => l.toUpperCase());
};

export const API_URL_PROD = "https://13-233-253-101.tkip.live";
// export const API_URL_PROD = "https://1857-122-187-108-202.ngrok-free.app";

export const API_URL_STAGE = "https://5347-122-187-108-202.ngrok-free.app";

