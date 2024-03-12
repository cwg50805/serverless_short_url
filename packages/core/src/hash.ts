import * as CryptoJS from "crypto-js";

function validURL(url: string): boolean {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator

  return !!pattern.test(url);
}

export default function generateShortUrl(originalUrl: string): string {
  if (!validURL(originalUrl)) {
    throw new Error("Invalid URL");
  }
  // Add salt (e.g., current timestamp) to the original URL
  const salt = new Date().getTime().toString();
  const urlWithSalt = originalUrl + salt;

  // Hash the URL with salt using SHA-256
  const hash = CryptoJS.SHA256(urlWithSalt).toString(CryptoJS.enc.Hex);

  // Generate a short URL using the first 6 characters of the hash
  const shortUrl = hash.substring(0, 16);

  return shortUrl;
}
