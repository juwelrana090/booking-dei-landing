const NEXT_URL = process.env.NEXT_URL;

const baseUrl =
    typeof window !== "undefined" && window.location.origin
        ? window.location.origin
        : NEXT_URL;
        
export { baseUrl };